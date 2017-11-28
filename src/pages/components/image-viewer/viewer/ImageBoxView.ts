import {TileView} from "./TileView";
import {DisplaySet} from "../display/DisplaySet";
//import {Series} from "../model/Series";
import {CGRect} from "../common/CGRect";
import {PresentationImage} from "../display/PresentationImage";
import {LFService} from "typescript-logging";
import {EventDispatcher, EventTypes} from "../common/EventDispatcher";
import {Config} from "../Config";

const factory = LFService.createLoggerFactory();
export const logger = factory.getLogger("ImageBoxView");

/**
 * Created by binsirMac on 2016-12-26.
 */
export class ImageBoxView {
  frame:CGRect;
  bounds:CGRect;
  // the image box viewer div html element
  imageBoxRootDivElement: HTMLElement;
  // public members
  private _selected: boolean;
  enabled: boolean = true;
  displayedSeriesUID: string;
  currentDisplayedSeries: any;
  currentDisplayedStudy: any;
  tileViews: TileView[] = [];
  selectedTileView: TileView;
  isPlaying: boolean;
  normalizedRectangle: ClientRect;
  private _topLeftPresentationImageIndex: number = -1;
  private presentationImagesCount: number = 0;
  displaySet: DisplaySet;

  //private members
  private tileRows: number;
  private tileColumns: number;
  private isCrossSectional: boolean;

  private imageBoxViewWidth: number;
  private imageBoxViewHeight: number;


  constructor(private parentFrame: CGRect, private imageBoxRows: number, private imageBoxColumns: number, private tag: number) {
    let newWidth = (parentFrame.width) / imageBoxColumns;
    let newHeight = (parentFrame.height) / imageBoxRows;
    let newX = newWidth * (tag % imageBoxColumns);
    let newY = newHeight * (tag / imageBoxColumns);
    this.frame = new CGRect(newX,newY,newWidth,newHeight);
    this.bounds = new CGRect(0,0,newWidth,newHeight);

    this.imageBoxViewWidth = newWidth;
    this.imageBoxViewHeight = newHeight;

    //create the div HTML Element;
    this.imageBoxRootDivElement = document.createElement('div');
    this.imageBoxRootDivElement.setAttribute("class", "imageBoxView");
    this.imageBoxRootDivElement.setAttribute("style",
      `border:${Config.IMAGEBOXVIEW_BORDOR_WIDTH}px solid ${Config.IMAGEBOXVIEW_UNSELECTED_COLOR};float: left; width:${newWidth}px;height:${newHeight}px;`);
    this.imageBoxRootDivElement.setAttribute("tag", "" + tag);
    //create the tile views;
    this.tileRows = Config.TILEVIEW_LAYOUT_ROWS;
    this.tileColumns = Config.TILEVIEW_LAYOUT_COLUMNS;

    let matrixSize: number = this.tileRows * this.tileColumns;

    for (let i: number = 0; i < matrixSize; i++) {
      let tileWidth: number = (newWidth - 2 * Config.IMAGEBOXVIEW_BORDOR_WIDTH) / this.tileColumns;
      let tileHeight: number = (newHeight - 2 * Config.IMAGEBOXVIEW_BORDOR_WIDTH ) / this.tileRows;
      let tileX: number = tileWidth * (i / this.tileColumns);
      let tileY: number = tileHeight * (i % this.tileColumns);
      let tileFrame = new CGRect(tileX, tileY, tileWidth, tileHeight);

      let tileView = new TileView(this, tileFrame, this.tileRows, this.tileColumns, i);

      this.tileViews.push(tileView);

      tileView.draw(this.imageBoxRootDivElement);

      if (i == 0) {
        this.selectedTileView = tileView;
      }
    }

    //define all the event listeners
    EventDispatcher.getInstance().subscribe(EventTypes.SelectTileView, (selectedTileView, args) => {
      if (selectedTileView.parentImageBoxView == this) {
        this.selected = true;
        if (this.selectedTileView != selectedTileView) {
          this.selectedTileView = selectedTileView;
        }
      } else {
        this.selected = false;
      }

    });
    EventDispatcher.getInstance().subscribe(EventTypes.Resize, (imageViewer,imageViewerCGRect) => {
      logger.info(`Resize the Imageboxviewer, width:${imageViewerCGRect.width} - ${imageViewerCGRect.height}`);
      let newWidth = (imageViewerCGRect.width) / this.imageBoxColumns;
      let newHeight = (imageViewerCGRect.height) / this.imageBoxRows;
      let newX = newWidth * (this.tag % this.imageBoxColumns);
      let newY = newHeight * (this.tag / this.imageBoxColumns);

      this.imageBoxViewWidth = newWidth;
      this.imageBoxViewHeight = newHeight;

      if (this.selected) {
        this.imageBoxRootDivElement.setAttribute("style",
          `border:${Config.IMAGEBOXVIEW_BORDOR_WIDTH}px solid ${Config.IMAGEBOXVIEW_SELECTED_COLOR};float: left; width:${this.imageBoxViewWidth}px;height:${this.imageBoxViewHeight}px;`);
      } else {
        this.imageBoxRootDivElement.setAttribute("style",
          `border:${Config.IMAGEBOXVIEW_BORDOR_WIDTH}px solid ${Config.IMAGEBOXVIEW_UNSELECTED_COLOR};float: left; width:${this.imageBoxViewWidth}px;height:${this.imageBoxViewHeight}px;`);
      }

      let i : number = 0;
      for(let tileView of this.tileViews){
        let tileWidth: number = (newWidth - 2 * Config.IMAGEBOXVIEW_BORDOR_WIDTH ) / this.tileColumns;
        let tileHeight: number = (newHeight - 2 * Config.IMAGEBOXVIEW_BORDOR_WIDTH) / this.tileRows;
        let tileX: number = tileWidth * (i / this.tileColumns);
        let tileY: number = tileHeight * (i % this.tileColumns);
        let tileFrame = new CGRect(tileX, tileY, tileWidth, tileHeight);
        tileView.resize(tileFrame);
        i ++;
      }
    });

  }

  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    if (value) {
      this.imageBoxRootDivElement.setAttribute("style",
        `border:${Config.IMAGEBOXVIEW_BORDOR_WIDTH}px solid ${Config.IMAGEBOXVIEW_SELECTED_COLOR};float: left; width:${this.imageBoxViewWidth}px;height:${this.imageBoxViewHeight}px;`);
    } else {
      this.imageBoxRootDivElement.setAttribute("style",
        `border:${Config.IMAGEBOXVIEW_BORDOR_WIDTH}px solid ${Config.IMAGEBOXVIEW_UNSELECTED_COLOR};float: left; width:${this.imageBoxViewWidth}px;height:${this.imageBoxViewHeight}px;`);
    }
  }

  draw(imageViewerDivElement: HTMLElement) {
    imageViewerDivElement.appendChild(this.imageBoxRootDivElement);
  }

  removeAll() {
    while (this.imageBoxRootDivElement.firstChild) {
      this.imageBoxRootDivElement.removeChild(this.imageBoxRootDivElement.firstChild);
    }
  }

  setCurrentDisplayedSeries(study: any, series: any) {
    logger.info("to display series:" + series);

    // 0.remove current display set from the sereis.
    // this.removeAll();

    // 1.set the shown series instance uid
    this.currentDisplayedSeries = series;
    this.currentDisplayedStudy = study;

    // 2.generate the displayset from the series
    let displaySet = DisplaySet.generateFromSeries(study, series);

    // 3.set the shown displayset
    this.setDisplaySet(displaySet);

    // 4.post the selected tile view change event
    if (this.selected) {
      // NSNotificationCenter *notificationCenter=[NSNotificationCenter defaultCenter];
      //
      // [notificationCenter postNotificationName:AxChangeSeriesNotification
      // object:self.selectedTileView];
    }
  }

  setDisplaySet(displaySet: DisplaySet) {
    this.displaySet = displaySet;

    this.presentationImagesCount = displaySet.presentationImages.length;

    if (this.presentationImagesCount > 0) {
      let presentationImage = displaySet.presentationImages[0];
      this.displayedSeriesUID = presentationImage.frameReference.parentImageSop.seriesInstanceUid;
    }

    if (this.presentationImagesCount > 0) {
      this.topLeftPresentationImageIndex = 0;

      if (this.presentationImagesCount > 1) {
        this.isCrossSectional = true;
      } else {
        this.isCrossSectional = false;
      }

      this.adjustShowImages();
    }
  }

  adjustShowImages() {
    let index: number = 0;

    for (let tileView of this.tileViews) {
      let nexTopLeftPresentationImageIndex = this.topLeftPresentationImageIndex + index;
      if (nexTopLeftPresentationImageIndex < this.presentationImagesCount) {
        tileView.setPresentationImage(this.displaySet.presentationImages[nexTopLeftPresentationImageIndex]);
      } else {
        tileView.setPresentationImage(null);
      }
      index++;
    }
  }

  increaseTopLeftPresentationImageIndex(){
    if(this.topLeftPresentationImageIndex == this.displaySet.presentationImages.length - 1){
      return;
    }
    this.topLeftPresentationImageIndex ++;
  }
  decreaseTopLeftPresentationImageIndex(){
    if (this.topLeftPresentationImageIndex == 0){
      return;
    }
    this.topLeftPresentationImageIndex --;
  }

  get topLeftPresentationImageIndex():number{
    return this._topLeftPresentationImageIndex;
  }
  set topLeftPresentationImageIndex(value : number){
    if (this._topLeftPresentationImageIndex == value) {
      return;
    }
    if (value >= 0 || value < this.presentationImagesCount) {
      this._topLeftPresentationImageIndex = value;
      let sliderPosition :number = value / (this.tileColumns * this.tileRows);
      // imageScrollBar.value = sliderPosition;
      // //        [imageScrollBar setIndex:topLeftPresentationImageIndex andTotal:self.presentationImagesCount];
      //
      this.adjustShowImages();
      // [imageScrollBar setScrollImageIndex:self.selectedTileView.presentationImage];
    }
  }

  reset(){
    if(this.selectedTileView){
      this.selectedTileView.reset();
    }
  }

  setWL(windowCenter : number, windowWidth : number){
    if(this.selectedTileView){
      this.selectedTileView.setWL(windowCenter, windowWidth);
    }
  }

  rotate(degree:number){
    if(this.selectedTileView){
      this.selectedTileView.rotate(degree);
    }
  }
}
