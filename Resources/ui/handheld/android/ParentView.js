Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");
var globals = require('globals').Globals;
var _ = require('/controls/underscore')._;
var styles = require('globals').Styles;

function headerbar(context) {
	var view = Ti.UI.createView({
		height : 48 * dp,
		top : 0,
		// backgroundColor : '#232323'
		backgroundColor : styles.win.backgroundColor
	});

	var leftDivider = Ti.UI.createView({
		height : 48 * dp,
		width : 1 * dp,
		// backgroundColor : '#343434',
		backgroundColor : styles.win.separatorColor,
		left : 50 * dp,
		zIndex : 5
	});
	view.add(leftDivider);

	var rightDivider = Ti.UI.createView({
		height : 48 * dp,
		width : 1 * dp,
		// backgroundColor : '#343434',
		backgroundColor : styles.win.separatorColor,
		right : 50 * dp,
		zIndex : 5
	});
	view.add(rightDivider);

	// Create a Button.
	var btn_View = Ti.UI.createView({
		height : 48 * dp,
		width : 49 * dp,
		backgroundColor : 'transparent',
		left : 0
	});

	var aButton = Ti.UI.createButton({
		title : '',
		backgroundImage : '/images/icon_menu@2x.png',
		height : 16 * dp,
		width : 24 * dp
	});
	btn_View.add(aButton);

	// Listen for click events.
	btn_View.addEventListener('click', function() {
		if (globals.menuVisible) {
			globals.menuVisible = false;
			var animation = Titanium.UI.createAnimation();
			animation.left = 0;
			animation.duration = 500;
			context.parentView.animate(animation);
		} else {
			globals.menuVisible = true;
			var animation = Titanium.UI.createAnimation();
			animation.left = Ti.Platform.displayCaps.platformWidth - 70 * dp;
			animation.duration = 500;
			context.parentView.animate(animation);
		}
	});

	// Add to the parent view.
	view.add(btn_View);

	var divider = Ti.UI.createView({
		height : 1 * dp,
		width : Ti.Platform.displayCaps.platformWidth,
		// backgroundColor : '#343434',
		backgroundColor : styles.win.separatorColor,
		bottom : 0,
		zIndex : 5
	});
	view.add(divider);

	return view;
}

function ParentView() {
	return this.init.apply(this, arguments);
}

ParentView.prototype.init = function(argument) {
	var that = this;

	this.parentView = Ti.UI.createView({
		backgroundColor : styles.win.backgroundColor,
		barColor : styles.win.backgroundColor,
		width : Ti.Platform.displayCaps.platformWidth
	});

	var headerView = headerbar(this);
	this.parentView.headerView = headerView;
	this.parentView.add(headerView);

	return this.parentView;
};

module.exports = ParentView;
