/**
 * Created by binsirMac on 2017-01-09.
 */

import {Roi} from "./Roi";
import {CGPoint} from "../common/CGPoint";
import {PresentationImage} from "../display/PresentationImage";

export class RectangularRoi implements Roi{
  selected : boolean;

  constructor(){}

  drawRoiOnImage(context: any,presentationImage:PresentationImage){

  }

  checkSelectedWithPoint(pointInOriginImage : CGPoint, presentationImage : PresentationImage){

  }

  moveTo(pointInOriginImage : CGPoint, presentationImage : PresentationImage){

  }
}
