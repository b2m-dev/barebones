var globals = require('globals').Globals;
var styles = require('globals').Styles;
Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");

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
		backgroundSelectedColor : styles.feed_table_row.selectedBackgroundColor,
		userInfo : userInfo
	});

	row.addEventListener('click', function(e) {
		//context.isMenuShown = false;
		//context.menuView.animate(slide_out_top);
		var detailWin = require('/ui/handheld/android/NewsDetail');
		detailWin = new detailWin(e.row.userInfo);
		detailWin.open();
	});

	/*
	 * Image
	 */
	var image = Ti.UI.createImageView({
		image : userInfo.picture,
		// width : 48 * dp,
		width : styles.feed_table_row.imageWidth * dp,
		top : 12 * dp,
		left : 14 * dp,
		touchEnabled : false
	});
	row.add(image);
	/*
	 * Row elements container
	 */
	var Outer_Container = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : 10 * dp,
		left : (28 * dp) + image.width,
		bottom : 10 * dp,
		layout : 'vertical',
		touchEnabled : false
	});
	row.add(Outer_Container);

	var name_tag_view = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : 0,
		left : 0,
		layout : 'vertical',
		touchEnabled : false
	});
	Outer_Container.add(name_tag_view);

	var lbl_name = Ti.UI.createLabel({
		text : userInfo.title,
		color : styles.feed_table_row_title.color,
		left : 0,
		font : styles.feed_table_row_title.font,
		top : 0,
		height : Ti.UI.SIZE,
		touchEnabled : false
	});
	name_tag_view.add(lbl_name);

	var tagView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		left : 0,
		touchEnabled : false
	});
	name_tag_view.add(tagView);

	for (var i = 0; i < userInfo.tags.length; i++) {
		var lbl_tag = Ti.UI.createLabel({
			color : styles.feed_table_row_tags.color,
			font : styles.feed_table_row_tags.font,
			left : 0,
			touchEnabled : false
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
		right : 14 * dp,
		top: 10 * dp,
		font : styles.feed_table_row_teaser.font,
		touchEnabled : false
	});
	Outer_Container.add(lbl_detail);

	return row;
}

function create_Table(context) {
	var table = Ti.UI.createTableView({
		showVerticalScrollIndicator : false,
		top : 48 * dp,
		height : 'auto',
		backgroundColor : 'transparent',
		separatorColor : '#343434'
	});

	return table;
}

function News(argument) {
	return this.init.apply(this, arguments);
}

News.prototype.init = function(argument, isFlyout) {
	var that = this;
	this.winTitle = (argument != null) ? argument.menuItem.title : 'News';

	if (isFlyout) {
		this.NewsWin = require('/ui/handheld/android/ParentView');
		this.NewsWin = new this.NewsWin();

		var lbl_title = Ti.UI.createLabel({
			text : argument.menuItem.title,
			font : {
				fontSize : 18 * dp,
				fontFamily : 'Montserrat',
				fontWeight : 'Bold'
			},
			color : '#fff'
		});
		this.NewsWin.headerView.add(lbl_title);
		this.NewsWin.headerView.add(rightNavButton(this));
	} else {
		this.NewsWin = Ti.UI.createWindow({
			backgroundColor : styles.win.backgroundColor,
			zIndex : 20,
			exitOnClose : false,
			navBarHidden : true,
			orientationModes : [Ti.UI.PORTRAIT]
		});
		this.headerView = globals.setHeaderBar(this.NewsWin, this.winTitle);
		this.headerView.add(rightNavButton(this));

		this.NewsWin.add(this.headerView);
	}
	// CREATE MENU VIEW
	this.menuView = createRightMenu(this);
	this.NewsWin.add(this.menuView);
	this.isMenuShown = false;

	var indicator = Ti.UI.createActivityIndicator({
		style : Titanium.UI.ActivityIndicatorStyle.PLAIN
	});
	this.NewsWin.add(indicator);
	indicator.show();

	// DATA WILL BE POPULATED WHEN THE WINDOW WILL BE OPENED NOT WHEN REQUIRED
	var table = create_Table(this);
	var tableRows = [];
	if (Titanium.Network.online) {
		// CREATE API CALL TO GET DATA FROM SERVICE
		var url = globals.news.url;
		APIGetRequest(url, function(e) {
			var status = this.status;
			if (status == 200) {
				var Json = eval('(' + this.responseText + ')');
				for (var i = 0; i < Json.result.length; i++) {
					tableRows.push(createCustomLayout(that, Json.result[i]));
				};
				table.setData(tableRows);
				that.NewsWin.add(table);
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

	return this.NewsWin;

};

module.exports = News;
