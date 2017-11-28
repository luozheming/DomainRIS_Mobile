import {ImageOperatingType} from "./common/ImageOperatingType";
import {OperationScope} from "./common/OperationScope";
/**
 * Created by binsirMac on 2016-12-29.
 */
export class Config{
  // the VS information
  static AXVS_ADDRESS : string;
  static AXVS_USERID  : string;
  static AXVS_PASSWORD : string;
  static AXVS_ACCESS_TOKEN : string;


  //for ImageViewer padding
  static readonly  IMAGEVIEWER_PADDING_TOP : number = 56;
  // default
  static readonly  IMAGEBOXVIEW_UNSELECTED_COLOR : string = 'grey';
  static readonly  IMAGEBOXVIEW_SELECTED_COLOR : string = '#F00';
  static readonly  IMAGEBOXVIEW_BORDOR_WIDTH : number = 1;

  static readonly  TILEVIEW_UNSELECTED_COLOR : string = 'grey';
  static readonly  TILEBOXVIEW_SELECTED_COLOR : string = 'yellow';
  static readonly  TILEVIEW_BORDOR_WIDTH : number = 1;

  static readonly  TILEVIEW_LAYOUT_ROWS : number = 1;
  static readonly  TILEVIEW_LAYOUT_COLUMNS : number = 1;

  static imageOperatingType : ImageOperatingType = ImageOperatingType.ImageOperatingTypeWindowLevel;
  static AxOperationScope  : OperationScope      = OperationScope.SeriesScope;

  static readonly  ROI_STOKE_STYLE : string = 'green';
  static readonly  ROI_LINE_WIDTH : number = 1;
  static readonly  RULER_STROKE_STYLE : string = 'green';
  static readonly  RULER_LINE_WIDTH : number = 1;

  static readonly  RULER_WIDTH:number = 16;
  static readonly  RULER_HEIGHT:number = 16;
  static readonly  RULER_MARGIN_LEFT :number = 2;
  static readonly  RULER_MARGIN_BOTTOM :number = 2;
}
