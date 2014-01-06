var globals = require('globals').Globals;
var styles = require('globals').Styles;
Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");

function createLayout(context) {
	var rowImage = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		backgroundColor : 'transparent'
	});
	/*
	 * Image
	 */
	var coverImage = Ti.UI.createImageView({
		image : context.userInfo.picture,
		top : 10 * dp,
		right : 14 * dp,
		left : 14 * dp,
		bottom : 10 * dp,
		width : Ti.Platform.displayCaps.platformWidth - (28 * dp),
		hires : true
	});
	rowImage.add(coverImage);
	/*
	 * Title
	 */
	var rowTitle = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		selectionStyle : 'none',
		layout : 'vertical',
		backgroundColor : 'transparent'
	});

	var lbl_name = Ti.UI.createLabel({
		text : context.userInfo.title,
		color : styles.detail_title.color,
		font : styles.detail_title.font,
		top : 0,
		left : 14 * dp,
		wordWrap : true,
		height : Ti.UI.SIZE
	});
	rowTitle.add(lbl_name);
	/*
	 * Tags
	 */
	var tagView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		left : 14 * dp
	});
	rowTitle.add(tagView);

	Ti.API.info(context.userInfo.tags.length);
	for (var i = 0; i < context.userInfo.tags.length; i++) {
		var lbl_tag = Ti.UI.createLabel({
			color : styles.detail_tags.color,
			font : styles.detail_tags.font,
			left : 0
		});
		if ((i + 1) == context.userInfo.tags.length) {
			lbl_tag.text = context.userInfo.tags[i];
		} else {
			lbl_tag.text = context.userInfo.tags[i] + ', ';
		}

		tagView.add(lbl_tag);
	};
	/*
	 * Body text
	 */
	var rowDetail = Ti.UI.createTableViewRow({
		height : 'auto',
		selectionStyle : 'none',
		backgroundColor : 'transparent'
	});

	var lbl_detail = Ti.UI.createLabel({
		text : context.userInfo.body,
		color : styles.detail_body.color,
		left : 14 * dp,
		right : 14 * dp,
		top : 10 * dp,
		wordWrap : true,
		font : styles.detail_body.font
	});
	rowDetail.add(lbl_detail);

	context.tableRows.push(rowImage);
	context.tableRows.push(rowTitle);
	context.tableRows.push(rowDetail);

}

function create_Table(context) {
	var table = Ti.UI.createTableView({
		showVerticalScrollIndicator : false,
		height : 'auto',
		backgroundColor : 'transparent',
		separatorStyle : 'none',
		top : 48 * dp
	});

	return table;
}

function headerbar(context) {
	var view = Ti.UI.createView({
		height : 48 * dp,
		top : 0,
		backgroundColor : '#232323'
	});

	var btn_back = Ti.UI.createButton({
		backgroundImage : '/images/btn_back.png',
		height : 40 * dp,
		width : 40 * dp,
		left : 5 * dp,
		zIndex : 5
	});
	view.add(btn_back);

	btn_back.addEventListener('click', function(e) {
		context.window.close();
	});

	var dividerLeft = Ti.UI.createView({
		height : 48 * dp,
		width : 1 * dp,
		backgroundColor : '#343434',
		left : 50 * dp,
		zIndex : 5
	});
	view.add(dividerLeft);

	var dividerRight = Ti.UI.createView({
		height : 48 * dp,
		width : 1 * dp,
		backgroundColor : '#343434',
		right : 50 * dp,
		zIndex : 5
	});
	view.add(dividerRight);

	var lbl_title = Ti.UI.createLabel({
		text : 'News Detail',
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Bold'
		},
		color : '#fff'
	});
	view.add(lbl_title);

	var divider = Ti.UI.createView({
		height : 1 * dp,
		width : Ti.Platform.displayCaps.platformWidth,
		backgroundColor : '#343434',
		bottom : 0,
		zIndex : 5
	});
	view.add(divider);

	return view;
}

function NewsDetail(argument) {
	return this.init.apply(this, arguments);
}

NewsDetail.prototype.init = function(argument) {
	var that = this;
	this.userInfo = argument;

	this.window = Ti.UI.createWindow({
		backgroundColor : styles.win.backgroundColor,
		zIndex : 20,
		exitOnClose : false,
		navBarHidden : true,
		orientationModes : [Ti.UI.PORTRAIT]
	});
	this.window.add(headerbar(this));

	this.window.addEventListener('open', function(e) {
		that.tableRows = [];
		var table = create_Table(that);
		createLayout(that);
		table.setData(that.tableRows);
		that.window.add(table);
	});

	this.window.addEventListener('androidback', function(e) {
		that.window.close();
	});

	return this.window;
};

module.exports = NewsDetail;
