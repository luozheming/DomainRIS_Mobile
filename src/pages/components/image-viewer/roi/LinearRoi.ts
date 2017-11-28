/**
 * Created by binsirMac on 2017-01-09.
 */

import {Roi} from "./Roi";
import {CGPoint} from "../common/CGPoint";
import {PresentationImage} from "../display/PresentationImage";
import {RoiUtil} from "./RoiUtil";
import {Aesthetics} from "../common/Aesthetics";


/**
 * Created by binsirMac on 2017-01-09.
 */
enum LinearRoiSelectType{
   StartPointSelected = 0,      //the scroll browser
    EndPointSelected,        //the cine browser
    LinearRoiSelected,
};


export class LinearRoi implements Roi{
  selected : boolean = true;

  startPoint:CGPoint;
  endPoint:CGPoint;
  private length:number;
  private selectedRoiType:LinearRoiSelectType;
  private clickOnLinearPoint:CGPoint;


  constructor(startPoint:CGPoint,endPoint:CGPoint,length:number){
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.length = length;
  }

  checkSelectedWithPoint(pointInLens : CGPoint, presentationImage : PresentationImage){
    let startPointInLens:CGPoint = presentationImage.convertFromOriginalImageToLens(this.startPoint);

    let endPointInLens:CGPoint = presentationImage.convertFromOriginalImageToLens(this.endPoint);

    if (Math.abs(pointInLens.x - startPointInLens.x) + Math.abs(pointInLens.y - startPointInLens.y) < Aesthetics.AxRoiSelectedRadius) {
      this.selectedRoiType = LinearRoiSelectType.StartPointSelected;
      return true;
    }else if (Math.abs(pointInLens.x - endPointInLens.x) + Math.abs(pointInLens.y - endPointInLens.y) < Aesthetics.AxRoiSelectedRadius) {
      this.selectedRoiType = LinearRoiSelectType.EndPointSelected;
      return true;
    }else
    {
      //check whether select the line
      // check in the linear rect
      let minX:number = Math.min(startPointInLens.x, endPointInLens.x);
      let maxX:number = Math.max(startPointInLens.x, endPointInLens.x);

      let minY:number = Math.min(startPointInLens.y, endPointInLens.y);
      let maxY:number = Math.max(startPointInLens.y, endPointInLens.y);

      if (pointInLens.x < minX - 10) {
        return true;
      }
      if (pointInLens.x > maxX + 10) {
        return true;
      }
      if (pointInLens.y < minY - 10) {
        return true;
      }
      if (pointInLens.y > maxY + 10) {
        return true;
      }
      //if ((pointInLens.x >= minX && pointInLens.x <= maxX)&&(pointInLens.y >= minY && pointInLens.y <= maxY))
      {
        // 1.translate coordinate
        let clickedPointX:number = pointInLens.x - startPointInLens.x;
        let clickedPointY:number = pointInLens.y - startPointInLens.y;
        // 2.compute the linear equation: Ax + By =0
        let aInEquation:number = endPointInLens.y - startPointInLens.y;
        let bInEquation:number = endPointInLens.x - startPointInLens.x;
        // 3.compute the distance
        let distant:number = Math.abs((aInEquation * clickedPointX - bInEquation * clickedPointY)/Math.sqrt(aInEquation * aInEquation + bInEquation * bInEquation));

        if (distant < 10) {
          this.selectedRoiType = LinearRoiSelectType.LinearRoiSelected;
          this.clickOnLinearPoint = presentationImage.convertToPointInOriginalImage(pointInLens);
          return true;
        }
      }

    }
    return false;
  }

  moveTo(pointInLens : CGPoint, presentationImage : PresentationImage){
    let pointInOriginalImage:CGPoint = presentationImage.convertToPointInOriginalImage(pointInLens);
    switch (this.selectedRoiType) {
      case LinearRoiSelectType.StartPointSelected:
        this.startPoint = pointInOriginalImage;
        break;
      case LinearRoiSelectType.EndPointSelected:
        this.endPoint = pointInOriginalImage;
        break;
      case LinearRoiSelectType.LinearRoiSelected:
      {
        let xOffset:number = pointInOriginalImage.x - this.clickOnLinearPoint.x;
        let yOffset:number = pointInOriginalImage.y - this.clickOnLinearPoint.y;
        this.startPoint = new CGPoint(this.startPoint.x + xOffset, this.startPoint.y + yOffset);
        this.endPoint = new CGPoint(this.endPoint.x + xOffset, this.endPoint.y + yOffset);
        this.clickOnLinearPoint = pointInOriginalImage;
      }
        break;
      default:
        break;
    }

    if (this.selectedRoiType == LinearRoiSelectType.StartPointSelected || this.selectedRoiType == LinearRoiSelectType.EndPointSelected) {
      this.length = RoiUtil.computeLengthFrom(this.startPoint,this.endPoint,presentationImage);
    }
  }

  drawRoiOnImage(context: any, presentationImage:PresentationImage){
    //1. draw the path
    let startPointInLens:CGPoint = presentationImage.convertFromOriginalImageToLens(this.startPoint);
    let newStartPointX:number = startPointInLens.x;//self.startPoint.x * scale - origin.x;
    let newStartPointY:number = startPointInLens.y;//self.startPoint.y * scale - origin.y;

    let endPointInLens:CGPoint = presentationImage.convertFromOriginalImageToLens(this.endPoint);
    let newEndPointX:number = endPointInLens.x;//self.endPoint.x * scale - origin.x;
    let newEndPointY:number = endPointInLens.y;//self.endPoint.y * scale - origin.y;
    RoiUtil.drawLineFrom(context,startPointInLens,endPointInLens,this.selected);

    //2. draw the value
    let pixelSpacingX:number = presentationImage.pixelSpacingX;
    let pixelSpacingY:number = presentationImage.pixelSpacingY;
    let imagerPixelSpacingX:number = presentationImage.imagerPixelSpacingX;
    let imagerPixelSpacingY:number = presentationImage.imagerPixelSpacingY;

    let lengthTextValue:string = '';
    // if (pixelSpacingX != 0 || pixelSpacingY != 0)
    // {
    //   lengthTextValue = Aesthetics.AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMm, length] : [NSString stringWithFormat:AxFormatLengthCm, length];
    // }else if (imagerPixelSpacingX != 0 || imagerPixelSpacingY != 0)
    // {
    //   lengthTextValue = AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMmImager, length] : [NSString stringWithFormat:AxFormatLengthCmImager, length];
    // }else{
    //   lengthTextValue = [NSString stringWithFormat:AxFormatLengthPixels, length];
    // }

    /*
     change the position to draw the value
     [RoiUtil drawTextAt:CGPointMake((newStartPointX + newEndPointX)/2, (newStartPointY + newEndPointY)/2)
     withValue:lengthTextValue];
     */
    let valuePointX:number= newStartPointX >= newEndPointX ? (newEndPointX + (newStartPointX - newEndPointX)/2) : (newStartPointX + (newEndPointX - newStartPointX)/2);
    let valuePointY:number = newStartPointY >= newEndPointY ? newStartPointY : newEndPointY;

    RoiUtil.drawTextAt(context,new CGPoint(valuePointX, valuePointY),lengthTextValue);

    //3. draw the vertexes
    if (this.selected) {
      //draw the highlight start and end point
      RoiUtil.drawVertiexAt(new CGPoint(newStartPointX, newStartPointY), context);

      RoiUtil.drawVertiexAt(new CGPoint(newEndPointX, newEndPointY),context);
    }
  }
}
