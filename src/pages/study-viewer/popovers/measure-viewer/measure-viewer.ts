import { Component, ViewChild, ElementRef  } from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController, Gesture} from 'ionic-angular';
import {ImageViewer} from "../../../components/image-viewer/ImageViewer";
import {AXVS_SERVER_ADDRESS} from "../../../../app/app.constants";
import {RoiUtil} from "../../../components/image-viewer/roi/RoiUtil";
import {AngleRoiTool} from "../../../components/image-viewer/roi/AngleRoiTool";
import {Config} from "../../../components/image-viewer/Config";
import {ImageOperatingType} from "../../../components/image-viewer/common/ImageOperatingType";
import {EventDispatcher, EventTypes} from "../../../components/image-viewer/common/EventDispatcher";
import {LinearRoiTool} from "../../../components/image-viewer/roi/LinearRoiTool";

@Component({
  selector: 'page-measure-viewer',
  templateUrl: 'measure-viewer.html'
})
export class MeasurePopoverPage {
  imageViewer : any;
  studyViewer : any;
  constructor(private navParams: NavParams) {
    this.imageViewer = this.navParams.data.imageViewer;
    this.studyViewer = this.navParams.data.studyViewer;
  }

  onClickPointMeasureButton(){
  }

  onClickElipseMeasureButton(){

  }

  onClickRectangleMeasureButton(){

  }

  onClickAngleMeasureButton(){
    Config.imageOperatingType = ImageOperatingType.ImageOperatingTypeMeasure;
    EventDispatcher.getInstance().dispatch(EventTypes.ChangeOperatingType, this, 'Get the change');

    RoiUtil.setCurrentRoiTool(AngleRoiTool.shareAngleRoiTool());
  }

  onClickLineMeasureButton(){
    Config.imageOperatingType = ImageOperatingType.ImageOperatingTypeMeasure;
    EventDispatcher.getInstance().dispatch(EventTypes.ChangeOperatingType, this, 'Get the change');

    RoiUtil.setCurrentRoiTool(LinearRoiTool.shareLinearRoiTool());
  }
}
