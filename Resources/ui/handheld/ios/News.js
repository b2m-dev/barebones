var globals = require('globals').Globals;
var styles = require('globals').Styles;
Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");

// ANIMATION FOR RIGHT MENU
var slide_in_top = Titanium.UI.createAnimation({
	top : 0
});
var slide_out_top = Titanium.UI.createAnimation({
	top : -320
});

function createCustomLayout(context, userInfo) {
	var row = Ti.UI.createTableViewRow({
		height : 'auto',
		backgroundColor : styles.feed_table_row.backgroundColor,
		selectedBackgroundColor : styles.feed_table_row.selectedBackgroundColor,
		userInfo : userInfo
	});

	row.addEventListener('click', function(e) {
		context.isMenuShown = false;
		context.menuView.animate(slide_out_top);
		var detailWin = require('/ui/handheld/ios/NewsDetail');
		detailWin = new detailWin(context.navGroup, e.row.userInfo);
		context.navGroup.openWindow(detailWin);
	});

	/*
	 * Image
	 */
	var image = Ti.UI.createImageView({
		image : userInfo.picture,
		// width : 48,
		width : styles.feed_table_row.imageWidth,
		top : 12,
		left : 14
	});
	row.add(image);
	/*
	 * Row elements container
	 */
	var Outer_Container = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : 10,
		left : 28 + image.width,
		bottom : 10,
		layout : 'vertical'
	});
	row.add(Outer_Container);
	/*
	 * Title
	 */
	var lbl_name = Ti.UI.createLabel({
		text : userInfo.title,
		color : styles.feed_table_row_title.color,
		left : 0,
		font : styles.feed_table_row_title.font,
		top : 0,
		height : Ti.UI.SIZE,
		wordWrap : true
	});
	Outer_Container.add(lbl_name);
	/*
	 * Tags
	 */
	var tagView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		left : 0,
		top: 0,
		//top : lbl_name.toImage().height
	});
	Outer_Container.add(tagView);

	for (var i = 0; i < userInfo.tags.length; i++) {
		var lbl_tag = Ti.UI.createLabel({
			color : styles.feed_table_row_tags.color,
			font : styles.feed_table_row_tags.font,
			left : 0
		});
		if ((i + 1) == userInfo.tags.length) {
			lbl_tag.text = userInfo.tags[i];
		} else {
			lbl_tag.text = userInfo.tags[i] + ', ';
		}

		tagView.add(lbl_tag);
	};
	/*
	 * Teaser text
	 */
	var lbl_detail = Ti.UI.createLabel({
		text : (userInfo.body.length > 100) ? userInfo.body.substring(0, 100) + '...' : userInfo.body,
		color : styles.feed_table_row_teaser.color,
		left : 0,
		right : 14,
		top: 10,
		font : styles.feed_table_row_teaser.font,
		//top : lbl_name.toImage().height + 15
	});
	Outer_Container.add(lbl_detail);

	return row;
}

function create_Table(context) {
	var table = Ti.UI.createTableView({
		showVerticalScrollIndicator : false,
		height : 'auto',
		backgroundColor : 'transparent',
		separatorColor : '#343434'
	});

	return table;
}

function News(argument) {
	return this.init.apply(this, arguments);
}

News.prototype.init = function(argument, Info) {
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

	var indicator = Ti.UI.createActivityIndicator({
		style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG
	});
	this.window.add(indicator);
	indicator.show();

	// DATA WILL BE POPULATED WHEN THE WINDOW WILL BE OPENED NOT WHEN REQUIRED
	this.window.addEventListener('open', function(e) {
		var table = create_Table(that);
		var tableRows = [];
		if (Titanium.Network.online) {
			// CREATE API CALL TO GET DATA FROM SERVICE
			//var url = 'http://www.json-generator.com/j/cbbD';
			var url = globals.news.url;
			APIGetRequest(url, function(e) {
				var status = this.status;
				if (status == 200) {
					var Json = eval('(' + this.responseText + ')');
					for (var i = 0; i < Json.result.length; i++) {
						tableRows.push(createCustomLayout(that, Json.result[i]));
					};
					table.setData(tableRows);
					that.window.add(table);
					indicator.hide();
				}
			}, function(err) {
				indicator.hide();
				alert('Unknow error from api');
			});
		} else {
			indicator.hide();
			alert('No internet connection found');
		}
	});

	return this.window;
};

module.exports = News;
