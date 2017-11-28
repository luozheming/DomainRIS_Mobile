import { Component, ViewChild, ElementRef  } from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController, Gesture} from 'ionic-angular';
import {ImageViewer} from "../../../components/image-viewer/ImageViewer";
import {AXVS_SERVER_ADDRESS} from "../../../../app/app.constants";
import {Config} from "../../../components/image-viewer/Config";

@Component({
  selector: 'page-relayout-viewer',
  templateUrl: 'relayout-viewer.html'
})
export class ReLayoutPopoverPage {
  imageViewer : any;
  studyViewer : any;

  seriesList : Array<any> = new Array<any>();

  constructor(private navParams: NavParams) {
    this.imageViewer = this.navParams.data.imageViewer;
    this.studyViewer = this.navParams.data.studyViewer;
    if(this.imageViewer && this.imageViewer.displayedStudy) {
      for (let series of this.imageViewer.displayedStudy.series) {
        this.seriesList.push({
          "study":this.imageViewer.displayedStudy,"series":series,
          "seriesDescription":series.seriesDescription,
          "modality":series.modality,"seriesNumber":series.seriesNumber,"numberOfImages":series.numberOfImages,
          "thumbnail":`${Config.AXVS_ADDRESS}/services/thumbnail?studyUID=${this.imageViewer.displayedStudy.studyUID}&seriesUID=${series.seriesUID}&objectUID=${series.image[0].imageUID}&access_token=${Config.AXVS_ACCESS_TOKEN}`});
      }
    }
  }
}
