Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");
var styles = require('globals').Styles;
var globals = require('globals').Globals;

function Setting(argument) {
	return this.init.apply(this, arguments);
}

Setting.prototype.init = function(argument, isFlyout) {
	var that = this;
	this.winTitle = (argument != null) ? argument.menuItem.title : 'Settings';

	if (isFlyout) {
		this.SettingWin = require('/ui/handheld/android/ParentView');
		this.SettingWin = new this.SettingWin();

		var lbl_title = Ti.UI.createLabel({
			text : this.winTitle,
			font : {
				fontSize : 18 * dp,
				fontFamily : 'Montserrat',
				fontWeight : 'Bold'
			},
			color : '#fff'
		});
		this.SettingWin.headerView.add(lbl_title);
	} else {
		this.SettingWin = Ti.UI.createWindow({
			backgroundColor : styles.win.backgroundColor,
			zIndex : 20,
			exitOnClose : false,
			navBarHidden : true,
			orientationModes : [Ti.UI.PORTRAIT]
		});
		this.SettingWin.add(globals.setHeaderBar(this.SettingWin, this.winTitle));

		this.SettingWin.addEventListener('open', function(e) {

		});

		this.SettingWin.addEventListener('androidback', function(e) {
			that.SettingWin.close();
		});
	}

	// Add label
	var label = Ti.UI.createLabel({
		text : 'dp / dpi: ' + Ti.Platform.displayCaps.dpi / 160 + ' / ' + Ti.Platform.displayCaps.dpi,
		textAlign : 'left',
		left : (18 * dp),
		color : '#ffffff',
		font : styles.flyout_menu_item.font
	});

	this.SettingWin.add(label);

	return this.SettingWin;
};

module.exports = Setting;
