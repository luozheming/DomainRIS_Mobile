import {TileView} from "../viewer/TileView";
import {CGPoint} from "../common/CGPoint";
/**
 * Created by kai on 15/10/2017.
 */

export interface RoiTool {

  removeAllPoint();

  isDrawing():boolean;

  touchesBegan(touch: CGPoint, touchedTileView: TileView);

  touchesCancelled(touch: CGPoint, touchedTileView: TileView);

  touchesMoved(touch: CGPoint, touchedTileView: TileView);

  touchesEnded(touch: CGPoint, touchedTileView: TileView);

  drawTemporaryIn(touchedTileView:TileView, context:CanvasRenderingContext2D);
}
