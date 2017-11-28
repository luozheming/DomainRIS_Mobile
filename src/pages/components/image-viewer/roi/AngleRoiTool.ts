import {RoiTool} from "./RoiTool";
import {TileView} from "../viewer/TileView";
import {RoiUtil} from "./RoiUtil";
import {LFService} from "typescript-logging";
import {AngleRoi} from "./AngleRoi";
import {CGPoint} from "../common/CGPoint";
import {Aesthetics} from "../common/Aesthetics";


const factory = LFService.createLoggerFactory();
export const logger = factory.getLogger("AngleRoiTool");
/**
 * Created by kai on 16/10/2017.
 */
export class AngleRoiTool implements RoiTool{

  private static instance:AngleRoiTool = new AngleRoiTool();

  private drawing:boolean =false;

  static shareAngleRoiTool():AngleRoiTool{
    return AngleRoiTool.instance;
  }

  private trackingTouches:Array<CGPoint> = new Array();

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
    if(this.trackingTouches.length == 0){
      this.drawing = true;
      // this.trackingTouches.push(touch);
    }
  }

  touchesCancelled(touch:CGPoint, touchedTileView:TileView){
  }

  touchesMoved(touch:CGPoint, touchedTileView:TileView){

  }

  touchesEnded(touch:CGPoint, touchedTileView:TileView){
    if(this.drawing){
      this.trackingTouches.push(touch);
    }

    if(this.trackingTouches.length >= 3){
      logger.info('draw the angel');
      var angelRoi:AngleRoi = new AngleRoi(this.trackingTouches[0],this.trackingTouches[1],this.trackingTouches[2]);
      touchedTileView.presentationImage.addRoi(angelRoi);
      this.drawing = false;
      this.removeAllPoint();
    }
  }

  drawTemporaryIn(touchedTileView:TileView, context:CanvasRenderingContext2D){
    this.trackingTouches.forEach((point, idx, array)=>{
      RoiUtil.drawVertiexAt(point,context);
    });
    if(this.trackingTouches.length > 0){
      context.lineWidth = Aesthetics.AxRoiSelectedLineWidth;

      let firstVertexPoint = this.trackingTouches[0];
      context.moveTo(firstVertexPoint.x, firstVertexPoint.y);

      if(this.trackingTouches.length > 1) {
        let secondVertexPoint = this.trackingTouches[1];
        context.lineTo(secondVertexPoint.x, secondVertexPoint.y);

        if (this.trackingTouches.length > 2) {
          let thirdVertexPoint = this.trackingTouches[2];
          context.lineTo(thirdVertexPoint.x, thirdVertexPoint.y);
        }
      }
      context.stroke();
    }
  }
}
