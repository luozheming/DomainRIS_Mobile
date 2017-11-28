import {TileView} from "../viewer/TileView";
import {CGPoint} from "../common/CGPoint";
import {Frame} from "../model/Frame";
import {DisplaySet} from "./DisplaySet";
import {CGSize} from "../common/CGSize";
import {CGRect} from "../common/CGRect";
import {RetrieveImageRequest} from "../dto/RetrieveImageRequest";
import {Config} from "../Config";
import {UIImageOrientation} from "../common/UIImageOrientation";
import {Roi} from "../roi/Roi";
import {ImageOrientType} from "../common/ImageOrientType";
import {OperationScope} from "../common/OperationScope";
import {ImageOperatingType} from "../common/ImageOperatingType";
import {ArrayUtils} from "../common/ArrayUtils";
import {EventDispatcher, EventTypes} from "../common/EventDispatcher";
import {LFService} from "typescript-logging";


const factory = LFService.createLoggerFactory();
export const logger = factory.getLogger("PresentationImage");
/**
 * Created by binsirMac on 2016-12-26.
 */
export class PresentationImage {
  minWindowCenter: number;
  maxWindowCenter: number;
  minWindowWidth: number;
  maxWindowWidth: number;
  minAspectScale: number;
  maxAspectScale: number;
  currentSensitivity: number;
  linked: boolean;
  selected: boolean;
  frameReference: Frame;
  parentDisplaySet: DisplaySet;
  parentTileView: TileView;
  isUsingPreset: boolean;
  currentDisplayImage: any;
  isNeedToComputeLen:boolean = false;

  preScopeLenCenterInImage:CGPoint;
  preScopeOriginalImageSize:CGSize;

  private _scaleAspectFit: boolean = true;
  private _lensRect: CGRect;
  private _inverted: boolean;
  private _originalSize: CGSize;
  private _aspectScale: number;
  private _imageOrientation: UIImageOrientation;
  //the len (0,0) at the image point, default is (0,0)
  private _lenCenterAtImage: CGPoint;
  private _currentWindowCenter: number;
  private _currentWindowWidth: number;
  private _pixelSpacingX: number;
  private _pixelSpacingY: number;
  private _imagerPixelSpacingX: number;
  private _imagerPixelSpacingY: number;
  private _samplesPerPixel: number;
  private _derivationDescription: string;
  private _windowCenter: number;
  private _windowWidth: number;
  private _bitAllocated: number;
  private _bitsStored: number;
  private _width: number;
  private _height: number;
  private _patientName: string;
  private _patientId: string;
  private _instanceNumber: string;

  private rois : Roi[] = [];

  constructor() {
    this.imageOrientation = UIImageOrientation.UIImageOrientationUp;

  }

  get currentSize():CGSize{
    return new CGSize(this.originalSize.width * this.aspectScale, this.originalSize.height* this.aspectScale);
  }

  get currentTileSize():CGSize{
    return this.parentTileView.size;
  }

  get originalSize(): CGSize{
    if(this._originalSize == null){
      this._originalSize = new CGSize(this.width,this.height);
    }
    return this._originalSize;
  }
  get aspectScale():number{
    if (this._aspectScale == null) {
      //default in the image's center point width/2, heigt/2.
      // this._aspectScale = new CGPoint(Math.ceil(this.width/2),Math.ceil(this.height/2));
      if(this.parentTileView){
        let rect = this.parentTileView.displayRect();
        let sx = rect.width / this.frameReference.parentImageSop.width;
        let sy = rect.height / this.frameReference.parentImageSop.height;
        this._aspectScale = sx > sy ? sy : sx;
      }
    }

    return this._aspectScale;
  }

  set aspectScale(value:number){
    this.scaleAspectFit = false;
    if(value != this._aspectScale){
      let tempX = this.lenCenterAtImage.x - (this.aspectScale * this.width - this.width)/2;
      if( tempX < this.parentTileView.displayRect().width && tempX > (- this.parentTileView.displayRect().width)){
        this.lenCenterAtImage.x = tempX;
      }

      let tempY = this.lenCenterAtImage.y - (this.aspectScale * this.height - this.height)/2;
      if(tempY < this.parentTileView.displayRect().height && tempY > (- this.parentTileView.displayRect().height )){
        this.lenCenterAtImage.y = tempY;
      }
    }
  }

  get lenCenterAtImage():CGPoint{
    if (this._lenCenterAtImage == null) {
      //default in the image's center point width/2, heigt/2.
      // this._lenCenterAtImage = new CGPoint(Math.ceil(this.width/2),Math.ceil(this.height/2));
      this._lenCenterAtImage = new CGPoint(0,0);
    }
    return this._lenCenterAtImage;
  }

  get currentWindowCenter(): number {
    if (this._currentWindowCenter == null) {
      this._currentWindowCenter = this.windowCenter;
    }
    return this._currentWindowCenter;
  }

  get currentWindowWidth(): number {
    if (this._currentWindowWidth == null) {
      this._currentWindowWidth = this.windowWidth;
    }
    return this._currentWindowWidth;
  }

  get patientName(): string {
    if (this._patientName == null) {
      this._patientName = this.frameReference.parentStudy.patientsName;
    }
    return this._patientName;
  }

  get patientId(): string {
    if (this._patientId == null) {
      this._patientId = this.frameReference.parentStudy.patientId;
    }
    return this._patientId;
  }

  get instanceNumber(): string {
    if (this._instanceNumber == null) {
      this._instanceNumber = this.frameReference.parentImageSop.instanceNumber;
    }
    return this._instanceNumber;
  }

  get pixelSpacingX(): number {
    if (this._pixelSpacingX == null) {
      this._pixelSpacingX = this.frameReference.parentImageSop.pixelSpacingX;
    }
    return this._pixelSpacingX;
  }

  get pixelSpacingY(): number {
    if (this._pixelSpacingY == null) {
      this._pixelSpacingY = this.frameReference.parentImageSop.pixelSpacingY;
    }
    return this._pixelSpacingY;
  }

  get imagerPixelSpacingX(): number {
    if (this._imagerPixelSpacingX == null) {
      this._imagerPixelSpacingX = this.frameReference.parentImageSop.imagerPixelSpacingH;
    }
    return this._imagerPixelSpacingX;
  }

  get imagerPixelSpacingY(): number {
    if (this._imagerPixelSpacingY == null) {
      this._imagerPixelSpacingY = this.frameReference.parentImageSop.imagerPixelSpacingV;
    }
    return this._imagerPixelSpacingY;
  }

  get samplesPerPixel(): number {
    if (this._samplesPerPixel == null) {
      this._samplesPerPixel = this.frameReference.parentImageSop.samplesPerPixel;
    }
    return this._samplesPerPixel;
  }

  get derivationDescription(): string {
    if (this._derivationDescription == null) {
      this._derivationDescription = this.frameReference.parentImageSop.derivationDescription;
    }
    return this._derivationDescription;
  }

  get windowCenter(): number {
    if (this._windowCenter == null) {
      this._windowCenter = Number(this.frameReference.parentImageSop.windowCenter);
    }
    return this._windowCenter;
  }

  get windowWidth(): number {
    if (this._windowWidth == null) {
      this._windowWidth = Number(this.frameReference.parentImageSop.windowWidth);
    }
    return this._windowWidth;
  }

  get bitAllocated(): number {
    if (this._bitAllocated == null) {
      this._bitAllocated = this.frameReference.parentImageSop.bitAllocated;
    }
    return this._bitAllocated;
  }

  get bitsStored(): number {
    if (this._bitsStored == null) {
      this._bitsStored = this.frameReference.parentImageSop.bitsStored;
    }
    return this._bitsStored;
  }

  get width(): number {
    if (this._width == null) {
      this._width = this.frameReference.parentImageSop.width;
    }
    return this._width;
  }

  get height(): number {
    if (this._height == null) {
      this._height = this.frameReference.parentImageSop.height;
    }
    return this._height;
  }

  addRoi(roi:Roi){
    this.rois.push(roi);
  }

  checkSelectedRoiWithPoint(pointInLens:CGPoint){
    let result:boolean = false;
//    CGPoint pointInOriginImage = [self convertToPointInOriginalImage:pointInLens];

    this.rois.forEach(roi =>{
      roi.selected = false;
    });

    this.rois.forEach(roi =>{
      result = roi.checkSelectedWithPoint(pointInLens,this);
      if (result) {
        roi.selected = true;
        return result;
      }
    });
    return result;
  }
  getSelectedRoi():Roi{
    this.rois.forEach(roi =>{
      if (roi.selected) {
        return roi;
      }
    });
    return null;
  }

  removeSelectedRoi() {
    let selectedRoi:Roi;
    this.rois.forEach(roi =>{
      if (roi.selected) {
        selectedRoi = roi;
      }
    });
    if (selectedRoi) {
      ArrayUtils.removeByValue(this.rois,selectedRoi);
    }else{
      //if no roi selection, should remove the last one.
      this.rois.pop();
    }
  }

  get imageOrientation():UIImageOrientation{
    return this._imageOrientation;
  }
  set imageOrientation(imageOrientation:UIImageOrientation){

    this._imageOrientation = imageOrientation;

    if (Config.AxOperationScope != OperationScope.ImageScope) {
      EventDispatcher.getInstance().dispatch(EventTypes.PropagateNotification, this,
        {'imageOrientation':this._imageOrientation,'isUsingPreset':this.isUsingPreset});
    }
  }

  get inverted():boolean{
    return this._inverted;
  }

  set inverted(inverted:boolean){
    this._inverted = inverted;
    if (Config.AxOperationScope != OperationScope.ImageScope) {

      EventDispatcher.getInstance().dispatch(EventTypes.PropagateNotification, this,
        {'inverted':this.inverted,'isUsingPreset':this.isUsingPreset});
    }
  }
  setAspectScale(aspectScale:number , zoomLocationInLens:CGPoint) {
    this.aspectScale=aspectScale;
//    _zoomLocationInLens = zoomLocationInLens;

  }

  get lensRect():CGRect{
    return this._lensRect;
  }

  set lensRect(lensRect:CGRect) {
    this._lensRect = lensRect;
  }

  set scaleAspectFit(scaleAspectFit:boolean) {
    this._scaleAspectFit = scaleAspectFit;
    if (scaleAspectFit) {
      this.computeFitPresentation();
    }
    if (Config.AxOperationScope != OperationScope.ImageScope) {

      EventDispatcher.getInstance().dispatch(EventTypes.PropagateNotification, this,
        {'scaleAspectFit':this.scaleAspectFit,'isUsingPreset':this.isUsingPreset});
    }
  }

  computePresentationParams(){
    let oldScale:number = this.aspectScale;

    if (this.scaleAspectFit) {
      this.computeFitPresentation();
    }else{
      let _currentTileSize:CGSize = this.currentTileSize;
      this.updateDisplayParams(_currentTileSize);
    }

    if (oldScale != this._aspectScale) {


      EventDispatcher.getInstance().dispatch(EventTypes.ScaleChangeNotification, this,
        {'aspectScale':this.aspectScale});
    };
  }

  updateDisplayParams(tileSize:CGSize) {
    if (this.isNeedToComputeLen) {
      let orientation:UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
      switch (orientation) {
        case UIImageOrientation.UIImageOrientationUp:
        case UIImageOrientation.UIImageOrientationUpMirrored:
        case UIImageOrientation.UIImageOrientationDown:
        case UIImageOrientation.UIImageOrientationDownMirrored:
        {
          this._lensRect = new CGRect(this._lenCenterAtImage.x * this._aspectScale - tileSize.width / 2, this._lenCenterAtImage.y * this._aspectScale - tileSize.height / 2, tileSize.width, tileSize.height);
        }
          break;

        case UIImageOrientation.UIImageOrientationLeft:
        case UIImageOrientation.UIImageOrientationLeftMirrored:
        case UIImageOrientation.UIImageOrientationRight:
        case UIImageOrientation.UIImageOrientationRightMirrored:
        {

          this._lensRect = new CGRect(this._lenCenterAtImage.x * this._aspectScale - tileSize.height / 2, this._lenCenterAtImage.y * this._aspectScale - tileSize.width / 2, tileSize.height, tileSize.width);
        }
          break;

        default:
          break;
      }

    }
  }

  resetAllValuesFromNotif(){
    this._currentWindowCenter = this.windowCenter;

    this._currentWindowWidth = this.windowWidth;

    this.isUsingPreset = false;

    this._scaleAspectFit = true;
    this._inverted = false;
    this._imageOrientation = UIImageOrientation.UIImageOrientationUp;
    let tileSize:CGSize = this.currentTileSize;
    if (tileSize.width != 0 && tileSize.height !=0) {
      this.resetLensAndCurrentSize(tileSize);
    }
    this.rois = [];

  }
  computeFitPresentation(){
    let _currentTileSize:CGSize = this.currentTileSize;
    let _originalImageSize:CGSize = this.originalSize;
    let orientation:UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
    switch (orientation) {
      case UIImageOrientation.UIImageOrientationUp:
      case UIImageOrientation.UIImageOrientationUpMirrored:
      case UIImageOrientation.UIImageOrientationDown:
      case UIImageOrientation.UIImageOrientationDownMirrored:
      {
        let sx:number = _currentTileSize.width / _originalImageSize.width;
        let sy:number = _currentTileSize.height / _originalImageSize.height;
        let newScale:number = Math.min(sx, sy);
        this.lensRect = new CGRect((_originalImageSize.width * newScale-_currentTileSize.width)/2, (_originalImageSize.height * newScale-_currentTileSize.height)/2, _currentTileSize.width, _currentTileSize.height);

        this.aspectScale = newScale;
      }
        break;

      case UIImageOrientation.UIImageOrientationLeft:
      case UIImageOrientation.UIImageOrientationLeftMirrored:
      case UIImageOrientation.UIImageOrientationRight:
      case UIImageOrientation.UIImageOrientationRightMirrored:
      {
        let sx:number = _currentTileSize.width / _originalImageSize.height;
        let sy:number = _currentTileSize.height / _originalImageSize.width;
        let newScale:number = Math.min(sx, sy);
        this.lensRect = new CGRect((_originalImageSize.width * newScale-_currentTileSize.height)/2, (_originalImageSize.height * newScale-_currentTileSize.width)/2, _currentTileSize.height, _currentTileSize.width);

        this.aspectScale = newScale;
      }
        break;

      default:
        break;
    }


  }

  computeScalePresentation(){
    let orientation:UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
    switch (orientation) {
      case UIImageOrientation.UIImageOrientationUp:
        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
        break;
      case UIImageOrientation.UIImageOrientationUpMirrored:
        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
        break;
      case UIImageOrientation.UIImageOrientationDown:
        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
        break;
      case UIImageOrientation.UIImageOrientationDownMirrored:
        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
        break;

      case UIImageOrientation.UIImageOrientationLeft:
        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
        break;
      case UIImageOrientation.UIImageOrientationLeftMirrored:
        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
        break;
      case UIImageOrientation.UIImageOrientationRight:
        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
        break;
      case UIImageOrientation.UIImageOrientationRightMirrored:

        this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);

        break;

      default:
        break;
    }


  }

  computeLensRectWithOldTileSize(oldTileSize:CGSize){
    let _currentTileSize:CGSize = this.currentTileSize;
    let orientation:UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
    switch (orientation) {
      case UIImageOrientation.UIImageOrientationUp:
      case UIImageOrientation.UIImageOrientationUpMirrored:
      case UIImageOrientation.UIImageOrientationDown:
      case UIImageOrientation.UIImageOrientationDownMirrored:
        this.lensRect = new CGRect(this.lensRect.origin.x + oldTileSize.width / 2.0 - _currentTileSize.width / 2.0, this.lensRect.origin.y + oldTileSize.height / 2.0 - _currentTileSize.height / 2.0, _currentTileSize.width, _currentTileSize.height);
        break;

      case UIImageOrientation.UIImageOrientationLeft:
      case UIImageOrientation.UIImageOrientationLeftMirrored:
      case UIImageOrientation.UIImageOrientationRight:
      case UIImageOrientation.UIImageOrientationRightMirrored:

        this.lensRect = new CGRect(this.lensRect.origin.x + oldTileSize.height / 2.0 - _currentTileSize.height / 2.0, this.lensRect.origin.y + oldTileSize.width / 2.0 - _currentTileSize.width / 2.0, _currentTileSize.height, _currentTileSize.width);
        break;

      default:
        break;
    }


  }

  reComputeLensSizeAgainstScope() {
    //for the stored
    this._lenCenterAtImage = new CGPoint(this.preScopeLenCenterInImage.x / this.preScopeOriginalImageSize.width * this.originalSize.width,
      this.preScopeLenCenterInImage.y / this.preScopeOriginalImageSize.height *this.originalSize.height);
  }


  setTileViewSize(tileSize:CGSize,rotated:boolean,centerPoint:CGPoint){
    if (this._scaleAspectFit) {
      this.computeFitPresentation();
      return;
    }else{
      if (rotated) {
        this.isNeedToComputeLen = true;

      }else{
        this.isNeedToComputeLen = true;
      }
    }

  }

  resetLensAndCurrentSize(tileSize:CGSize) {

    let sx:number = tileSize.width / this.originalSize.width;
    let sy:number = tileSize.height / this.originalSize.height;
    let newScale:number = Math.min(sx, sy);

    this.aspectScale = newScale;

    //set the lens rect
    this.lensRect = new CGRect((this.originalSize.width * this.aspectScale-tileSize.width)/2, (this.originalSize.height * this.aspectScale-tileSize.height)/2, tileSize.width, tileSize.height);

  }
  reset(){
    this.resetAllValues();

    if (Config.AxOperationScope != OperationScope.ImageScope) {


      EventDispatcher.getInstance().dispatch(EventTypes.ScaleChangeNotification, this,
        {'resetToOriginal':'resetToOriginal'});
    }
  }

  resetAllValues() {
    this.isUsingPreset=false;
    this.setWL(this.windowWidth,this.windowCenter);
    this._scaleAspectFit = true;
    this._inverted = true;
    this._imageOrientation = UIImageOrientation.UIImageOrientationUp;
    let tileSize:CGSize = this.currentTileSize;
    if (tileSize.width != 0 && tileSize.height != 0 ) {
      this.resetLensAndCurrentSize(tileSize);
    }
    this.rois =  [];

  }

  resizeImageWithScale(newScale:number,locationInLens:CGPoint,tileViewCenter:CGPoint){
    /*remove the scale check at 2013-07-10
     if (newScale > self.maxAspectScale || newScale < self.minAspectScale) {
     return;
     }*/
    // recompute the lens rect
    this.computeLensWithScale(newScale,locationInLens);

//    [self setAspectScale:newScale withZoomLocationInLens:locationInLens];
    this._aspectScale = newScale;
    this._scaleAspectFit = false;

    this._lenCenterAtImage =this.convertToPointInOriginalImage(tileViewCenter);

    if (Config.AxOperationScope != OperationScope.ImageScope) {

      EventDispatcher.getInstance().dispatch(EventTypes.ScaleChangeNotification, this,
        {'lensRect':this._lensRect,'aspectScale':this._aspectScale,'lenCenterInImage':this._lenCenterAtImage,
          'originalImageSize':this.originalSize,'scaleAspectFit':this._scaleAspectFit,'isUsingPreset':this.isUsingPreset});
    }
// update the presentational properties
//    self.zoomLocationInLens = locationInLens;
//
//    self.aspectScale = newScale;
  }


  computeLensWithScale(newScale:number,locationInLens:CGPoint){
    let locationInOriginal :CGPoint= this.convertToPointInOriginalImage(locationInLens);

    let orientation : UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
    let _currentTileSize: CGSize = this.currentTileSize;
    switch (orientation) {
      case UIImageOrientation.UIImageOrientationUp:
        this.lensRect = new CGRect(locationInOriginal.x * newScale - locationInLens.x, locationInOriginal.y * newScale - locationInLens.y, this.lensRect.size.width, this.lensRect.size.height);
        break;

      case UIImageOrientation.UIImageOrientationUpMirrored:
        this.lensRect = new CGRect(locationInLens.x - _currentTileSize.width + locationInOriginal.x * newScale, locationInOriginal.y * newScale - locationInLens.y, this.lensRect.size.width, this.lensRect.size.height);
        break;

      case UIImageOrientation.UIImageOrientationDown:
        this.lensRect = new CGRect(locationInLens.x - _currentTileSize.width + locationInOriginal.x * newScale, locationInLens.y - _currentTileSize.height + locationInOriginal.y * newScale,
          this.lensRect.size.width, this.lensRect.size.height);
        break;

      case UIImageOrientation.UIImageOrientationDownMirrored:
        this.lensRect = new CGRect(locationInOriginal.x * newScale - locationInLens.x, locationInLens.y - _currentTileSize.height + locationInOriginal.y * newScale, this.lensRect.size.width, this.lensRect.size.height);
        break;

      case UIImageOrientation.UIImageOrientationLeft:
        this.lensRect = new CGRect(locationInLens.y - _currentTileSize.height + locationInOriginal.x * newScale, locationInOriginal.y * newScale - locationInLens.x, this.lensRect.size.width, this.lensRect.size.height);
        break;

      case UIImageOrientation.UIImageOrientationLeftMirrored:
        this.lensRect = new CGRect(locationInOriginal.y * newScale - locationInLens.y, locationInOriginal.y * newScale - locationInLens.x, this.lensRect.size.width, this.lensRect.size.height);
        break;

      case UIImageOrientation.UIImageOrientationRight:
        this.lensRect = new CGRect(locationInOriginal.x * newScale - locationInLens.y, locationInLens.x - _currentTileSize.width + locationInOriginal.y * newScale,  this.lensRect.size.width, this.lensRect.size.height);
        break;

      case UIImageOrientation.UIImageOrientationRightMirrored:
        this.lensRect = new CGRect(locationInLens.y - _currentTileSize.height + locationInOriginal.x * newScale, locationInLens.x - _currentTileSize.width + locationInOriginal.y * newScale, this.lensRect.size.width, this.lensRect.size.height);
        break;

      default:
        break;
    }

    this.isNeedToComputeLen = false;

  }


  changed(widthStep:number,centerStep:number) {

//    CGFloat newWindowCenter = self.currentWindowCenter + centerStep;//self.currentSensitivity * centerStep;//(self.currentSensitivity * centerStep/self.bitDepth);
//    CGFloat newWindowWidth = self.currentWindowWidth + widthStep;//self.currentSensitivity * widthStep;//(self.currentSensitivity * widthStep/self.bitDepth);
    let newWindowCenter : number= this.currentWindowCenter + this.currentSensitivity * centerStep;//(self.currentSensitivity * centerStep/self.bitDepth);
    let newWindowWidth : number = this.currentWindowWidth + this.currentSensitivity * widthStep;//(self.currentSensitivity * widthStep/self.bitDepth);


    //window width(0028,1051) shall always be greater than or equal to 1
    if(newWindowWidth<1){
      newWindowWidth = 1;
    }

//    NSLog(@"window level - width :%f center :%f",newWindowWidth,newWindowCenter);
    this.setWL(newWindowWidth,newWindowCenter);
  }

  convertToPointInOriginalImage(locationInLens:CGPoint):CGPoint{
    return this.convertToPointInOriginalImageWithScale(locationInLens,this.aspectScale);
  }

  convertToPointInOriginalImageWithScale(locationInLens:CGPoint, scale:number):CGPoint {
    let _currentTileSize:CGSize = this.currentTileSize;
    let locationInOldImage:CGPoint;

    let orientation:UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
    switch (orientation) {
      case UIImageOrientation.UIImageOrientationUp:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + locationInLens.x, this.lensRect.origin.y + locationInLens.y);
        break;

      case UIImageOrientation.UIImageOrientationUpMirrored:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + _currentTileSize.width - locationInLens.x , this.lensRect.origin.y + locationInLens.y);
        break;

      case UIImageOrientation.UIImageOrientationDown:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + _currentTileSize.width - locationInLens.x, this.lensRect.origin.y + _currentTileSize.height - locationInLens.y);
        break;

      case UIImageOrientation.UIImageOrientationDownMirrored:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + locationInLens.x, this.lensRect.origin.y + _currentTileSize.height - locationInLens.y);
        break;

      case UIImageOrientation.UIImageOrientationLeft:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + _currentTileSize.height -locationInLens.y, this.lensRect.origin.y + locationInLens.x);
        break;

      case UIImageOrientation.UIImageOrientationLeftMirrored:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + locationInLens.y, this.lensRect.origin.y + locationInLens.x);
        break;

      case UIImageOrientation.UIImageOrientationRight:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + locationInLens.y , this.lensRect.origin.y + _currentTileSize.width - locationInLens.x);
        break;

      case UIImageOrientation.UIImageOrientationRightMirrored:
        locationInOldImage = new CGPoint(this.lensRect.origin.x + _currentTileSize.height -  locationInLens.y , this.lensRect.origin.y + _currentTileSize.width - locationInLens.x);
        break;

      default:
        break;
    }

    let locationInOriginalImage:CGPoint = new CGPoint(locationInOldImage.x / scale, locationInOldImage.y / scale);

    return locationInOriginalImage;
  }

  convertFromOriginalImageToLens(locationInOriginal:CGPoint):CGPoint {
    let _currentTileSize:CGSize = this.currentTileSize;
    let orientation:UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
    let currentAspectScale:number = this.aspectScale;
    switch (orientation) {
      case UIImageOrientation.UIImageOrientationUp:
        return new CGPoint(locationInOriginal.x * currentAspectScale - this.lensRect.origin.x, locationInOriginal.y * currentAspectScale - this.lensRect.origin.y);

      case UIImageOrientation.UIImageOrientationUpMirrored:
        return new CGPoint(this.lensRect.origin.x + _currentTileSize.width - locationInOriginal.x * currentAspectScale, locationInOriginal.y * currentAspectScale - this.lensRect.origin.y);

      case UIImageOrientation.UIImageOrientationDown:
        return new CGPoint(this.lensRect.origin.x + _currentTileSize.width - locationInOriginal.x * currentAspectScale, this.lensRect.origin.y + _currentTileSize.height - locationInOriginal.y * currentAspectScale);

      case UIImageOrientation.UIImageOrientationDownMirrored:
        return new CGPoint(locationInOriginal.x * currentAspectScale - this.lensRect.origin.x, this.lensRect.origin.y + _currentTileSize.height - locationInOriginal.y * currentAspectScale);

      case UIImageOrientation.UIImageOrientationLeft:
        return new CGPoint(locationInOriginal.y * currentAspectScale - this.lensRect.origin.y, this.lensRect.origin.x + _currentTileSize.height - locationInOriginal.x * currentAspectScale);

      case UIImageOrientation.UIImageOrientationLeftMirrored:
        return new CGPoint(locationInOriginal.y * currentAspectScale - this.lensRect.origin.y, locationInOriginal.x * currentAspectScale - this.lensRect.origin.x );

      case UIImageOrientation.UIImageOrientationRight:
        return new CGPoint(this.lensRect.origin.y + _currentTileSize.width - locationInOriginal.y * currentAspectScale, locationInOriginal.x * currentAspectScale - this.lensRect.origin.x);

      case UIImageOrientation.UIImageOrientationRightMirrored:
        return new CGPoint( this.lensRect.origin.y + _currentTileSize.width - locationInOriginal.y * currentAspectScale, this.lensRect.origin.x + _currentTileSize.height - locationInOriginal.x * currentAspectScale);

      default:
        break;
    }
  }

  convertToPointInNewImageWithScale(locationInLens:CGPoint,newScale:number):CGPoint{
    let locationInOriginalImage:CGPoint = this.convertToPointInOriginalImage(locationInLens);//CGPointMake(locationInLens.x + _lensRect.origin.x, locationInLens.y + _lensRect.origin.y);

    let locationInNewImage:CGPoint = this.convertFromOriginalImageToLens(locationInOriginalImage);//CGPointMake(locationInOriginalImage.x * newScale, locationInOriginalImage.y * newScale);

    return locationInNewImage;
  }


  //finite-state machine
  orientImageWith(orientType:ImageOrientType){
    switch (this.imageOrientation) {
      case UIImageOrientation.UIImageOrientationUp:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationUpMirrored;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationDownMirrored;
            break;
          case ImageOrientType.RotateLeft:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeft;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          case ImageOrientType.RotateRight:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationRight;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          default:
            break;
        }
        break;
      case UIImageOrientation.UIImageOrientationUpMirrored:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationUp;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationDown;
            break;
          case ImageOrientType.RotateLeft:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeftMirrored;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          case ImageOrientType.RotateRight:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationRightMirrored;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          default:
            break;
        }
        break;
      case UIImageOrientation.UIImageOrientationLeft:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationRightMirrored;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeftMirrored;
            break;
          case ImageOrientType.RotateLeft:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationDown;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          case ImageOrientType.RotateRight:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationUp;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          default:
            break;
        }
        break;
      case UIImageOrientation.UIImageOrientationLeftMirrored:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationRight;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeft;
            break;
          case ImageOrientType.RotateLeft:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationDownMirrored;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          case ImageOrientType.RotateRight:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationUpMirrored;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          default:
            break;
        }
        break;
      case UIImageOrientation.UIImageOrientationDown:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationDownMirrored;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationUpMirrored;
            break;
          case ImageOrientType.RotateLeft:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationRight;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          case ImageOrientType.RotateRight:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeft;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }

          }
            break;
          default:
            break;
        }
        break;
      case UIImageOrientation.UIImageOrientationDownMirrored:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationDown;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationUp;
            break;
          case ImageOrientType.RotateLeft:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationRightMirrored;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          case ImageOrientType.RotateRight:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeftMirrored;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          default:
            break;
        }
        break;
      case UIImageOrientation.UIImageOrientationRight:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeftMirrored;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationRightMirrored;
            break;
          case ImageOrientType.RotateLeft:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationUp;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          case ImageOrientType.RotateRight:
          {
            this.imageOrientation = UIImageOrientation.UIImageOrientationDown;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
          }
            break;
          default:
            break;
        }
        break;
      case UIImageOrientation.UIImageOrientationRightMirrored:
        switch (orientType) {
          case ImageOrientType.FlipHoriz:
            this.imageOrientation = UIImageOrientation.UIImageOrientationLeft;
            break;
          case ImageOrientType.FlipVert:
            this.imageOrientation = UIImageOrientation.UIImageOrientationRight;
            break;
          case ImageOrientType.RotateLeft:
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
            this.imageOrientation = UIImageOrientation.UIImageOrientationUpMirrored;
            break;
          case ImageOrientType.RotateRight:
            this.imageOrientation = UIImageOrientation.UIImageOrientationDownMirrored;
            if (!this.scaleAspectFit) {
              this.lensRect = new CGRect(this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
            }
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    if (this.scaleAspectFit) {
      this.computeFitPresentation();
    }
  }

  /**
   * Draw the presentation image in the given client Rect under the context
   *
   * @param rect
   * @param context
   */
  drawInRect(rect:CGRect,context: any) {
    // let rect: CGRect = this.lensRect;//this.parentTileView.displayRect();

    logger.info("draw the image in the rect,X:"+rect.x+",Y:"+rect.y+",width:"+rect.width+",height:"+rect.height);
    let img = new Image();
    if(Config.imageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure){
      //draw the roi
      this.drawRois(context);

    }else {
      img.onload = (() => {
        if(this.parentTileView == null){
          return;
        }
        this.parentTileView.removeLoadingImg();

        let imgWidth = img.width;
        let imgHeight = img.height;

        if(this.inverted){
          let imgData : ImageData = this.loadFromImage(img);
          for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i+1] = 255 - imgData.data[i+1];
            imgData.data[i+2] = 255 - imgData.data[i+2];
            imgData.data[i+3] = 255;
          }
          context.putImageData(imgData,(rect.width - imgWidth)/2, (rect.height - imgHeight)/2);

        }else{
          context.drawImage(img,(rect.width - imgWidth)/2, (rect.height - imgHeight)/2, imgWidth, imgHeight);
        }

        //draw the roi
        this.drawRois(context);

        //draw the rulers
        this.parentTileView.drawRulers();

        this.currentDisplayImage = img;
      });
      img.onerror=(e=> {
        console.log(e);
        this.parentTileView.removeLoadingImg();
        this.parentTileView.displayError();
      });
      img.crossOrigin='Anonymous';
      img.src = this.generateURL(rect);
    }

  }

  /**
   * decode the jpeg image downloaded from AxVS.
   *
   * @param img
   * @returns {ImageData}
   */
  loadFromImage(img: any) : ImageData{
    let w = img.width;
    let h = img.height;

    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, w, h);    // some browsers synchronously decode image here
  }

  generateURL(rect: CGRect): string {
    return `${Config.AXVS_ADDRESS}/services/image?access_token=${Config.AXVS_ACCESS_TOKEN}&` + this.convert2RetrieveImageRequest(rect).toURI();
  }

  changeWindowLevel(widthStep: number, centerStep: number) {
    this._currentWindowCenter = this._currentWindowCenter + centerStep;
    this._currentWindowWidth = this._currentWindowWidth + widthStep;
  }

  convert2RetrieveImageRequest(rect: CGRect): RetrieveImageRequest {
    let newRetrieveImageRequest = new RetrieveImageRequest();
    newRetrieveImageRequest.studyUID = this.frameReference.parentStudy.studyUID;
    newRetrieveImageRequest.seriesUID = this.frameReference.parentSeries.seriesUID;
    newRetrieveImageRequest.objectUID = this.frameReference.parentImageSop.imageUID;
    /**
     * From 1 to n.
     */
    newRetrieveImageRequest.frameNumber = this.frameReference.parentImageSop.frames;
    //newRetrieveImageRequest.hasOverlay = number;
    //background : string;
    //tiles : string;
    newRetrieveImageRequest.windowWidth = Math.round(this.currentWindowWidth);
    newRetrieveImageRequest.windowCenter = Math.round(this.currentWindowCenter);
    if (this.aspectScale == null) {
      let sx = rect.width / this.frameReference.parentImageSop.width;
      let sy = rect.height / this.frameReference.parentImageSop.height;
      this.aspectScale = sx > sy ? sy : sx;
      // newRetrieveImageRequest.zoom = this.aspectScale;
    } //else {
      //compRate : number;
    if (this.parentTileView) {
      newRetrieveImageRequest.viewWidth = Math.round(rect.width);
      newRetrieveImageRequest.viewHeight = Math.round(rect.height);
      // newRetrieveImageRequest.originX = this.parentTileView.frame.x;
      // newRetrieveImageRequest.originY = this.parentTileView.frame.y;
      newRetrieveImageRequest.originX = this.lenCenterAtImage.x;
      newRetrieveImageRequest.originY = this.lenCenterAtImage.y;
    }
    newRetrieveImageRequest.zoom = this.aspectScale;
    // }

    // zoomMethod : string;
    //roiType : string;
    //roiLeft : string;
    //roiRight : string;
    //roiBottom : string;
    //roiTop : string;
    //modalityLutIndex : number;
    //voiLutIndex : number;
    //isKeyOperation : number;
    return newRetrieveImageRequest;
  }


  setWL(windowCenter: number, windowWidth: number) {
    this._currentWindowCenter = windowCenter;
    this._currentWindowWidth = windowWidth;
    if (Config.AxOperationScope != OperationScope.ImageScope) {

      EventDispatcher.getInstance().dispatch(EventTypes.ScaleChangeNotification, this,
        {'currentWindowCenter':this.currentWindowCenter,'currentWindowWidth':this.currentWindowWidth,'isUsingPreset':this.isUsingPreset});
    }
  }

  drawRois(context: any){
    for(let roi of this.rois){
      roi.drawRoiOnImage(context, this);
    }
  }

  fminf(sx:number, sy:number):number{
    return sx>sy?sy:sx;
  }


  moveToXToY(x:number, y:number){
    let point:CGPoint=new CGPoint(x, y);
    let lensRect:CGRect = this.lensRect;

    let lensCenter:CGPoint = this.parentTileView.center;
    lensCenter = new CGPoint(lensCenter.x - this.parentTileView.frame.origin.x, lensCenter.y - this.parentTileView.frame.origin.y);

    let xLens:number,yLens:number,xCenterLens:number,yCenterLens:number;
    let orientation:UIImageOrientation = this.imageOrientation;//[self getImageCurrentOrientation];
    switch (orientation) {
      case UIImageOrientation.UIImageOrientationUp:
        xLens=lensRect.origin.x - point.x;
        yLens=lensRect.origin.y - point.y;
        xCenterLens = lensCenter.x - point.x;
        yCenterLens = lensCenter.y - point.y;
        break;

      case UIImageOrientation.UIImageOrientationUpMirrored:
        xLens=lensRect.origin.x + point.x;
        yLens=lensRect.origin.y - point.y;
        xCenterLens = lensCenter.x + point.x;
        yCenterLens = lensCenter.y - point.y;
        break;

      case UIImageOrientation.UIImageOrientationDown:
        xLens=lensRect.origin.x + point.x;
        yLens=lensRect.origin.y + point.y;
        xCenterLens = lensCenter.x + point.x;
        yCenterLens = lensCenter.y + point.y;
        break;

      case UIImageOrientation.UIImageOrientationDownMirrored:
        xLens=lensRect.origin.x - point.x;
        yLens=lensRect.origin.y + point.y;
        xCenterLens = lensCenter.x - point.x;
        yCenterLens = lensCenter.y + point.y;
        break;

      case UIImageOrientation.UIImageOrientationLeftMirrored:
        xLens=lensRect.origin.x - point.y;
        yLens=lensRect.origin.y - point.x;
        xCenterLens = lensCenter.x - point.y;
        yCenterLens = lensCenter.y - point.x;
        break;

      case UIImageOrientation.UIImageOrientationRight:
        xLens=lensRect.origin.x - point.y;
        yLens=lensRect.origin.y + point.x;
        xCenterLens = lensCenter.x - point.y;
        yCenterLens = lensCenter.y + point.x;
        break;

      case UIImageOrientation.UIImageOrientationRightMirrored:
        xLens=lensRect.origin.x + point.y;
        yLens=lensRect.origin.y + point.x;
        xCenterLens = lensCenter.x + point.y;
        yCenterLens = lensCenter.y + point.x;
        break;

      case UIImageOrientation.UIImageOrientationLeft:
        xLens=lensRect.origin.x + point.y;
        yLens=lensRect.origin.y - point.x;
        xCenterLens = lensCenter.x + point.y;
        yCenterLens = lensCenter.y - point.x;
        break;

      default:
        break;
    }

    this.lensRect = new CGRect(xLens, yLens, lensRect.size.width, lensRect.size.height);
    this.scaleAspectFit = false;
    this.isNeedToComputeLen = false;
    this._lenCenterAtImage = this.convertToPointInOriginalImage(lensCenter);

    if (Config.AxOperationScope != OperationScope.ImageScope) {
      // NSDictionaryy * info = [NSDictionary dictionaryWithObjectsAndKeys:
      // [NSValue valueWithCGRect:_lensRect],   @"lensRect",
      // [NSString stringWithFormat:@"%f",_aspectScale],   @"aspectScale",
      // [NSValue valueWithCGSize:self.originalSize],   @"originalImageSize",
      // [NSValue valueWithCGPoint:_lenCenterAtImage],   @"lenCenterInImage",
      // [NSString stringWithFormat:@"%d",_scaleAspectFit],   @"scaleAspectFit",
      // [NSString stringWithFormat:@"%d",_isUsingPreset],   @"isUsingPreset",
      // nil];
      // [[NSNotificationCenter defaultCenter] postNotificationName:AxPropagateNotification object:self userInfo:info];
    }
  }
}

