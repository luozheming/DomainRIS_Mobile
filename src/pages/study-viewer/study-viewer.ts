import { Component, ViewChild, ElementRef  } from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController, Gesture, Popover} from 'ionic-angular';
import {ImageViewer} from "../components/image-viewer/ImageViewer";
import {AXVS_SERVER_ADDRESS} from "../../app/app.constants";
import {ReLayoutPopoverPage} from "./popovers/relayout-viewer/relayout-viewer";
import {PresetPopoverPage} from "./popovers/preset-viewer/preset-viewer";
import {MeasurePopoverPage} from "./popovers/measure-viewer/measure-viewer";
import {RoiPopoverPage} from "./popovers/roi-viewer/roi-viewer";
import {OrientPopoverPage} from "./popovers/orient-viewer/orient-viewer";

/*
 Generated class for the CaseDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-study-viewer',
  templateUrl: 'study-viewer.html'
})
export class StudyViewerPage {
  studyUID;
  tabBarElement: any;
  viewport : any;
  mr1 : any;

  @ViewChild('dicomViewer')
  private _dicomViewer: ElementRef;

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  private imageViewer : ImageViewer;
  private popover : Popover;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController) {
    this.studyUID = navParams.data.item;
    this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    if(this.imageViewer){
      this.imageViewer.clear();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudyViewerPage');

    //to call the DICOM Viewer
    // var mr1 = cornerstone.enable(document.getElementById('mr1'));
    let dicomViewerElement = this._dicomViewer.nativeElement;

    console.log('Get the dicom Viewer Element to display the study');

	var axvsurl = AXVS_SERVER_ADDRESS;
	if (localStorage.getItem("axvsurl") != null) {
		axvsurl = localStorage.getItem("axvsurl");
	}
    this.imageViewer = new ImageViewer(dicomViewerElement,this.studyUID,'status',axvsurl,'doctor','doctor');

    this.imageViewer.display();

    window.addEventListener('resize', () => {
      console.log('resize the image viewer');
      this.imageViewer.resize();
    }, false);

  }
  //reset the study viewer
  reset() {
    this.imageViewer.reset();
  }

  //pop up the relayout page
  presentReLayoutPopover(ev) {
    this.popover = this.popoverCtrl.create(ReLayoutPopoverPage,{imageViewer: this.imageViewer, studyViewer: this});
    this.popover.present({
      ev: ev
    });
  }

  //pop up the preset page
  presentPresetPopover(ev) {
    this.popover = this.popoverCtrl.create(PresetPopoverPage,{imageViewer: this.imageViewer, studyViewer: this});
    this.popover.present({
      ev: ev
    });
  }

  //pop up the tool page
  presentMeasurePopover(ev) {
    this.popover = this.popoverCtrl.create(MeasurePopoverPage,{imageViewer: this.imageViewer, studyViewer: this});
    this.popover.present({
      ev: ev
    });
  }

  presentOrientPopover(ev){
    this.popover = this.popoverCtrl.create(OrientPopoverPage,{imageViewer: this.imageViewer, studyViewer: this});
    this.popover.present({
      ev: ev
    });
  }

  //pop up the roi page
  presentRoiPopover(ev) {
    this.popover = this.popoverCtrl.create(RoiPopoverPage,{imageViewer: this.imageViewer, studyViewer: this});
    this.popover.present({
      ev: ev
    });
  }

  dismiss(){
    if(this.popover){
      this.popover.dismiss();
      this.popover = null;
    }
  }
}
