Ti.include(Titanium.Filesystem.resourcesDirectory + "constants/appConstants.js");
exports.Globals = {
	menuVisible : false,
	navWindows : [],

	// Flyout Menu's Global Instance'
	flyoutMenu : null,

	// HEIGHT AND WIDTH FOR DIFFERENT DEVICES IN ANDROID
	heightRatio : Titanium.Platform.Android ? Titanium.Platform.displayCaps.platformHeight / 480 : 1,
	widthRatio : Titanium.Platform.Android ? Titanium.Platform.displayCaps.platformWidth / 320 : 1,

	// CUSTOM HEADER BAR FOR NON FLYOUT WINDOWS
	setHeaderBar : function(currentWindow, title) {
		var view = Ti.UI.createView({
			height : 48 * dp,
			top : 0,
			backgroundColor : '#115DF6'
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
			currentWindow.close();
		});

		var dividerLeft = Ti.UI.createView({
			height : 48 * dp,
			width : 1 * dp,
			backgroundColor : '#9FBFFE',
			left : 50 * dp,
			zIndex : 5
		});
		view.add(dividerLeft);

		var dividerRight = Ti.UI.createView({
			height : 48 * dp,
			width : 1 * dp,
			backgroundColor : '#9FBFFE',
			right : 50 * dp,
			zIndex : 5
		});
		view.add(dividerRight);

		var lbl_title = Ti.UI.createLabel({
			text : title,
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
			backgroundColor : '#9FBFFE',
			bottom : 0,
			zIndex : 5
		});
		view.add(divider);

		return view;
	},

	setCustomTitle : function(titleValue) {
		var view = Ti.UI.createView({
			backgroundColor : 'transparent',
			width : Ti.UI.SIZE
		});

		var lbl_title = Ti.UI.createLabel({
			text : titleValue,
			color : '#fff',
			font : {
				fontSize : 18,
				fontFamily : 'Montserrat',
				fontWeight : 'Bold'
			}
		});

		view.add(lbl_title);

		return view;
	},

	animations : {
		left : {
			left : 275,
			curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
			duration : 200
		},
		right : {
			left : 0,
			curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
			duration : 200
		}
	},

	menu : [{
		title : 'MAIN MENU',
		name : '_main_menu',
		src : '',
		color : '#f6f6f6',
		icon : '/images/ic_menu.png',
		iconAndroid : '/images/ic_menu@2x.png',
		rowBackgroundColor : '#292929',
		isHeader : true
	}, {
		title : 'Home',
		name : '_home',
		src : Titanium.Platform.Android ? '/ui/handheld/android/Home' : '/ui/handheld/ios/Home',
		color : '#656565',
		icon : '/images/ic_home.png',
		iconAndroid : '/images/ic_home@2x.png',
		rowBackgroundColor : '#292929'
	}, {
		title : 'News',
		name : '_news',
		src : Titanium.Platform.Android ? '/ui/handheld/android/News' : '/ui/handheld/ios/News',
		color : '#656565',
		icon : '/images/ic_news.png',
		iconAndroid : '/images/ic_news@2x.png',
		rowBackgroundColor : '#292929'
	}, {
		title : 'Products',
		name : '_products',
		src : Titanium.Platform.Android ? '/ui/handheld/android/Products' : '/ui/handheld/ios/Products',
		color : '#656565',
		icon : '/images/ic_products.png',
		iconAndroid : '/images/ic_products@2x.png',
		rowBackgroundColor : '#292929'
	}, {
		title : 'Map',
		name : '_map',
		src : Titanium.Platform.Android ? '/ui/handheld/android/Map' : '/ui/handheld/ios/Map',
		color : '#656565',
		icon : '/images/ic_map.png',
		iconAndroid : '/images/ic_map@2x.png',
		rowBackgroundColor : '#292929'
	}, {
		title : 'Contact',
		name : '_contact',
		src : Titanium.Platform.Android ? '/ui/handheld/android/Contact' : '/ui/handheld/ios/Contact',
		color : '#656565',
		icon : '/images/ic_contact.png',
		iconAndroid : '/images/ic_contact@2x.png',
		rowBackgroundColor : '#292929'
	}, {
		title : 'Elements',
		name : '_elements',
		src : Titanium.Platform.Android ? '/ui/handheld/android/Elements' : '/ui/handheld/ios/Elements',
		color : '#656565',
		icon : '/images/ic_elements.png',
		iconAndroid : '/images/ic_elements@2x.png',
		rowBackgroundColor : '#292929'
	}, {
		title : 'More Options',
		name : '_options',
		src : '',
		color : '#ffffff',
		icon : '/images/ic_more_option.png',
		iconAndroid : '/images/ic_more_option@2x.png',
		rowBackgroundColor : '#8c5e7a',
		isHeader : true
	}, {
		title : 'Products Views',
		name : '_products',
		src : Titanium.Platform.Android ? '/ui/handheld/android/ProductsView' : '/ui/handheld/ios/Products',
		color : '#656565',
		icon : '/images/ic_products.png',
		iconAndroid : '/images/ic_products@2x.png',
		rowBackgroundColor : '#292929'
	}, {
		title : 'Settings',
		name : '_setting',
		src : Titanium.Platform.Android ? '/ui/handheld/android/Setting' : '/ui/handheld/ios/Setting',
		color : '#656565',
		icon : '/images/ic_settings.png',
		iconAndroid : '/images/ic_settings@2x.png',
		rowBackgroundColor : '#292929'
	}],

	rightMenuItems : [{
		title : 'Menu Item 1',
		color : '#656565'
	}, {
		title : 'Menu Item 2',
		color : '#656565'
	}, {
		title : 'More Options',
		color : '#656565'
	}, {
		title : 'Settings',
		color : '#656565'
	}],

	news : {
		url : 'http://skounis.s3.amazonaws.com/mobile-apps/barebone/news.json'
	},

	products : {
		url : 'http://skounis.s3.amazonaws.com/mobile-apps/barebone/products.json'
	}

};

exports.Styles = {
	menuRows : {
		hasChild : true,
		color : '#fff',
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		}
	},
	//
	// Flyout Menu (left menu)
	//
	flyout_menu : {
		backgroundColor : '#292929'
	},

	flyout_menu_item : {
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		},
		rowHeight : 60 * dp,
		selectedBackgroundColor : '#8c5e7a',
		verticalDividerColor : '#9FBFFE',
		rowSeparatorColor : '#9FBFFE',
	},
	//
	// Windows / Views
	//
	win : {
		backgroundColor : '#EEF4FE',
		barColor : '#EEF4FE',
		separatorColor : '#9FBFFE'
	},
	//
	// Right menu
	//
	right_menu : {
		color : '#656565',
		backgroundColor : '#292929',
		selectedBackgroundColor : '#8c5e7a',
		rowSeparatorColor : '#9FBFFE',
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		},
		width : 175 * dp,
		rowHeight : 48 * dp
	},
	//
	// Home (eg: Home view)
	//
	home_logo : {
		color : '#ffffff',
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	home_button : {
		color : '#ffffff',
		backgroundColor : '#579aa9',
		selectedBackgroundColor : '#8c5e7a',
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},
	//
	// Widgets (textfields, buttons etc eg: Contact view)
	//
	textfield : {
		color : '#ffffff',
		placeholderColor : '#656565',
		borderColor : '#2e2e2e',
		height : 55 * dp,
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	textarea : {
		color : '#ffffff',
		placeholderColor : '#656565',
		borderColor : '#2e2e2e',
		height : 143 * dp,
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	button : {
		color : '#ffffff',
		// backgroundColor : '#1b7e5a',
		backgroundColor : '#579aa9',
		selectedBackgroundColor : '#8c5e7a',
		height : 55 * dp,
		font : {
			fontSize : 18 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},
	
	button_bar : {
		backgroundColor : '#447d89',
		font : {
			fontSize : 16 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	tabbed_bar : {
		backgroundColor : '#775068',
		font : {
			fontSize : 16 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},
	
	lableProgress : {
		color : '#fff',
		font : {
			fontSize : 14 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},
	//
	// Feed (eg: News view)
	//
	feed_table : {

	},

	feed_table_row : {
		imageWidth : 96 * dp, /* heigh: auto */
		backgroundColor : 'transparent',
		selectedBackgroundColor : '#8c5e7a',
	},

	feed_table_row_title : {
		color : '#ffffff',
		font : {
			fontSize : 15 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	feed_table_row_tags : {
		color : '#4f4f4f',
		font : {
			fontSize : 11 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	feed_table_row_teaser : {
		font : {
			fontSize : 14 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		},
		color : '#bdbdbd'
	},
	//
	// Details (eg: NewsDetail view)
	//
	detail_title : {
		color : '#ffffff',
		font : {
			fontSize : 28 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	detail_tags : {
		color : '#4f4f4f',
		font : {
			fontSize : 13 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},

	detail_body : {
		color : '#bdbdbd',
		font : {
			fontSize : 15 * dp,
			fontFamily : 'Montserrat',
			fontWeight : 'Regular'
		}
	},
	//
	// Products (eg: Products view)
	//
	products_table : {

	},

	products_table_row : {
		imageWidth : 139 * dp , 
		imageHeight : 139 * dp ,
	},
	
	products_table_tile : {
		backgroundColor : '#232323',
		selectedBackgroundColor : '#8c5e7a',
	},
	//
	// Product (eg: Product view)
	//
	product : {
		
	},

	product_slider : {
		height : 180 * dp
	},
	
	navTintColor : '#fff'


};

exports.MapData = {
	origin : {
		latitude : 37.41,
		longitude : -122.1
	},
	annotations : [{
		picture : "http://lorempixel.com/100/76/",
		title : "eros",
		subtitle : "Molestie et wisi.",
		body : "Lobortis elit lobortis illum accumsan nibh, et facilisis eros zzril lorem, dignissim autem erat feugait. Delenit, ut illum.",
		latitude : 37.390749,
		longitude : -122.081651
	}, {
		picture : "http://lorempixel.com/100/76/",
		title : "Ullamcorper eros.",
		subtitle : "Ex consequat.",
		body : "Volutpat ex diam elit facilisi feugait, et odio qui aliquip.",
		latitude : 37.41,
		longitude : -122.1
	}]
};

exports.defaults = function(obj) {
	each(slice.call(arguments, 1), function(source) {
		for (var prop in source) {
			if (obj[prop] == null)
				obj[prop] = source[prop];
		}
	});
	return obj;
};
