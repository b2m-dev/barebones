Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");
var globals = require('globals').Globals;
var styles = require('globals').Styles;
var mapdata = require('globals').MapData;

function Map(argument) {
	return this.init.apply(this, arguments);
}

Map.prototype.init = function(argument, Info) {
	var that = this;
	this.navGroup = argument;

	this.window = Ti.UI.createWindow({
		backgroundColor : styles.win.backgroundColor,
		barColor : styles.win.barColor,
		rightNavButton : rightNavButton(this),
		navTintColor : styles.navTintColor
	});
	this.window.setTitleControl(globals.setCustomTitle(Info.title));
	// CREATE MENU VIEW
	this.menuView = createRightMenu(this);
	this.window.add(this.menuView);
	this.isMenuShown = false;

	this.window.addEventListener('open', function(e) {
		if (Titanium.Network.online) {
			var annotations = [];
			for (var i = 0; i < mapdata.annotations.length; i++) {
				var mountainView = Titanium.Map.createAnnotation({
					latitude : mapdata.annotations[i].latitude,
					longitude : mapdata.annotations[i].longitude,
					title : mapdata.annotations[i].title,
					subtitle : mapdata.annotations[i].subtitle,
					pincolor : Titanium.Map.ANNOTATION_RED,
					leftButton : '/images/sample_map_image.png',
					animate : false,
					rightButton : Ti.UI.iPhone.SystemButton.DISCLOSURE
				});
				annotations.push(mountainView);
			};

			var mapview = Titanium.Map.createView({
				mapType : Titanium.Map.STANDARD_TYPE,
				region : {
					latitude : mapdata.origin.latitude,//37.390749,
					longitude : mapdata.origin.longitude,//-122.081651,
					latitudeDelta : 0.01,
					longitudeDelta : 0.01
				},
				animate : true,
				regionFit : true,
				userLocation : true,
				annotations : annotations
			});
			that.window.add(mapview);
		} else {
			alert('No internet connection found');
		}

	});

	this.window.addEventListener('click', function(e) {
		that.isMenuShown = false;
		that.menuView.animate(slide_out_top);
	});

	return this.window;
};

module.exports = Map;
