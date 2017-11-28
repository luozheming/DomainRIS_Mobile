/**
 * Created by binsirMac on 2017-01-09.
 */

import {Roi} from "./Roi";
import {CGPoint} from "../common/CGPoint";
import {PresentationImage} from "../display/PresentationImage";
import {Aesthetics} from "../common/Aesthetics";

export class AngleRoi implements Roi{
  selected : boolean;
  firstPointInOriginalImage:CGPoint;
  secondPointInOriginalImage:CGPoint;
  thirdPointInOriginalImage:CGPoint;

  constructor(firstPointInOriginalImage:CGPoint,secondPointInOriginalImage:CGPoint,thirdPointInOriginalImage:CGPoint){
    this.firstPointInOriginalImage = firstPointInOriginalImage;
    this.secondPointInOriginalImage = secondPointInOriginalImage;
    this.thirdPointInOriginalImage = thirdPointInOriginalImage;
  }

  drawRoiOnImage(context: any, presentationImage:PresentationImage){
    context.lineWidth = Aesthetics.AxRoiSelectedLineWidth;

    context.moveTo(this.firstPointInOriginalImage.x, this.firstPointInOriginalImage.y);

    context.lineTo(this.secondPointInOriginalImage.x, this.secondPointInOriginalImage.y);

    context.lineTo(this.thirdPointInOriginalImage.x, this.thirdPointInOriginalImage.y);

    context.stroke();
  }

  checkSelectedWithPoint(pointInOriginImage : CGPoint, presentationImage : PresentationImage){

  }

  moveTo(pointInOriginImage : CGPoint, presentationImage : PresentationImage){

  }
}
