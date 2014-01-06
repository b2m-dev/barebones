var dp = "";
if (Titanium.Platform.Android) {
	dp = (Ti.Platform.displayCaps.dpi / 160);
} else {
	dp = 1;
}

var version = Titanium.Platform.version.split(".");
version = version[0];