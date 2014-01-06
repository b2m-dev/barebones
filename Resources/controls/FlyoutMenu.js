var globals = require('globals').Globals;
var styles = require('globals').Styles;
var _ = require('controls/underscore')._;
Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");

function createMenuRows(item, context) {
	var tableRow = Ti.UI.createTableViewRow({
		// height : 45,
		// height : styles.flyout_menu_item.rowHeight,
		height : (item.isHeader == null) ? styles.flyout_menu_item.rowHeight : 42,
		backgroundColor : item.rowBackgroundColor,
		// selectedBackgroundColor : '#8c5e7a',
		selectedBackgroundColor : styles.flyout_menu_item.selectedBackgroundColor,
		touchEnabled : false
	});

	var icon_menu = Ti.UI.createImageView({
		image : item.icon,
		height : 32,
		width : 32,
		hires : true,
		left : 10
	});
	tableRow.add(icon_menu);

	var divider = Ti.UI.createView({
		height : styles.flyout_menu_item.rowHeight,
		width : 1,
		backgroundColor : styles.flyout_menu_item.verticalDividerColor,
		left : 20 + icon_menu.width,
		zIndex : 5
	});
	
	if (item.name != '_main_menu') {
		tableRow.add(divider);
	}
	
	var label = Ti.UI.createLabel(_.defaults({
		text : item.title,
		textAlign : 'left',
		left : 18 + divider.left,
		color : item.color,
		font : styles.flyout_menu_item.font
	}, styles.menuRows));
	tableRow.add(label);

	if (item.name != '_main_menu') {
		var img_right_disclosure = Ti.UI.createImageView({
			image : (item.name == '_options') ? '/images/ic_arrow_down.png' : '/images/ic_arrow.png',
			height : 32,
			width : 32,
			right : 5
		});
		tableRow.add(img_right_disclosure);
	}

	var separator = Ti.UI.createView({
		height : 1,
		width : '290',
		backgroundColor : styles.flyout_menu_item.rowSeparatorColor,
		bottom : 0,
		zIndex : 5
	});
	tableRow.add(separator);

	return tableRow;
}

function FlyoutMenu(win) {
	return this.init.apply(this, arguments);
}

FlyoutMenu.prototype.init = function(args) {
	var that = this;
	this.selectedMenuItem = args;
	this.view = Ti.UI.createView({
		top : 0,
		left : 0,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		backgroundColor : styles.flyout_menu.backgroundColor,
		zIndex : -1
	});

	var menuData = globals.menu;

	var rows = [];

	var tableView = Ti.UI.createTableView({
		left : 0,
		width : 275,
		top : (version == "7") ? 18 : 0,
		showVerticalScrollIndicator : false,
		scrollable : true,
		backgroundColor : 'transparent',
		separatorStyle : 'none'
	});

	// HERE WE CREATE MENU ROWS IN THE TABLE
	_.each(menuData, function(item) {
		var tableRow = createMenuRows(item, this);
		tableRow.addEventListener('click', function(e) {
			this.fireEvent('menu:selected', {
				name : item.name
			});

		});
		rows.push(tableRow);
	});

	tableView.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {
			this.fireEvent('menu:hide', {});
		}
	});
	
	// SET DATA IN THE TABLE
	tableView.setData(rows);
	// ADD VIEW IN THE PARENT VIEW
	this.view.add(tableView);
	// MAKE MENU TABLE A PROPERTY OF PARENT VIEW
	this.view.table = tableView;

	return this.view;
};

module.exports = FlyoutMenu;
