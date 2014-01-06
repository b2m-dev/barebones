Ti.include(Titanium.Filesystem.resourcesDirectory + "helpers/apiHelper.js");
Ti.include(Titanium.Filesystem.resourcesDirectory + "controls/RightMenu.js");
var globals = require('globals').Globals;
var styles = require('globals').Styles;

function homeLogo(context) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 'none'
	});

	var logoView = Ti.UI.createView({
		top : 0,
		backgroundColor : 'transparent',
		height : Ti.UI.SIZE,
		layout : 'vertical'
	});
	row.add(logoView);

	var img_logo = Ti.UI.createImageView({
		image : '/images/home-logo.png',
		height : 95,
		width : 95,
		top : 3
	});
	logoView.add(img_logo);

	var lbl_company = Ti.UI.createLabel({
		color : styles.home_logo.color,
		text : 'Precision Flight Control',
		font : styles.home_logo.font
	});
	logoView.add(lbl_company);


	row.height = logoView.toImage().height + 10;
	Ti.API.info('row height: ' + row.height);

	return row;

}

function createCustomButton(context, btnProperties) {
	var btn_custom = Ti.UI.createView({
		top : 0,
		height : 140,
		width : 140,
		backgroundColor : styles.home_button.backgroundColor
	});
	if (btnProperties.left) {
		btn_custom.left = btnProperties.left;
	} else {
		btn_custom.right = btnProperties.right;
	}

	btn_custom.addEventListener('touchstart', function(e) {
		btn_custom.backgroundColor = styles.home_button.selectedBackgroundColor;
	});

	btn_custom.addEventListener('touchcancel', function(e) {
		btn_custom.backgroundColor = styles.home_button.backgroundColor;
	});

	btn_custom.addEventListener('touchend', function(e) {
		btn_custom.backgroundColor = styles.home_button.backgroundColor;
	});

	var icon = Ti.UI.createImageView({
		image : btnProperties.image,
		height : 64,
		width : 64,
		hires : true
	});
	btn_custom.add(icon);

	var lbl_title = Ti.UI.createLabel({
		color : styles.home_button.color,
		text : btnProperties.title,
		font : styles.home_button.font,
		bottom : 10
	});
	btn_custom.add(lbl_title);

	return btn_custom;
}

function createHomeButtonsSecond(context, top) {
	var row = Ti.UI.createTableViewRow({
		selectionStyle : 'none'
	});

	var btnView = Ti.UI.createView({
		top : 10,
		backgroundColor : 'transparent',
		height : Ti.UI.SIZE,
		width : Ti.Platform.displayCaps.platformWidth
	});
	row.add(btnView);
	//
	// Map
	//
	var btn_map = createCustomButton(context, {
		image : '/images/home-map.png',
		title : 'Map',
		left : 14
	});
	btn_map.addEventListener('click', function(e) {
		var MapWin = require('/ui/handheld/ios/Map');
		MapWin = new MapWin(context.navGroup, {
			title : 'Map'
		});
		context.navGroup.openWindow(MapWin);
	});
	btnView.add(btn_map);
	//
	// Elements
	//
	var btn_elements= createCustomButton(context, {
		image : '/images/home-elements.png',
		title : 'Elements',
		right : 14
	});
	btn_elements.addEventListener('click', function(e) {
		var ElementsWin = require('/ui/handheld/ios/Elements');
		ElementsWin = new ElementsWin(context.navGroup, {
			title : 'Elements'
		});
		context.navGroup.openWindow(ElementsWin);
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
		top : 18,
		backgroundColor : 'transparent',
		height : Ti.UI.SIZE
	});
	row.add(btnView);
	//
	// News
	//
	var btn_news = createCustomButton(context, {
		image : '/images/home-news.png',
		title : 'News',
		left : 14
	});
	btn_news.addEventListener('click', function(e) {
		var NewsWin = require('/ui/handheld/ios/News');
		NewsWin = new NewsWin(context.navGroup, {
			title : 'News'
		});
		context.navGroup.openWindow(NewsWin);
	});
	btnView.add(btn_news);
	//
	// Products
	//
	var btn_products = createCustomButton(context, {
		image : '/images/home-products.png',
		title : 'Products',
		right : 14
	});
	btn_products.addEventListener('click', function(e) {
		var ProductsWin = require('/ui/handheld/ios/Products');
		ProductsWin = new ProductsWin(context.navGroup, {
			title : 'Products'
		});
		context.navGroup.openWindow(ProductsWin);
	});
	btnView.add(btn_products);

	return row;
	//createHomeButtonsSecond(context, (btnView.toImage().height + btnView.top));
}

function create_Table(context) {
	var table = Ti.UI.createTableView({
		showVerticalScrollIndicator : false,
		height : 'auto',
		backgroundColor : 'transparent',
		separatorStyle : 'none'
	});
	var data = [];
	//
	// Logo
	var row1 = homeLogo(context);
	data.push(row1);
	//
	// Buttons 1st row
	var rowButtons = createHomeButtons(context);
	data.push(rowButtons);
	//
	// Buttons 2nd row
	var rowButtonsSecond = createHomeButtonsSecond(context);
	data.push(rowButtonsSecond);
	
	table.setData(data);
	context.window.add(table);
}

function Home(argument) {
	return this.init.apply(this, arguments);
}

Home.prototype.init = function(argument, Info) {
	var that = this;
	this.navGroup = argument;

	this.window = Ti.UI.createWindow({
		backgroundColor : styles.win.backgroundColor,
		barColor : styles.win.barColor,
		rightNavButton : rightNavButton(this),
		navTintColor : styles.navTintColor,
		translucent : false
	});

	
	this.window.setTitleControl(globals.setCustomTitle(Info.title));
	// CREATE MENU VIEW
	this.menuView = createRightMenu(this);
	this.window.add(this.menuView);
	this.isMenuShown = false;
	//CREATE TABLE
	create_Table(this);

	this.window.addEventListener('click', function(e) {
		that.isMenuShown = false;
		that.menuView.animate(slide_out_top);
	});

	return this.window;
};

module.exports = Home;
