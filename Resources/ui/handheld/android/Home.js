Ti.include(Titanium.Filesystem.resourcesDirectory + "helpers/apiHelper.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");
var globals = require('globals').Globals;
var styles = require('globals').Styles;

function homeLogo(context) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 'none'
	});

	var logoView = Ti.UI.createView({
		top : 0,
		backgroundColor : 'transparent',
		height : 130 * dp,
		layout : 'vertical'
	});
	row.add(logoView);

	var img_logo = Ti.UI.createImageView({
		image : '/images/home-logo.png',
		height : 95 * dp,
		width : 95 * dp,
		top : 3 * dp
	});
	logoView.add(img_logo);

	var lbl_company = Ti.UI.createLabel({
		color : styles.home_logo.color,
		text : 'Precision Flight Control',
		font : styles.home_logo.font
	});
	logoView.add(lbl_company);

	row.height = logoView.toImage().height + 10 * dp;
	Ti.API.info('row height: ' + row.height);

	return row;

}

function createCustomButton(context, btnProperties) {
	var btn_custom = Ti.UI.createView({
		top : 0,
		height : (Ti.Platform.displayCaps.platformWidth / 2) - 20 * dp,
		width : (Ti.Platform.displayCaps.platformWidth / 2) - 20 * dp,
		backgroundColor : styles.home_button.backgroundColor,
		backgroundSelectedColor : styles.home_button.selectedBackgroundColor,
	});
	if (btnProperties.left) {
		btn_custom.left = btnProperties.left;
	} else {
		btn_custom.right = btnProperties.right;
	}

	var icon = Ti.UI.createImageView({
		image : btnProperties.image,
		height : 64 * dp,
		width : 64 * dp,
		hires : true,
		touchEnabled : false
	});
	btn_custom.add(icon);

	var lbl_title = Ti.UI.createLabel({
		color : styles.home_button.color,
		text : btnProperties.title,
		font : styles.home_button.font,
		bottom : 10 * dp,
		touchEnabled : false
	});
	btn_custom.add(lbl_title);

	return btn_custom;
}

function createHomeButtonsSecond(context, top) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 'none'
	});

	var btnView = Ti.UI.createView({
		top : 10 * dp,
		backgroundColor : 'transparent',
		height : Ti.UI.SIZE,
		width : Ti.Platform.displayCaps.platformWidth
	});
	row.add(btnView);
	//
	// Map
	//
	var btn_map = createCustomButton(context, {
		image : '/images/home-map@2x.png',
		title : 'Map',
		left : 14 * dp
	});
	btn_map.addEventListener('click', function(e) {
		var MapWin = require('/ui/handheld/android/Map');
		MapWin = new MapWin(null, false);
		MapWin.open();
	});
	btnView.add(btn_map);
	//
	// Elements
	//
	var btn_elements = createCustomButton(context, {
		image : '/images/home-elements@2x.png',
		title : 'Elements',
		right : 14 * dp
	});
	btn_elements.addEventListener('click', function(e) {
		var ElementsWin = require('/ui/handheld/android/Elements');
		ElementsWin = new ElementsWin(null, false);
		ElementsWin.open();
	});
	btnView.add(btn_elements);

	return row;
}

function createHomeButtons(context) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 'none',
		height : Ti.UI.SIZE
	});

	var btnView = Ti.UI.createView({
		top : 18 * dp,
		backgroundColor : 'transparent',
		height : Ti.UI.SIZE
	});
	row.add(btnView);
	//
	// News
	//
	var btn_news = createCustomButton(context, {
		image : '/images/home-news@2x.png',
		title : 'News',
		left : 14 * dp
	});
	btn_news.addEventListener('click', function(e) {
		var NewsWin = require('/ui/handheld/android/News');
		NewsWin = new NewsWin(null, false);
		NewsWin.open();
	});
	btnView.add(btn_news);
	//
	// Products
	//
	var btn_products = createCustomButton(context, {
		image : '/images/home-products@2x.png',
		title : 'Products',
		right : 14 * dp
	});
	btn_products.addEventListener('click', function(e) {
		var ProductsWin = require('/ui/handheld/android/Products');
		ProductsWin = new ProductsWin(null, false);
		ProductsWin.open();
	});
	btnView.add(btn_products);

	return row;

}

function create_Table(context) {
	var table = Ti.UI.createTableView({
		showVerticalScrollIndicator : false,
		top : 48 * dp,
		height : 'auto',
		backgroundColor : 'transparent',
		separatorStyle : 'none'
	});
	var data = [];

	// LOGO VIEW
	var row1 = homeLogo(context);
	data.push(row1);
	// BUTTON VIEWS
	var rowButtons = createHomeButtons(context);
	data.push(rowButtons);
	var rowButtonsSecond = createHomeButtonsSecond(context);
	data.push(rowButtonsSecond);
	//
	table.setData(data);
	context.HomeWin.add(table);
}

function Home(argument) {
	return this.init.apply(this, arguments);
}

Home.prototype.init = function(argument, isFlyout) {
	var that = this;

	this.HomeWin = require('/ui/handheld/android/ParentView');
	this.HomeWin = new this.HomeWin();

	var lbl_title = Ti.UI.createLabel({
		text : argument.menuItem.title,
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Bold'
		},
		color : '#fff'
	});
	this.HomeWin.headerView.add(lbl_title);
	this.HomeWin.headerView.add(rightNavButton(this));
	// CREATE MENU VIEW
	this.menuView = createRightMenu(this);
	this.HomeWin.add(this.menuView);
	this.isMenuShown = false;
	//CREATE TABLE
	create_Table(this);

	return this.HomeWin;

};

module.exports = Home;
