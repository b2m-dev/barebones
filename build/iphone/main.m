//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"development";
NSString * const TI_APPLICATION_ID = @"com.myb2m.pfc";
NSString * const TI_APPLICATION_PUBLISHER = @"B2M";
NSString * const TI_APPLICATION_URL = @"https://www.flypfc.com/";
NSString * const TI_APPLICATION_NAME = @"PFC";
NSString * const TI_APPLICATION_VERSION = @"2.0";
NSString * const TI_APPLICATION_DESCRIPTION = @"Precision Flight Control Product Dementration";
NSString * const TI_APPLICATION_COPYRIGHT = @"2013 by B2M";
NSString * const TI_APPLICATION_GUID = @"b4273e35-4bb3-433d-9197-dfcd832e0e37";
BOOL const TI_APPLICATION_ANALYTICS = true;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
