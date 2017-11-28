import {RoiTool} from "./RoiTool";
import {PresentationImage} from "../display/PresentationImage";
import {CGPoint} from "../common/CGPoint";
import {Aesthetics} from "../common/Aesthetics";
import {CGSize} from "../common/CGSize";
import {CGRect} from "../common/CGRect";
/**
 * Created by kai on 15/10/2017.
 */
export class RoiUtil{

  private static instance:RoiTool;

  static setCurrentRoiTool(roiTool:RoiTool){
    this.instance = roiTool;
  }

  static getCurrentRoiTool():RoiTool{
    return this.instance;
  }

  static drawVertiexAt(point:any,context:CanvasRenderingContext2D):void{

  }

  static computeLengthFrom(startPoint:CGPoint, endPoint:CGPoint, presentationImage:PresentationImage) {
    //	short yT, xT;
    let mesureLength:number;

    let pixelSpacingX:number = presentationImage.pixelSpacingX;
    let pixelSpacingY:number = presentationImage.pixelSpacingY;
    let imagerPixelSpacingX:number = presentationImage.imagerPixelSpacingX;
    let imagerPixelSpacingY:number = presentationImage.imagerPixelSpacingY;
    {
      let coteA:number, coteB:number;

      coteA = Math.abs(startPoint.x - endPoint.x);
      coteB = Math.abs(startPoint.y - endPoint.y);

      if( pixelSpacingX!= 0 && pixelSpacingY != 0)
      {
        coteA *= pixelSpacingX;
        coteB *= pixelSpacingY;
      }else if( imagerPixelSpacingX!= 0 && imagerPixelSpacingY != 0)
      {
        coteA *= imagerPixelSpacingX;
        coteB *= imagerPixelSpacingY;
      }

      if( coteA == 0) mesureLength = coteB;
      else if( coteB == 0) mesureLength = coteA;
      else mesureLength = Math.sqrt(coteA * coteA + coteB * coteB);// coteB / (sin (atan( coteB / coteA)));

      if(( pixelSpacingX != 0 && pixelSpacingY != 0 && !Aesthetics.AxFormatedByMM)||( imagerPixelSpacingX != 0 && imagerPixelSpacingY != 0 && !Aesthetics.AxFormatedByMM))
      {
        mesureLength /= 10.0;
      }
    }
    return mesureLength;
  }

  static drawLineFrom(context: any,startPoint:CGPoint,endPoint:CGPoint,selected:boolean){
    if (selected) {
      context.lineWidth = Aesthetics.AxRoiSelectedLineWidth;
    }else{
      context.lineWidth = Aesthetics.AxRoiUnselectedLineWidth;
    }
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(startPoint.x, startPoint.y);

    context.stroke();
  }

  static drawTextAt(context:any,point:CGPoint,value:string){
  }

}
