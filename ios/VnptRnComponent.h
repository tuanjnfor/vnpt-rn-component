
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNVnptRnComponentSpec.h"

@interface VnptRnComponent : NSObject <NativeVnptRnComponentSpec>
#else
#import <React/RCTBridgeModule.h>

@interface VnptRnComponent : NSObject <RCTBridgeModule>
#endif

@end
