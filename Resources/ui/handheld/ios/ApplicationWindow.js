var globals = require('globals').Globals;
var styles = require('globals').Styles;
var _ = require('controls/underscore')._;

function leftMenuButton(context) {
	var btn_menu = Ti.UI.createButton({
		title : '',
		image : '/images/icon_menu.png',
	});

	btn_menu.addEventListener('click', function(e) {
		if (globals.menuVisible) {
			globals.menuVisible = false;
			context.navGroup.animate(Ti.UI.createAnimation(globals.animations.right));
		} else {
			globals.menuVisible = true;
			context.navGroup.animate(Ti.UI.createAnimation(globals.animations.left));
		}
	});

	return btn_menu;

}

function ApplicationWindow() {
	return this.init.apply(this, arguments);
}

ApplicationWindow.prototype.init = function(argument) {
	var that = this;
	// CREATE A WINDOW WHICH WILL HAVE THE MENU BUTTON
	this.window = Ti.UI.createWindow({
		backgroundColor : styles.win.backgroundColor
	});

	// CODE TO BE EXECUTED WHEN THIS WINDOW IS OPENED AT THE START
	this.window.addEventListener('open', function(e) {
		that.navGroup = Ti.UI.iOS.createNavigationWindow({
			left : 0
		});

		var windows = {};
		var currentWindow = '_home';
		var index = 0;
		_.each(globals.menu, function(item) {
			windows[item.name] = index++;
		});

		var currentWindowIndex = windows[currentWindow];
		var newWindow = new (require(globals.menu[currentWindowIndex].src))(that.navGroup, {
			title : globals.menu[currentWindowIndex].title,
			name : globals.menu[currentWindowIndex].name
		});
		var currentWindowObject = newWindow;
		newWindow.leftNavButton = leftMenuButton(that);
		that.navGroup.window = newWindow;
		that.navGroup.width = 320;
		that.navGroup.open();

		that.window.add(that.navGroup);

		var FlyoutMenu = require('/controls/FlyoutMenu');
		var flyoutMenu = new FlyoutMenu(currentWindowIndex);
		that.window.add(flyoutMenu);

		globals.flyoutMenu = flyoutMenu;
		flyoutMenu.addEventListener('menu:selected', function(e) {
			if (e.name == '_main_menu') {
				// DO NOTHING
			} else if (e.name == '_options') {
				alert('option menu clicked');
			} else if (e.name == currentWindow) {
				// HIDE THE MENU AFRER SELECTION
				globals.menuVisible = false;
				var animation = Ti.UI.createAnimation(globals.animations.right);
				animation.addEventListener('complete', function(e) {
					that.navGroup.left = 0;
				});
				that.navGroup.animate(animation);
			} else {
				Ti.API.info('Current opened window is: ' + currentWindow);
				Ti.API.info('Selected window name: ' + e.name);
				currentWindow = e.name;
				var windowsIndex = windows[e.name];
				Ti.API.info('Selected window Index: ' + windowsIndex);

				newWindow = new (require(globals.menu[windowsIndex].src))(that.navGroup, {
					title : globals.menu[windowsIndex].title,
					name : globals.menu[windowsIndex].name
				});
				newWindow.leftNavButton = leftMenuButton(that);
				that.navGroup.left = 0;
				that.navGroup.openWindow(newWindow, {
					animated : true
				});
				that.navGroup.window = newWindow;
				currentWindowObject = newWindow;
				// HIDE THE MENU AFRER SELECTION
				globals.menuVisible = false;
				var animation = Ti.UI.createAnimation(globals.animations.right);
				animation.addEventListener('complete', function(e) {
					that.navGroup.left = 0;
				});
				that.navGroup.animate(animation);

			}
		});

		flyoutMenu.addEventListener('menu:hide', function(e) {
			globals.menuVisible = false;
				var animation = Ti.UI.createAnimation(globals.animations.right);
				animation.addEventListener('complete', function(e) {
				that.navGroup.left = 0;
			});
			that.navGroup.animate(animation);
		});
		
		flyoutMenu.addEventListener('right:menu:selected', function(e) {
			Ti.API.info('Current opened window is: ' + currentWindow);
			Ti.API.info('Selected window name: ' + e.name);
			that.navGroup.close(currentWindowObject);
			Ti.API.info('Previously opened window closed');
			currentWindow = e.name;
			var windowsIndex = windows[e.name];
			Ti.API.info('Selected window Index: ' + windowsIndex);
			newWindow = new (require(globals.menu[windowsIndex].src))(that.navGroup, {
				title : globals.menu[windowsIndex].title,
				name : globals.menu[windowsIndex].name
			});
			newWindow.leftNavButton = leftMenuButton(that);
			currentWindowObject = newWindow;
			that.navGroup.open(newWindow, {
				animated : false
			});
			globals.menuVisible = false;
		});
	});

	return this.window;
};

module.exports = ApplicationWindow;
