Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");
var styles = require('globals').Styles;
var globals = require('globals').Globals;

function createProductView(context, product, position) {
	/*
	 * Product View
	 */
	var view = Ti.UI.createView({
		height : Ti.UI.SIZE,
		bottom : 7 * dp,
		top : 7 * dp,
		left : position.left,
		backgroundSelectedColor : styles.home_button.selectedBackgroundColor,
		//width : (Ti.Platform.displayCaps.platformWidth - (42 * dp)) / 2,
		width : (Ti.Platform.displayCaps.platformWidth - (14 * dp)) / 2,
		info : product
	});
	/*
	 * Product inner View
	 * We need this View in order to 
	 * add a padding for the Products View.
	 * This padding is visible when the Hover Effect 
	 * occur. 
	 */
	var inner_view = Ti.UI.createView({
		top: 7 * dp,
		right: 7 * dp,
		bottom : 7 * dp,
		left : 7 * dp,
		layout : 'vertical',
		height : Ti.UI.SIZE,
		info : product,
	});
	
	/*
	 * Hover effect
	 */
	view.addEventListener('touchstart', function(e) {
		view.backgroundColor = styles.home_button.selectedBackgroundColor;
	});

	view.addEventListener('touchcancel', function(e) {
		view.backgroundColor = 'transparent';
	});

	view.addEventListener('touchend', function(e) {
		view.backgroundColor = 'transparent';
	});
	/*
	 * Open Details window
	 */
	view.addEventListener('click', function(e) {
		var detailWin = require('/ui/handheld/android/ProductDetail');
		detailWin = new detailWin(e.source.info);
		detailWin.open();
	});
	/*
	 * Image
	 */
	var image = Ti.UI.createImageView({
		height : 155 * dp,
		hires : true,
		preventDefaultImage : true,
		image : product.thumb,
		left : 0,
		top : 0,
		width : (Ti.Platform.displayCaps.platformWidth - (42 * dp)) / 2,
		info : product
	});
	//view.add(image);
	inner_view.add(image);

	image.addEventListener('touchstart', function(e) {
		view.backgroundColor = styles.home_button.selectedBackgroundColor;
	});

	image.addEventListener('touchcancel', function(e) {
		view.backgroundColor = 'transparent';
	});

	image.addEventListener('touchend', function(e) {
		view.backgroundColor = 'transparent';
	});

	var info_view = Ti.UI.createView({
		height : Ti.UI.SIZE,
		layout : 'vertical',
		// top : 165 * dp,
		info : product
	});
	//view.add(info_view);
	inner_view.add(info_view);
	/*
	 * Title
	 */
	var lbl_title = Ti.UI.createLabel({
		text : product.title,
		color : styles.feed_table_row_title.color,
		left : 0,
		font : styles.feed_table_row_title.font,
		top : 10 * dp,
		height : Ti.UI.SIZE,
		wordWrap : true,
		info : product
	});
	info_view.add(lbl_title);

	var tagView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		left : 0,
		top : 0,
		info : product
	});
	info_view.add(tagView);

	for (var i = 0; i < product.tags.length; i++) {
		var lbl_tag = Ti.UI.createLabel({
			color : styles.feed_table_row_tags.color,
			font : styles.feed_table_row_tags.font,
			left : 0,
			info : product
		});
		if ((i + 1) == product.tags.length) {
			lbl_tag.text = product.tags[i];
		} else {
			lbl_tag.text = product.tags[i] + ', ';
		}

		tagView.add(lbl_tag);
	};

	var lbl_detail = Ti.UI.createLabel({
		text : (product.body.length > 37) ? product.body.substring(0, 37) + '...' : product.body,
		color : styles.feed_table_row_teaser.color,
		left : 0,
		right : 14 * dp,
		height : 35 * dp,
		top : 10 * dp,
		font : styles.feed_table_row_teaser.font,
		info : product
	});
	info_view.add(lbl_detail);
	
	view.add(inner_view);
	return view;
}

function createLayout(context, Products, OuterView) {
	var row;
	var _left = 7 * dp;
	for (var i = 0; i < Products.length; i++) {
		var view1 = createProductView(context, Products[i], {
			left : _left
		});
		if (i == 0) {
			row = Titanium.UI.createView({
				backgroundSelectedColor : 'transparent',
				height : Ti.UI.SIZE
			});
		}
		row.add(view1);
		if (((i - 1) % 2 == 0) || (i == Products.length - 1)) {
			_left = 7 * dp;
			OuterView.add(row);

			var divider = Ti.UI.createView({
				height : 1 * dp,
				width : Ti.Platform.displayCaps.platformWidth,
				backgroundColor : '#343434'
			});
			OuterView.add(divider);

			row = Titanium.UI.createView({
				backgroundSelectedColor : 'transparent',
				height : Ti.UI.SIZE
			});
		} else {
			//_left = (Ti.Platform.displayCaps.platformWidth / 2) + (7 * dp);
			_left = (Ti.Platform.displayCaps.platformWidth / 2);
		}
	}
}

function createScroll(context, Products) {
	var scroll = Ti.UI.createScrollView({
		height : 'auto',
		top : 48 * dp,
		width : Ti.Platform.displayCaps.platformWidth,
		backgroundColor : 'transparent'
	});

	var OuterView = Ti.UI.createView({
		height : 'auto',
		layout : 'vertical',
		width : Ti.Platform.displayCaps.platformWidth,
		backgroundColor : 'tranparent'
	});
	scroll.add(OuterView);

	createLayout(context, Products, OuterView);

	return scroll;
}

function ProductsView(argument) {
	return this.init.apply(this, arguments);
}

ProductsView.prototype.init = function(argument, isFlyout) {
	var that = this;
	this.winTitle = (argument != null) ? argument.menuItem.title : 'Products Views';

	if (isFlyout) {
		this.ProductWin = require('/ui/handheld/android/ParentView');
		this.ProductWin = new this.ProductWin();

		var lbl_title = Ti.UI.createLabel({
			text : argument.menuItem.title,
			font : {
				fontSize : 18 * dp,
				fontFamily : 'Montserrat',
				fontWeight : 'Bold'
			},
			color : '#fff'
		});
		this.ProductWin.headerView.add(lbl_title);
	}

	var indicator = Ti.UI.createActivityIndicator({
		style : Titanium.UI.ActivityIndicatorStyle.PLAIN
	});
	this.ProductWin.add(indicator);
	indicator.show();

	if (Titanium.Network.online) {
		var url = globals.products.url;
		APIGetRequest(url, function(e) {
			var status = this.status;
			if (status == 200) {
				var Json = eval('(' + this.responseText + ')');
				if (Json.result.length > 0) {
					that.ProductWin.add(createScroll(that, Json.result));
				} else {
					alert('No products found');
				}
				indicator.hide();
			}
		}, function(err) {
			indicator.hide();
			alert('Unknow error from server');
		});
	} else {
		indicator.hide();
		alert('No internet connection found');
	}
	return this.ProductWin;
};

module.exports = ProductsView;
