import { Component, ViewChild, ElementRef  } from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController, Gesture} from 'ionic-angular';
import {ImageViewer} from "../../../components/image-viewer/ImageViewer";
import {AXVS_SERVER_ADDRESS} from "../../../../app/app.constants";

@Component({
  selector: 'page-scope-viewer',
  templateUrl: 'scope-viewer.html'
})
export class ScopePopoverPage {
  imageViewer : any;
  studyViewer : any;
  constructor(private navParams: NavParams) {
    this.imageViewer = this.navParams.data.imageViewer;
    this.studyViewer = this.navParams.data.studyViewer;
  }
}