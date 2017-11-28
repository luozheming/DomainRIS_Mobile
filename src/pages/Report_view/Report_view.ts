import { Component } from '@angular/core';
import { NavController,AlertController,ToastController,NavParams } from 'ionic-angular';
import { LoginService } from '../../service/login.service';
import { Patient }from "../Collaborativelist/patient";
import { Report } from "./report";
import {StudyViewerPage} from "../study-viewer/study-viewer";
declare function utf8to16(url:string);


@Component({
  selector: 'page-Report_view',
  templateUrl: 'Report_view.html'
})
export class Report_viewlist {
  errorMessage: string;
  patient:Patient;
  report:Report;
  auditing:string;    //请求参数
  report_no:string;  //请求参数
  report_conclusion_value:string;
  report_content_value:string;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private login_service:LoginService) {

    this.patient = navParams.data;
	console.log(this.patient);
	if (this.patient.request_type == 'Consult') {
		this.patient.request_type_chn = "会诊";
	} else if (this.patient.request_type == 'CDO') {
		this.patient.request_type_chn = "协同";
	}
    if (this.patient.reportlist !== undefined && this.patient.reportlist !== null) {
		if (this.patient.reportlist.length == 1) {
			this.report = this.patient.reportlist[0];
		} else if (this.patient.reportlist.length == 2) {
			for (var n in this.patient.reportlist) {
				if (this.patient.reportlist[n].auditing != '初始报告') {
					this.report = this.patient.reportlist[n];
					break;
				}
			}
		}
	}
	if (this.report == undefined || this.report == null) {
		this.report = new Report();
	}
  }

  Return(){
    this.navCtrl.pop();
  }
  
  openimage(study) {
	this.navCtrl.push(StudyViewerPage, {item : study.rr_study_uid});
  }
}
