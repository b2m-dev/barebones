Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");
var globals = require('globals').Globals;
var styles = require('globals').Styles;
var mapdata = require('globals').MapData;

function Map(argument) {
	return this.init.apply(this, arguments);
}

Map.prototype.init = function(argument, isFlyout) {
	var that = this;
	this.winTitle = (argument != null) ? argument.menuItem.title : 'Map';

	if (isFlyout) {
		this.MapWin = require('/ui/handheld/android/ParentView');
		this.MapWin = new this.MapWin();

		var lbl_title = Ti.UI.createLabel({
			text : argument.menuItem.title,
			font : {
				fontSize : 18 * dp,
				fontFamily : 'Montserrat',
				fontWeight : 'Bold'
			},
			color : '#fff'
		});
		this.MapWin.headerView.add(lbl_title);
		this.MapWin.headerView.add(rightNavButton(this));
	} else {
		this.MapWin = Ti.UI.createWindow({
			backgroundColor : styles.win.backgroundColor,
			zIndex : 20,
			exitOnClose : false,
			navBarHidden : true,
			orientationModes : [Ti.UI.PORTRAIT]
		});
		this.headerView = globals.setHeaderBar(this.MapWin, this.winTitle);
		this.headerView.add(rightNavButton(this));

		this.MapWin.add(this.headerView);
	}

	// CREATE MENU VIEW
	this.menuView = createRightMenu(this);
	this.MapWin.add(this.menuView);
	this.isMenuShown = false;

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
			top : 48 * dp,
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
					latitude : mapdata.origin.latitude, //37.390749,
					longitude : mapdata.origin.longitude, //-122.081651,
				latitudeDelta : 0.01,
				longitudeDelta : 0.01
			},
			animate : true,
			regionFit : true,
			userLocation : true,
			annotations : annotations
		});
		this.MapWin.add(mapview);
	} else {
		alert('No internet connection found');
	}

	return this.MapWin;

};

module.exports = Map;
