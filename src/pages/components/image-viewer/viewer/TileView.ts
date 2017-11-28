import {DisplaySet} from '../display/DisplaySet';
import {PresentationImage} from '../display/PresentationImage';
import {CGRect} from "../common/CGRect";
import {LFService} from "typescript-logging";
import {ImageBoxView} from "./ImageBoxView";
import {EventDispatcher, EventTypes} from "../common/EventDispatcher";
import {Config} from "../Config";
import {CGSize} from "../common/CGSize";
import {ImageOperatingType} from "../common/ImageOperatingType";
import {UIImageOrientation} from "../common/UIImageOrientation";
import {CGPoint} from "../common/CGPoint";
import {RoiUtil} from "../roi/RoiUtil";
import {AngleRoiTool} from "../roi/AngleRoiTool";

const factory = LFService.createLoggerFactory();
export const logger = factory.getLogger("TileView");

export class TileView {
  // the image box viewer div html element
  private tileRootDivElement: HTMLElement;

  currentImageIndex: number;
  normalizedRectangle: ClientRect;
  currentImageOperatingType:ImageOperatingType;

  private needDrawImage:boolean;
  private _presentationImage: PresentationImage;
  private _selected: boolean = false;
  private loadingImg: HTMLElement;
  private errorImg : HTMLElement;
  private canv : HTMLCanvasElement;
  private ctx : any;
  private allCleared:boolean;

  private topLeftDivElement:HTMLDivElement;
  private topLeftDivBackgroundElement:HTMLDivElement;
  private topRightDivElement :HTMLDivElement;
  private topRightDivBackgroundElement:HTMLDivElement;
  private bottomLeftDivElement :HTMLDivElement;
  private bottomLeftDivBackgroundElement:HTMLDivElement;
  private bottomRightDivElement:HTMLDivElement;
  private bottomRightBackgroundDivElement :HTMLDivElement;
  private patientNameOverlayElement :HTMLDivElement;
  private patientNameOverlayBackgroundElement :HTMLDivElement;
  private patientIdOverlayElement :HTMLDivElement;
  private patientIdOverlayBackgroundElement :HTMLDivElement;
  private instanceNumberOverlayElement :HTMLDivElement;
  private instanceNumberOverlayBackgroundElement :HTMLDivElement;
  private wlOverlayElement :HTMLDivElement;
  private wlOverlayBackgroundElement :HTMLDivElement;
  private zoomOverlayElement :HTMLDivElement;
  private zoomOverlayBackgroundElement :HTMLDivElement;

  private hammerManager : HammerManager;
  private singleTapThumbnail:TapRecognizer;
  private panRecognizer:PanRecognizer;
  private adjustWLGesture:PanRecognizer;
  private swipeLeftGesture:SwipeRecognizer;
  private swipeRightGesture:SwipeRecognizer;
  private pinchRecognizer:PinchRecognizer;

  constructor(public parentImageBoxView: ImageBoxView, public frame: CGRect, private tileRows: number, private tileColumns: number, private tag: number) {
    //create the div HTML Element;
    this.tileRootDivElement = document.createElement('div');
    this.tileRootDivElement.setAttribute('class', 'tileView');
    this.loadingImg = document.createElement('img');
    this.loadingImg.setAttribute('src', 'assets/img/viewer/waiting.gif');
    this.loadingImg.setAttribute('class', 'centeredImg');
    //set the default loading page;
    this.errorImg = document.createElement('img');
    this.errorImg.setAttribute('src', 'assets/img//viewer/error.png');
    this.errorImg.setAttribute('class', 'centeredImg');
    this.tileRootDivElement.setAttribute("style",
      `float: left;border:${Config.TILEVIEW_BORDOR_WIDTH}px solid ${Config.TILEVIEW_UNSELECTED_COLOR};position: relative; width:${frame.width}px;height:${frame.height}px`);
    this.tileRootDivElement.setAttribute("tag", "" + tag);

    //add the overlays
    //topleft
    this.topLeftDivElement = document.createElement('div');
    this.topLeftDivElement.setAttribute('class','topLeftOverlayDiv');
    this.patientNameOverlayElement = document.createElement('div');
    this.topLeftDivElement.appendChild(this.patientNameOverlayElement);
    this.topLeftDivBackgroundElement = document.createElement('div');
    this.topLeftDivBackgroundElement.setAttribute('class','topLeftOverlayBackgroundDiv');
    this.patientNameOverlayBackgroundElement = document.createElement('div');
    this.topLeftDivBackgroundElement.appendChild(this.patientNameOverlayBackgroundElement);
    //toperight
    this.topRightDivElement = document.createElement('div');
    this.topRightDivElement.setAttribute('class','topRightOverlayDiv');
    this.patientIdOverlayElement = document.createElement('div');
    this.topRightDivElement.appendChild(this.patientIdOverlayElement);
    this.topRightDivBackgroundElement = document.createElement('div');
    this.topRightDivBackgroundElement.setAttribute('class','topRightOverlayBackgroundDiv');
    this.patientIdOverlayBackgroundElement = document.createElement('div');
    this.topRightDivBackgroundElement.appendChild(this.patientIdOverlayBackgroundElement);
    //bottomleft
    this.bottomLeftDivElement = document.createElement('div');
    this.bottomLeftDivElement.setAttribute('class','bottomLeftOverlayDiv');
    this.instanceNumberOverlayElement = document.createElement('div');
    this.bottomLeftDivElement.appendChild(this.instanceNumberOverlayElement);
    this.bottomLeftDivBackgroundElement = document.createElement('div');
    this.bottomLeftDivBackgroundElement.setAttribute('class','bottomLeftOverlayBackgroundDiv');
    this.instanceNumberOverlayBackgroundElement = document.createElement('div');
    this.bottomLeftDivBackgroundElement.appendChild(this.instanceNumberOverlayBackgroundElement);
    //bottomright
    this.bottomRightDivElement = document.createElement('div');
    this.bottomRightDivElement.setAttribute('class','bottomRightOverlayDiv');
    this.zoomOverlayElement = document.createElement('div');
    this.bottomRightDivElement.appendChild(this.zoomOverlayElement);
    this.wlOverlayElement = document.createElement('div');
    this.bottomRightDivElement.appendChild(this.wlOverlayElement);
    this.bottomRightBackgroundDivElement = document.createElement('div');
    this.bottomRightBackgroundDivElement.setAttribute('class','bottomRightOverlayBackgroundDiv');
    this.zoomOverlayBackgroundElement = document.createElement('div');
    this.bottomRightBackgroundDivElement.appendChild(this.zoomOverlayBackgroundElement);
    this.wlOverlayBackgroundElement = document.createElement('div');
    this.bottomRightBackgroundDivElement.appendChild(this.wlOverlayBackgroundElement);

    //initial the canvas for draw the image
    this.canv = < HTMLCanvasElement > document.createElement("canvas");
    this.canv.width =  frame.width - 2 * Config.TILEVIEW_BORDOR_WIDTH;
    this.canv.height =  frame.height - 2 * Config.TILEVIEW_BORDOR_WIDTH;
    this.canv.setAttribute("style", `width:${this.canv.width}px;height:${this.canv.height}px`);
    this.ctx = this.canv.getContext("2d");

    //add all elements to tile view
    //this.addAll();

    //add the events listener
    EventDispatcher.getInstance().subscribe(EventTypes.SelectTileView, (selectedTileView, args) => {
      logger.info('Get the tap from tileview!');

      if(this != selectedTileView){
        this.selected =false;
      }
    });

    //add the events listener
    EventDispatcher.getInstance().subscribe(EventTypes.ChangeOperatingType, (args) => {
      logger.info('Get the change operating type !');
      // this.updateGestureRecognizer();
      this.currentImageOperatingType = Config.imageOperatingType;
      if(RoiUtil.getCurrentRoiTool()){
        RoiUtil.getCurrentRoiTool().removeAllPoint();
      }
    });

    //add the events listener
    EventDispatcher.getInstance().subscribe(EventTypes.NeedsDisplayNotification, (sender,args) => {
      logger.info('need to display!');
      if (this.presentationImage == sender) {
        //update the display parameters according the new presentationimage
        this.presentationImage.updateDisplayParams(this.frame.size);
        //
        this.setNeedsDisplay();
      }
    });

    this.currentImageOperatingType = ImageOperatingType.ImageOperatingTypeWindowLevel;

    //add the gestures
    // create a manager for that element
    this.hammerManager = new Hammer.Manager(this.tileRootDivElement);
    // create recognizers
    this.singleTapThumbnail = new Hammer.Tap({
      taps: 1
    });
    this.panRecognizer = new Hammer.Pan({ threshold: 0, pointers: 0 });
    this.adjustWLGesture = new Hammer.Pan({ threshold: 5 });
    // create recognizers
    this.swipeLeftGesture = new Hammer.Swipe({ pointers: 2 });
    this.swipeRightGesture = new Hammer.Swipe({ pointers: 2 });
    this.pinchRecognizer = new Hammer.Pinch({threshold : 0.01});

    this.hammerManager.add(this.singleTapThumbnail);
    this.hammerManager.add(this.panRecognizer);

    this.panRecognizer.recognizeWith(this.swipeLeftGesture);
    this.pinchRecognizer.recognizeWith(this.swipeRightGesture);
    this.pinchRecognizer.recognizeWith(this.pinchRecognizer);

    // subscribe to events
    this.hammerManager.on('tap', (e) => {
      // do the tap
      this.selected = true;
      EventDispatcher.getInstance().dispatch(EventTypes.SelectTileView, this, 'Get the tap');
    });

    var deltaX = 0;
    var deltaY = 0;


    this.hammerManager.on('panstart', (e) => {
      e.preventDefault();
      if(!this.selected){
        EventDispatcher.getInstance().dispatch(EventTypes.SelectTileView, this, 'Get the tap');
      }
      if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
        logger.info('begin to draw the roi');
        RoiUtil.getCurrentRoiTool().touchesBegan(this.getCanvasPos(e.pointers[0]),this);
      }
    });

    this.hammerManager.on('pancancel', (e) => {
      e.preventDefault();
      if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
        logger.info('cancel to draw the roi');
        RoiUtil.getCurrentRoiTool().touchesCancelled(this.getCanvasPos(e.pointers[0]),this);
      }
    });

    this.hammerManager.on('panmove', (e) => {
      e.preventDefault();
      var dX = deltaX + (e.deltaX);
      var dY = deltaY + (e.deltaY);
      if(dX==0 && dY ==0){
        return;
      }
      if(this.presentationImage){
        switch (this.currentImageOperatingType)
        {
          case ImageOperatingType.ImageOperatingTypeWindowLevel:
            logger.info(`change the window level with width:${dX},center:${dY}`);
            this.presentationImage.changeWindowLevel(dX,dY);
            break;
          case ImageOperatingType.ImageOperatingTypeZoom:
            logger.info(`zoom image with width:${dX},center:${dY}`);
            // self.presentationImage resizeImageWithScale:newScale atPoint:location andTileCenter:tileCenter
            break;
          case ImageOperatingType.ImageOperatingTypeMeasure:
            RoiUtil.getCurrentRoiTool().touchesMoved(this.getCanvasPos(e.pointers[0]),this);
            break;
        }
        this.displayImage();
      }
    });
    this.hammerManager.on('panend', (e) => {
      e.preventDefault();
      deltaX = deltaX + e.deltaX;
      deltaY = deltaY + e.deltaY;

      if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
        logger.info('end to draw the roi');
        RoiUtil.getCurrentRoiTool().touchesEnded(this.getCanvasPos(e.pointers[0]),this);
      }
    });

    /*
    this.canv.onmousedown = (e) => {
      if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
        RoiUtil.getCurrentRoiTool().touchesBegan(this.getCanvasPos(e),this);
        this.displayImage();
      }
    };

    this.canv.onmousemove = (e) => {
      if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
        RoiUtil.getCurrentRoiTool().touchesMoved(this.getCanvasPos(e),this);
        this.displayImage();
      }
    };

    this.canv.onmouseup = (e) => {
      if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
        RoiUtil.getCurrentRoiTool().touchesEnded(this.getCanvasPos(e),this);
        this.displayImage();
      }
    };*/

    this.hammerManager.on('swipeleft', e => {
      logger.info('get the swip left event');
      if(!this.selected){
        EventDispatcher.getInstance().dispatch(EventTypes.SelectTileView, this, 'Get the tap');
      }
      if(this.parentImageBoxView){
        this.parentImageBoxView.increaseTopLeftPresentationImageIndex();
      }
    });

    this.hammerManager.on('swiperight', e => {
      logger.info('get the swip right event');
      if(!this.selected){
        EventDispatcher.getInstance().dispatch(EventTypes.SelectTileView, this, 'Get the tap');
      }
      if(this.parentImageBoxView){
        this.parentImageBoxView.decreaseTopLeftPresentationImageIndex();
      }
    });

    // let initScale :number ;
    // hammerManager.on('pinchstart', e => {
    //   if(this.presentationImage){
    //     initScale = this.presentationImage.aspectScale;
    //   }else{
    //     initScale = 1;
    //   }
    //   logger.info('get the pinch event to initial the scale get fom the image. with scale:'+initScale);
    // });

    this.hammerManager.on('pinch', e => {
      if(!this.selected){
        EventDispatcher.getInstance().dispatch(EventTypes.SelectTileView, this, 'Get the tap');
      }
      let centerPoint : HammerPoint = e.center;
      if(this.presentationImage){
        if(e.scale * this.presentationImage.width * this.presentationImage.aspectScale > 20){
          this.presentationImage.lenCenterAtImage.x = centerPoint.x;
          this.presentationImage.lenCenterAtImage.y = centerPoint.y;
          logger.info('get the pinch event, with scale:'+e.scale * this.presentationImage.aspectScale);
          this.presentationImage.aspectScale = this.presentationImage.aspectScale * e.scale;

          this.displayImage();
        }
      }
    });

    // this.updateGestureRecognizer();
    // hammerManager.on('pinchend', e => {
    //   let centerPoint : HammerPoint = e.center;
    //   this.presentationImage.lenCenterAtImage.x = centerPoint.x;
    //   this.presentationImage.lenCenterAtImage.y = centerPoint.y;
    //   initScale = initScale * e.scale;
    //   logger.info('get the pinch event, with scale:'+initScale);
    //   // reset the final scale
    // });
  }
  resizeWithOldSuperviewSize(oldBoundsSize:CGSize,rotated:boolean,cleared:boolean){
    this.allCleared = cleared;

    if (this.tileRows==0||this.tileColumns==0) {
      return;
    }

    if (cleared) {
      // this.setNeedsDisplay();
      return;
    }

    let centerPoint:CGPoint = this.center;
    centerPoint = new CGPoint(centerPoint.x - this.frame.origin.x, centerPoint.y - this.frame.origin.y);

    let superFrame:CGRect = this.parentImageBoxView.bounds;
    let newWidth:number = superFrame.size.width / this.tileColumns;
    let newHeight:number = superFrame.size.height / this.tileRows;
    let newX:number = newWidth * (this.tag % this.tileColumns);
    let newY:number = newHeight * (this.tag / this.tileColumns);
    let newFrame:CGRect = new CGRect(newX, newY, newWidth, newHeight);
    this.frame = newFrame;

    this.presentationImage.setTileViewSize(newFrame.size,rotated,centerPoint);

    this.setNeedsDisplay();
  }

  setRows(rows:number,columns:number){

    if( this.tileRows == 1 && this.tileColumns == 1 && rows == 1 && columns == 1)
    {
      return;
    }
    this.tileRows = rows;
    this.tileColumns = columns;

    let rect:CGRect = this.parentImageBoxView.bounds;
    this.resizeWithOldSuperviewSize(rect.size,false,false);
  }

  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    if (value) {
      this.tileRootDivElement.setAttribute("style",
        `float: left;border:${Config.TILEVIEW_BORDOR_WIDTH}px solid ${Config.TILEBOXVIEW_SELECTED_COLOR};position: relative; width:${this.frame.width}px;height:${this.frame.height}px`);
    } else {
      this.tileRootDivElement.setAttribute("style",
        `float: left;border:${Config.TILEVIEW_BORDOR_WIDTH}px solid ${Config.TILEVIEW_UNSELECTED_COLOR};position: relative; width:${this.frame.width}px;height:${this.frame.height}px`);
    }
  }

  get presentationImage():PresentationImage{
    return this._presentationImage;
  }
  set presentationImage(presentationImage:PresentationImage) {
    if(this._presentationImage == null && presentationImage == null){

      this.setNeedsDisplay();
      return;
    }
    if(this._presentationImage!=presentationImage){
      if(this._presentationImage){
        this._presentationImage.parentTileView = null;
      }

      this._presentationImage = presentationImage;

      this._presentationImage.parentTileView = this;

      //        currentShownImageRef = nil;
      this.needDrawImage = true;

      if (!presentationImage) {
        this.setNeedsDisplay();
        return;
      }

      let imageBoxView:ImageBoxView = this.parentImageBoxView;
      // [self addGestureRecognizerByOperatingType:imageBoxView.currentImageOperatingType];

      //coment the following tow lines
      // [presentationImage dicomImage];
      this.setNeedsDisplay();

      // if (!presentationImage.frameReference.parentImageSop.dataSource.isLoaded) {
      //
      //   return;
      // }

      this.presentationImage.setTileViewSize(this.frame.size,false,this.center);


      AngleRoiTool.shareAngleRoiTool().clearRoiTool();

      this.setNeedsDisplay();

      if (this.selected) {

        EventDispatcher.getInstance().dispatch(EventTypes.OverlayChangeNotification, this, null);
      }

    }

  }
  setNeedsDisplay(){
    //update the overlays
    this.updateOverlays();

    //draw the image
    this.displayImage();
  }

  reset(){
    if(this.presentationImage){
      this.presentationImage.reset();

      this.displayImage();
    }
  }
  getCanvasPos(e):CGPoint{
    var rect = this.canv.getBoundingClientRect();
    return new CGPoint(e.clientX - rect.left * (this.canv.width / rect.width), e.clientY - rect.top * (this.canv.height / rect.height));
  };

  get size():CGSize{
    return new CGSize(this.canv.width , this.canv.height);//this.canv.bounds.size;
  }



addGestureRecognizerByOperatingType(imageOperatingType:ImageOperatingType){
    // add the recognizers
    if(this.presentationImage == null){
      return;
    }

    switch (imageOperatingType)
    {
      case ImageOperatingType.ImageOperatingTypeWindowLevel:
      case ImageOperatingType.ImageOperatingTypeZoom:
        this.addStandardGestureOrgnization();
        break;
      case ImageOperatingType.ImageOperatingTypeMeasure:
        this.addMeasureGestureOrgnization();
        break;
    }

    this.currentImageOperatingType = imageOperatingType;
  }

  private addSingleTapGestureOrgnization(){
    this.hammerManager.add(this.singleTapThumbnail);
  }

  private addStandardGestureOrgnization(){
    this.removeMeasureGestureOrgnization();
    this.addSingleTapGestureOrgnization();

    this.hammerManager.add(this.pinchRecognizer);
    this.hammerManager.add(this.panRecognizer);
    this.hammerManager.add(this.adjustWLGesture);
  }

  private removeStandardGestureOrgnization(){
    this.hammerManager.remove(this.pinchRecognizer);
    this.hammerManager.remove(this.panRecognizer);
    this.hammerManager.remove(this.adjustWLGesture);
  }

  private addMeasureGestureOrgnization(){
    this.hammerManager.remove(this.singleTapThumbnail);
    this.removeStandardGestureOrgnization();
  }

  private removeMeasureGestureOrgnization(){

  }

  scaleImage(pinchRecognizer:PinchRecognizer){
    let parentImageBox:ImageBoxView = this.parentImageBoxView;
    if(!(this.selected &&parentImageBox.selected)){
      // this.handleTapImageBoxView(null);
    }
  }
  draw(imageBoxRootDivElement: HTMLElement) {
    imageBoxRootDivElement.appendChild(this.tileRootDivElement);
  }

  setPresentationImage(presentationImage: PresentationImage) {
    //remove the display elements from div
    if(presentationImage == null){
      this.removeAll();
      if(this.presentationImage){
        this.presentationImage.parentTileView = null;
      }
      return;
    }
    if(this.presentationImage == presentationImage){
      return;
    }
    if(this.presentationImage){
      this.presentationImage.parentTileView = null;
    }
    this.presentationImage = presentationImage;
    this.presentationImage.parentTileView = this;

    if(!this.tileRootDivElement.contains(this.canv)){
      this.addAll();
    }
    this._presentationImage.setTileViewSize(this.frame.size,false,this.center);

    logger.info("To display image:" + presentationImage);
    this.setNeedsDisplay();

  }

  updateOverlays(){
    this.patientNameOverlayElement.innerText = this.presentationImage.patientName;
    this.patientNameOverlayBackgroundElement.innerText = this.patientNameOverlayElement.innerText;
    this.patientIdOverlayElement.innerText = this.presentationImage.patientId;
    this.patientIdOverlayBackgroundElement.innerText = this.patientIdOverlayElement.innerText;
    this.instanceNumberOverlayElement.innerText = `Image:#${this.presentationImage.instanceNumber}/${this.presentationImage.parentDisplaySet.presentationImages.length}`;
    this.instanceNumberOverlayBackgroundElement.innerText = this.instanceNumberOverlayElement.innerText;
    this.wlOverlayElement.innerText = 'W:'+this.presentationImage.windowWidth+'/L:'+this.presentationImage.windowCenter;
    this.wlOverlayBackgroundElement.innerText = this.wlOverlayElement.innerText;
    this.zoomOverlayElement.innerText = 'Zoom:'+ this.presentationImage.aspectScale.toFixed(2);
    this.zoomOverlayBackgroundElement.innerText = this.zoomOverlayElement.innerText;
  }


  removeAll() {
    while (this.tileRootDivElement.firstChild) {
      this.tileRootDivElement.removeChild(this.tileRootDivElement.firstChild);
    }
  }
  addAll(){
    this.tileRootDivElement.appendChild(this.loadingImg);
    this.tileRootDivElement.appendChild(this.topLeftDivElement);
    this.tileRootDivElement.appendChild(this.topLeftDivBackgroundElement);
    this.tileRootDivElement.appendChild(this.topRightDivElement);
    this.tileRootDivElement.appendChild(this.topRightDivBackgroundElement);
    this.tileRootDivElement.appendChild(this.bottomLeftDivElement);
    this.tileRootDivElement.appendChild(this.bottomLeftDivBackgroundElement);
    this.tileRootDivElement.appendChild(this.bottomRightDivElement);
    this.tileRootDivElement.appendChild(this.bottomRightBackgroundDivElement);
    this.tileRootDivElement.appendChild(this.canv);
  }

  displayImage(){
    logger.info('To display the image');
    this.ctx.save();

    //display the presentation image
    if(this.presentationImage){
      if(Config.imageOperatingType != ImageOperatingType.ImageOperatingTypeMeasure){
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);

        if(!this.tileRootDivElement.contains(this.loadingImg)){
          this.tileRootDivElement.appendChild(this.loadingImg);
        }
      }
      this.presentationImage.drawInRect(this.frame,this.ctx);

      //display the ROIs
      if (RoiUtil.getCurrentRoiTool() && RoiUtil.getCurrentRoiTool().isDrawing() && this.selected) {
         RoiUtil.getCurrentRoiTool().drawTemporaryIn(this,this.ctx);
      }
    }

    this.ctx.restore();
  }

  computeHorizontalRulerUnit(): number {
    let result = -1;
    if (this.presentationImage.pixelSpacingX != 0 && this.presentationImage.pixelSpacingY != 0) {
      result = this.presentationImage.originalSize.width * this.presentationImage.pixelSpacingX / 2.0;
    } else if (this.presentationImage.imagerPixelSpacingX != 0 && this.presentationImage.imagerPixelSpacingY != 0) {
      result = this.presentationImage.originalSize.width * this.presentationImage.imagerPixelSpacingX / 2.0;
    }
    return result;
  }

  computeVerticalRulerUnit(): number {
    let result = -1;
    if (this.presentationImage.pixelSpacingX != 0 && this.presentationImage.pixelSpacingY != 0) {
      result = this.presentationImage.originalSize.height * this.presentationImage.pixelSpacingY / 2.0;
    } else if (this.presentationImage.imagerPixelSpacingX != 0 && this.presentationImage.imagerPixelSpacingY != 0) {
      result = this.presentationImage.originalSize.height * this.presentationImage.imagerPixelSpacingY / 2.0;
    }
    return result;
  }
  get center():CGPoint{
    return new CGPoint(this.canv.width/2,this.canv.height/2);
  }

  drawRulers(){
    this.ctx.strokeStyle = `${Config.RULER_STROKE_STYLE}`;
    this.ctx.lineWidth = Config.RULER_LINE_WIDTH;

    let imageSize = this.presentationImage.currentSize;
    //draw ruler
    let imageHeight:number = 0;
    let imageWidth:number = 0;
    let verticalRulerUnit:number = -1;//[self computeVerticalRulerUnit];
    let horizontalRulerUnit:number = -1;//[self computeHorizontalRulerUnit];
    if (this.presentationImage.imageOrientation == UIImageOrientation.UIImageOrientationLeft ||
      this.presentationImage.imageOrientation == UIImageOrientation.UIImageOrientationLeftMirrored ||
      this.presentationImage.imageOrientation == UIImageOrientation.UIImageOrientationRight ||
      this.presentationImage.imageOrientation == UIImageOrientation.UIImageOrientationRightMirrored) {
      imageHeight = imageSize.width;
      imageWidth = imageSize.height;
      verticalRulerUnit =  this.computeHorizontalRulerUnit();
      horizontalRulerUnit = this.computeVerticalRulerUnit();
    }else{
      imageHeight = imageSize.height;
      imageWidth = imageSize.width;
      verticalRulerUnit = this.computeVerticalRulerUnit();
      horizontalRulerUnit = this.computeHorizontalRulerUnit();
    }

    let rectHeightCenter:number = this.center.y - this.frame.origin.y;
    let rulerOriginY:number = rectHeightCenter - imageHeight/4;

    {
      this.ctx.beginPath();
      this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY);
      this.ctx.lineTo(Config.RULER_MARGIN_LEFT,rectHeightCenter + imageHeight/4);
      this.ctx.stroke();

//       if (verticalRulerUnit > 0) {
//         [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 8) withValue:[NSString stringWithFormat:@"%.0f",verticalRulerUnit] withColor:AxRulerColor];
//
//         //delete the following codes at 2013-10-17
// //            if (self.presentationImage.pixelSpacingX != 0 && self.presentationImage.pixelSpacingY != 0) {
// //                [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 18) withValue:@"mm" withColor:AxRulerColor];
// //            }else if (self.presentationImage.imagerPixelSpacingX != 0 && self.presentationImage.imagerPixelSpacingY != 0) {
// //                [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 18) withValue:@"imager mm" withColor:AxRulerColor];
// //            }
//         [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 18) withValue:@"mm" withColor:AxRulerColor];
//       }

      //1 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH ,rulerOriginY);
    this.ctx.stroke();

      //2 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH /2,rulerOriginY + imageHeight/16);
    this.ctx.stroke();

      //3 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight*2/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH /2, rulerOriginY + imageHeight*2/16);
    this.ctx.stroke();

      //4 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight*3/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH /2, rulerOriginY + imageHeight*3/16);
    this.ctx.stroke();

      //5 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight*4/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH /2, rulerOriginY + imageHeight*4/16);
    this.ctx.stroke();

      //6 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight*5/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH /2, rulerOriginY + imageHeight*5/16);
    this.ctx.stroke();

      //7 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight*6/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH /2, rulerOriginY + imageHeight*6/16);
    this.ctx.stroke();

      //8 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight*7/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH /2, rulerOriginY + imageHeight*7/16);
    this.ctx.stroke();

      //9 line
    this.ctx.beginPath();
    this.ctx.moveTo(Config.RULER_MARGIN_LEFT,rulerOriginY + imageHeight*8/16);
    this.ctx.lineTo(Config.RULER_MARGIN_LEFT + Config.RULER_WIDTH, rulerOriginY + imageHeight*8/16);
    this.ctx.stroke();
    }

    let rectWidthCenter:number = this.center.x - this.frame.origin.x;////;rect.origin.x + rect.size.width / 2;
    let rulerOriginX:number = rectWidthCenter - imageWidth/4;

    {
      let paddingBottom:number = this.canv.height - Config.RULER_MARGIN_BOTTOM;
      let paddingBottomEndLong:number = paddingBottom - Config.RULER_HEIGHT;
      let paddingBottomEndShort:number = paddingBottom - Config.RULER_HEIGHT / 2;


      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX,paddingBottom);
      this.ctx.lineTo(rectWidthCenter + imageWidth/4, paddingBottom);
      this.ctx.stroke();

      //1 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX,paddingBottomEndLong);
      this.ctx.lineTo(rulerOriginX, paddingBottom);
      this.ctx.stroke();

      //2 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth/16,paddingBottomEndShort);
      this.ctx.lineTo(rulerOriginX+imageWidth/16, paddingBottom);
      this.ctx.stroke();

      //3 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth*2/16,paddingBottomEndShort);
      this.ctx.lineTo(rulerOriginX+imageWidth*2/16, paddingBottom);
      this.ctx.stroke();

      //4 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth*3/16,paddingBottomEndShort);
      this.ctx.lineTo(rulerOriginX+imageWidth*3/16, paddingBottom);
      this.ctx.stroke();

      //5 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth*4/16,paddingBottomEndShort);
      this.ctx.lineTo(rulerOriginX+imageWidth*4/16, paddingBottom);
      this.ctx.stroke();

      //draw the ruler unit
      if (horizontalRulerUnit > 0) {
        ////delete the following codes at 2013-10-17
//            if (self.presentationImage.pixelSpacingX != 0 && self.presentationImage.pixelSpacingY != 0) {
//
//                [RoiUtil drawTextAt:CGPointMake(rulerOriginX+imageWidth*4/16, paddingBottom + 10) withValue:[NSString stringWithFormat:@"%.0f mm",horizontalRulerUnit]  withColor:AxRulerColor];
//            }else if (self.presentationImage.imagerPixelSpacingX != 0 && self.presentationImage.imagerPixelSpacingY != 0) {
//
//                [RoiUtil drawTextAt:CGPointMake(rulerOriginX+imageWidth*4/16, paddingBottom + 10) withValue:[NSString stringWithFormat:@"%.0f imager mm",horizontalRulerUnit]  withColor:AxRulerColor];
//            }
//         [RoiUtil drawTextAt:CGPointMake(rulerOriginX+imageWidth*4/16, paddingBottom + 10) withValue:[NSString stringWithFormat:@"%.0f mm",horizontalRulerUnit]  withColor:AxRulerColor];
      }

      //6 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth*5/16,paddingBottomEndShort);
      this.ctx.lineTo(rulerOriginX+imageWidth*5/16, paddingBottom);
      this.ctx.stroke();

      //7 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth*6/16,paddingBottomEndShort);
      this.ctx.lineTo(rulerOriginX+imageWidth*6/16, paddingBottom);
      this.ctx.stroke();

      //8 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth*7/16,paddingBottomEndShort);
      this.ctx.lineTo(rulerOriginX+imageWidth*7/16, paddingBottom);
      this.ctx.stroke();

      //9 line
      this.ctx.beginPath();
      this.ctx.moveTo(rulerOriginX+imageWidth*8/16,paddingBottomEndLong);
      this.ctx.lineTo(rulerOriginX+imageWidth*8/16, paddingBottom);
      this.ctx.stroke();
    }

  }

  displayRect():CGRect{
    return new CGRect(0,  0, this.canv.width, this.canv.height);
  }
  removeLoadingImg(){

    if(this.tileRootDivElement.contains(this.loadingImg)){
      this.tileRootDivElement.removeChild(this.loadingImg);
    }
    if(this.tileRootDivElement.contains(this.errorImg)){
      this.tileRootDivElement.removeChild(this.errorImg);
    }
  }

  displayError(){
    if(!this.tileRootDivElement.contains(this.errorImg)){
      this.tileRootDivElement.appendChild(this.errorImg);
    }
  }


  resize(imageBoxViewRect : CGRect){
    this.frame = imageBoxViewRect;
    if (this.selected) {
      this.tileRootDivElement.setAttribute("style",
        `float: left;border:${Config.TILEVIEW_BORDOR_WIDTH}px solid ${Config.TILEBOXVIEW_SELECTED_COLOR};position: relative; width:${this.frame.width}px;height:${this.frame.height}px`);
    } else {
      this.tileRootDivElement.setAttribute("style",
        `float: left;border:${Config.TILEVIEW_BORDOR_WIDTH}px solid ${Config.TILEVIEW_UNSELECTED_COLOR};position: relative; width:${this.frame.width}px;height:${this.frame.height}px`);
    }

    this.canv.width =  this.frame.width - 2  * Config.TILEVIEW_BORDOR_WIDTH;
    this.canv.height =  this.frame.height - 2  * Config.TILEVIEW_BORDOR_WIDTH;
    this.canv.setAttribute("style", `width:${this.canv.width}px;height:${this.canv.height}px`);

    this.displayImage();
  }


  setWL(windowCenter : number, windowWidth : number){
    if(this.presentationImage){
      this.presentationImage.setWL(windowCenter, windowWidth);

      this.displayImage();
    }
  }

  rotate(degrees){
    this.ctx.clearRect(0,0,this.canv.width,this.canv.height);
    this.ctx.save();
    this.ctx.translate(this.canv.width/2,this.canv.height/2);
    this.ctx.rotate(degrees*Math.PI/180);
    this.ctx.drawImage(this.presentationImage.currentDisplayImage,-this.presentationImage.currentDisplayImage.width/2,-this.presentationImage.currentDisplayImage.width/2);
    this.ctx.restore();
}
}


