/**
 * Created by binsirMac on 2017-01-09.
 */

import {Roi} from "./Roi";
import {CGPoint} from "../common/CGPoint";
import {PresentationImage} from "../display/PresentationImage";

export class EllipticalRoi implements Roi{
  selected : boolean = true;

  topMiddleVertex:CGPoint;

  rightMiddleVertex:CGPoint;

  private aValue:number;
  private bValue:number;
  private areaValue:number;
  private rotated:boolean = false;

  private M_PI:number = 3.14159265358979323846264338327950288;

  constructor(topMiddleVertex:CGPoint,rightMiddleVertex:CGPoint,aValue:number,bValue:number){
    this.topMiddleVertex = topMiddleVertex;
    this.rightMiddleVertex = rightMiddleVertex;

    this.aValue = aValue;
    this.bValue = bValue;
    this.areaValue = this.M_PI * aValue * bValue;
  }

  drawRoiOnImage(context: any, presentationImage:PresentationImage){

  }

  checkSelectedWithPoint(pointInOriginImage : CGPoint, presentationImage : PresentationImage){

  }

  moveTo(pointInOriginImage : CGPoint, presentationImage : PresentationImage){

  }
}
