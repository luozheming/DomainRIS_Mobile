import { Component, ViewChild, ElementRef  } from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController, Gesture} from 'ionic-angular';
import {ImageViewer} from "../../../components/image-viewer/ImageViewer";
import {AXVS_SERVER_ADDRESS} from "../../../../app/app.constants";

@Component({
  selector: 'page-preset-viewer',
  templateUrl: 'preset-viewer.html'
})
export class PresetPopoverPage {
  private imageViewer : any;
  private studyViewer : any;
  constructor(private navParams: NavParams) {
    this.imageViewer = this.navParams.data.imageViewer;
    this.studyViewer = this.navParams.data.studyViewer;
  }

  preset(presetType : number){
    if (this.imageViewer){
      let modality : string = this.imageViewer.selectedImageBoxView.currentDisplayedSeries.modality;
      switch (presetType)
      {
        case 1:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(620,445);
              break;
            case 'CT':
              this.imageViewer.preset(56,342);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(135,240);
              break;
          }
          break;
        case 2:

          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(436,628);
              break;
            case 'CT':
              this.imageViewer.preset(-498,1465);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(508,1450);
              break;
          }
          break;
        case 3:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(776,515);
              break;
            case 'CT':
              this.imageViewer.preset(93,109);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(625,1410);
              break;
          }
          break;
        case 4:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(783,735);
              break;
            case 'CT':
              this.imageViewer.preset(570,3077);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(519,775);
              break;
          }
          break;
        case 5:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(602,489);
              break;
            case 'CT':
              this.imageViewer.preset(42,155);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(500,500);
              break;
          }
          break;
        case 6:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(625,646);
              break;
            case 'CT':
              this.imageViewer.preset(111,195);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(600,600);
              break;
          }
          break;
        case 7:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(108,877);
              break;
            case 'CT':
              this.imageViewer.preset(108,877);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(108,877);
              break;
          }
          break;
        case 8:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(56,342);
              break;
            case 'CT':
              this.imageViewer.preset(56,342);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(56,342);
              break;
          }
          break;
        case 9:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(455,958);
              break;
            case 'CT':
              this.imageViewer.preset(455,958);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(455,958);
              break;
          }
          break;
        case 10:
          //icon_preset_abdomen_off
          switch (modality)
          {
            case 'CR':
            case 'DX':
            case 'MG':
              this.imageViewer.preset(747,727);
              break;
            case 'CT':
              this.imageViewer.preset(747,727);
              break;
            case 'MR':
            case 'RF':
            case 'US':
            case 'XA':
              this.imageViewer.preset(747,727);
              break;
          }
          break;
      }
    }

    this.studyViewer.dismiss();
  }
}
