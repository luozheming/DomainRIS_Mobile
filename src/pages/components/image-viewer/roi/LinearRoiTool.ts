import {LFService} from "typescript-logging";
import {RoiTool} from "./RoiTool";
import {RoiUtil} from "./RoiUtil";
import {TileView} from "../viewer/TileView";
import {Aesthetics} from "../common/Aesthetics";
import {AngleRoi} from "./AngleRoi";
import {CGPoint} from "../common/CGPoint";
import {LinearRoi} from "./LinearRoi";
import {PresentationImage} from "../display/PresentationImage";
/**
 * Created by kai on 24/10/2017.
 */

const factory = LFService.createLoggerFactory();
export const logger = factory.getLogger("LinearRoiTool");
export class LinearRoiTool implements RoiTool{

  private static instance:LinearRoiTool = new LinearRoiTool();

  private drawing:boolean =false;

  static shareLinearRoiTool():LinearRoiTool{
    return LinearRoiTool.instance;
  }

  private trackingTouches:Array<CGPoint> = new Array();
  private startPoints:Array<CGPoint> = new Array();

  removeAllPoint(){
    this.trackingTouches = new Array();
  }

  isDrawing():boolean{
    return this.drawing;
  }
  clearRoiTool(){
    this.removeAllPoint();
  }

  touchesBegan(touch:CGPoint, touchedTileView:TileView){
    logger.info('begin to draw the angel');
    if(this.drawing){
      return;
    }
    this.drawing = true;
    this.trackingTouches.push(touch);
    let location:CGPoint = touchedTileView.getCanvasPos(touch);
    this.startPoints.push(location);
  }

  touchesCancelled(touch:CGPoint, touchedTileView:TileView){
    this.drawing = false;
    this.trackingTouches = new Array();
    this.startPoints = new Array();
  }

  touchesMoved(touch:CGPoint, touchedTileView:TileView){

  }

  touchesEnded(touch:CGPoint, touchedTileView:TileView){
    {
      let touchIndex : number = this.trackingTouches.indexOf(touch);
      if (touchIndex )
      {
        let startPoint : CGPoint= this.startPoints[touchIndex];
        let endPoint : CGPoint = touchedTileView.getCanvasPos(touch);

        let startPointInOriginalImage : CGPoint = touchedTileView.presentationImage.convertToPointInOriginalImage(startPoint);
        let endPointInOriginalImage : CGPoint= touchedTileView.presentationImage.convertToPointInOriginalImage(endPoint);
        let length :number = RoiUtil.computeLengthFrom(startPointInOriginalImage,endPointInOriginalImage,touchedTileView.presentationImage);
        let linearRoi : LinearRoi = new LinearRoi(startPointInOriginalImage,endPointInOriginalImage,length);

        touchedTileView.presentationImage.addRoi(linearRoi);
        this.drawing = false;
        this.trackingTouches.splice(touchIndex, 1);
        this.startPoints.splice(touchIndex, 1);
      }
    }

    this.trackingTouches = new Array();
    this.startPoints= new Array();
  }

  drawTemporaryIn(touchedTileView:TileView, context:CanvasRenderingContext2D){
    let presentationImage:PresentationImage = touchedTileView.presentationImage;
    this.trackingTouches.forEach((touch, index) => {
      let startPoint:CGPoint = this.startPoints[index];
      let endPoint:CGPoint = touchedTileView.getCanvasPos(touch);

      RoiUtil.drawLineFrom(context,startPoint,endPoint , true);

      RoiUtil.drawVertiexAt(startPoint,context);

      RoiUtil.drawVertiexAt(endPoint,context);

      //2. draw the value
      let startPointInOriginalImage : CGPoint = presentationImage.convertToPointInOriginalImage(startPoint);
      let endPointInOriginalImage : CGPoint= presentationImage.convertToPointInOriginalImage(endPoint);
      let length:number = RoiUtil.computeLengthFrom(startPointInOriginalImage,endPointInOriginalImage ,presentationImage);
      let pixelSpacingX :number = presentationImage.pixelSpacingX;
      let pixelSpacingY :number= presentationImage.pixelSpacingY;
      let imagerPixelSpacingX :number= presentationImage.imagerPixelSpacingX;
      let imagerPixelSpacingY :number= presentationImage.imagerPixelSpacingY;

      let lengthTextValue:string = 'ts';
      // if (pixelSpacingX != 0 || pixelSpacingY != 0)
      // {
      //   lengthTextValue = Aesthetics.AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMm, length] : [NSString stringWithFormat:AxFormatLengthCm, length];
      // }else if (imagerPixelSpacingX != 0 || imagerPixelSpacingY != 0)
      // {
      //   lengthTextValue = AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMmImager, length] : [NSString stringWithFormat:AxFormatLengthCmImager, length];
      // }else{
      //   lengthTextValue = [NSString stringWithFormat:AxFormatLengthPixels, length];
      // }

      let valuePointX : number= startPoint.x >= endPoint.x ? (endPoint.x + (startPoint.x - endPoint.x)/2) : (startPoint.x + (endPoint.x - startPoint.x)/2);
      let valuePointY : number = startPoint.y >= endPoint.y ? startPoint.y : endPoint.y;

      RoiUtil.drawTextAt(context,new CGPoint(valuePointX, valuePointY),lengthTextValue);
    })
  }
}
