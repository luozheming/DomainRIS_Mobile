import {CGPoint} from "../common/CGPoint";
import {PresentationImage} from "../display/PresentationImage";
/**
 * Created by binsirMac on 2017-01-09.
 */
export interface Roi{
  selected : boolean;

  drawRoiOnImage(context: any, presentationImage:PresentationImage);

  checkSelectedWithPoint(pointInLens : CGPoint, presentationImage : PresentationImage);

  moveTo(pointInLens : CGPoint, presentationImage : PresentationImage);
}
