/**
 * Created by binsirMac on 2016-12-28.
 */
export class RetrieveImageRequest{
  studyUID : string;
  seriesUID : string;
  objectUID : string;
  /**
   * From 1 to n.
   */
  frameNumber : number;
  hasOverlay : number;
  background : string;
  tiles : string;
  windowWidth : number;
  windowCenter : number;
  compRate : number;
  viewWidth : number;
  viewHeight : number;
  originX : number;
  originY : number;
  zoom : number;
  zoomMethod : string;
  roiType : string;
  roiLeft : string;
  roiRight : string;
  roiBottom : string;
  roiTop : string;
  modalityLutIndex : number;
  voiLutIndex : number;
  isKeyOperation : number;

  construct(){}

  toURI(){
    //let result = `studyUID=${this.studyUID}&seriesUID=${this.seriesUID}&objectUID=${this.objectUID}&frameNumber=${this.frameNumber}&hasOverlay=${this.hasOverlay}&background=${this.background}&tiles=${this.tiles}&windowWidth=${this.windowWidth}&windowCenter=${this.windowCenter}&compRate=${this.compRate}&viewWidth=${this.viewWidth}&viewHeight=${this.viewHeight}&originX=${this.originX}&originY=${this.originY}&zoom=${this.zoom}&zoomMethod=${this.zoomMethod}&roiType=${this.roiType}&roiLeft=${this.roiLeft}&roiRight=${this.roiRight}&roiBottom=${this.roiBottom}&roiTop=${this.roiTop}&modalityLutIndex=${this.modalityLutIndex}&voiLutIndex=${this.voiLutIndex}&isKeyOperation=${this.isKeyOperation}`;
    let result = `studyUID=${this.studyUID}&seriesUID=${this.seriesUID}&objectUID=${this.objectUID}`;
    if(this.windowWidth){
      result = result + `&windowWidth=${this.windowWidth}`;
    }
    if(this.windowCenter){
      result = result + `&windowCenter=${this.windowCenter}`;
    }
    if(this.zoom){
      result = result + `&zoom=${this.zoom}&zoomMethod=Interpolation`;
    }
    if(this.viewWidth){
      result = result + `&viewWidth=${this.viewWidth}`;
    }
    if(this.viewHeight){
      result = result + `&viewHeight=${this.viewHeight}`;
    }
    //the dicom image in the view Coordinate
    if(this.originX){
      result = result + `&originX=${this.originX}`;
    }
    if(this.originY){
      result = result + `&originY=${this.originY}`;
    }
    return result.replace(/undefined/g,'');
  }
}
