import {LFService} from "typescript-logging";
import {ImageBoxView} from "./viewer/ImageBoxView";
import {StreamJSONStudyLoader} from "./loader/StreamJSONStudyLoader";
import {CGRect} from "./common/CGRect";
import {Config} from "./Config";
import {EventDispatcher, EventTypes} from "./common/EventDispatcher";
import {ImageOperatingType} from "./common/ImageOperatingType";
/**
 * Created by binsirMac on 2016-12-26.
 */


const factory = LFService.createLoggerFactory();
export const logger = factory.getLogger("ImageViewer");

export class ImageViewer {

  selectedImageBoxView : ImageBoxView;
  imageBoxRows  : number;
  imageBoxColumns : number;

  displayedStudy : any;

  constructor(private imageViewerDivElement: HTMLElement,
              public  studyUID: string,
              public  studyStatus: string,
              public  axvsAddress: string,
              public  axvsUserId: string,
              public  axvsPassword: string,) {
    if(axvsAddress){
      Config.AXVS_ADDRESS = axvsAddress.trim();
    }else{
      this.displayError();
    }
    Config.AXVS_USERID = axvsUserId;
    Config.AXVS_PASSWORD = axvsPassword;

    //define all the event listeners
    EventDispatcher.getInstance().subscribe(EventTypes.SelectTileView, (selectedTileView, args) => {
      this.selectedImageBoxView = selectedTileView.parentImageBoxView;
    });
  }

  clear(){
    EventDispatcher.getInstance().clear();
  }

  display() {
    logger.info("To show the studyUID:" + this.studyUID + ", from the VS:" + this.axvsAddress);
    //imageViewerDivElement.innerText = "call the display image viewer" + this.studyUID;

    this.displayLoading();

    if (this.studyUID) {
      this.displayStudy();
    }

  }

  removeAll() {
    while (this.imageViewerDivElement.firstChild) {
      this.imageViewerDivElement.removeChild(this.imageViewerDivElement.firstChild);
    }
  }

  displayLoading() {
    this.removeAll();

    //set the default loading page;
    let img = document.createElement('img');
    img.setAttribute('src', 'assets/img/viewer/waiting.gif');
    img.setAttribute('class', 'centeredImg');
    this.imageViewerDivElement.appendChild(img);
  }

  displayError(){
    this.removeAll();

    //set the default loading page;
    let img = document.createElement('img');
    img.setAttribute('src', 'assets/img//viewer/error.png');
    img.setAttribute('class', 'centeredImg');
    this.imageViewerDivElement.appendChild(img);
  }

  displayStudy() {
    let streamJSONStudyLoader = new StreamJSONStudyLoader(this.studyUID,this.studyStatus);

    streamJSONStudyLoader.load().then((study : any) => {
      logger.info("the display study:"+study);
      //1. reset the div to display the study.
      this.removeAll();

      //2. generate the layout
      this.displayedStudy = study;
      if (study.series.length == 1){
        // set the image viewer layout.
        this.setImageViewerLayout(1, 1, study);
      }else if (study.series.length == 2){
        this.setImageViewerLayout(2, 1, study);
      }else{
        // set the image viewer layout.
        this.setImageViewerLayout(2, 2, study);
      }
    }, (error) => {
      console.error("Failed!", error);
      this.displayError();
    });
  }

  setImageViewerLayout(rows: number, columns: number, study : any) {
    logger.info("set layout to rows:" + rows + ", columns:" + columns);
    //first remove all the elements.
    this.removeAll();

    //second draw the designed grid
    this.imageBoxRows = rows;
    this.imageBoxColumns = columns;

    let newSize = rows * columns;
    let imageViewerRect = this.imageViewerDivElement.getBoundingClientRect();
    let imageViewerRectWidth : number = imageViewerRect.width;
    let imageViewerRectHeight : number = imageViewerRect.height - Config.IMAGEVIEWER_PADDING_TOP;

    let imageViewerCGRect = new CGRect(0, 0 , imageViewerRectWidth , imageViewerRectHeight);

    for (let i: number = 0; i < newSize; i++) {
      let newImageBoxView = new ImageBoxView(imageViewerCGRect, rows, columns , i);

      if(study && study.series[i]){
        newImageBoxView.setCurrentDisplayedSeries(study, study.series[i]);
      }

      newImageBoxView.draw(this.imageViewerDivElement);

      if( i == 0){
        if(this.selectedImageBoxView){
          this.selectedImageBoxView.selected = false;
        }
        newImageBoxView.selected = true;
        newImageBoxView.selectedTileView.selected = true;
        this.selectedImageBoxView = newImageBoxView;
      }
    }
  }

  reLayout(rows : number, columns : number){
    logger.info(`relayout the image viewer, rows:${rows}, columns:${columns}`);
    this.setImageViewerLayout(rows,columns, this.displayedStudy);
  }

  resize(){
    let imageViewerRect = this.imageViewerDivElement.getBoundingClientRect();
    let imageViewerRectWidth = imageViewerRect.width;
    let imageViewerRectHeight = imageViewerRect.height - Config.IMAGEVIEWER_PADDING_TOP;
    logger.info(`change the size:${imageViewerRectWidth}-${imageViewerRectHeight}`);
    let imageViewerCGRect = new CGRect(0, 0 , imageViewerRectWidth , imageViewerRectHeight);
    EventDispatcher.getInstance().dispatch(EventTypes.Resize, this, imageViewerCGRect);
  }

  reset(){
    if(this.selectedImageBoxView){
      if(this.selectedImageBoxView.selectedTileView){
        this.selectedImageBoxView.selectedTileView.reset();
      }
      this.selectedImageBoxView.reset();
    }
  }

  preset(windowCenter : number, windowWidth : number){
    logger.info(`preset the image with windowCenter:${windowCenter}, windowWidth:${windowWidth}`);
    if(this.selectedImageBoxView){
      this.selectedImageBoxView.setWL(windowCenter,windowWidth);
    }
  }

  rotate(degree:number){
    if(this.selectedImageBoxView){
      this.selectedImageBoxView.rotate(degree);
    }
  }

  selectSeries2Show(study:any,series: any){
    if(this.selectedImageBoxView){
      this.selectedImageBoxView.setCurrentDisplayedSeries(study,series);
    }
  }

  doZoom(){
    Config.imageOperatingType = ImageOperatingType.ImageOperatingTypeZoom;
    EventDispatcher.getInstance().dispatch(EventTypes.ChangeOperatingType, this, 'Get the change');
  }
  doROI(){
    Config.imageOperatingType = ImageOperatingType.ImageOperatingTypeMeasure;
    EventDispatcher.getInstance().dispatch(EventTypes.ChangeOperatingType, this, 'Get the change');
  }
  doWL(){
    Config.imageOperatingType = ImageOperatingType.ImageOperatingTypeWindowLevel;
    EventDispatcher.getInstance().dispatch(EventTypes.ChangeOperatingType, this, 'Get the change');
  }
}
