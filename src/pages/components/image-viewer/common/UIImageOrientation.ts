/**
 * Created by binsirMac on 2017-01-05.
 */
export enum UIImageOrientation{
  UIImageOrientationUp,            // default orientation
  UIImageOrientationDown,          // 180 deg rotation
  UIImageOrientationLeft,          // 90 deg CCW
  UIImageOrientationRight,         // 90 deg CW
  UIImageOrientationUpMirrored,    // as above but image mirrored along other axis. horizontal flip
  UIImageOrientationDownMirrored,  // horizontal flip
  UIImageOrientationLeftMirrored,  // vertical flip
  UIImageOrientationRightMirrored, // vertical flip
}
