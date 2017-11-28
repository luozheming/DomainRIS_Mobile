import { Component } from '@angular/core';
import { NavController,AlertController,ToastController,NavParams } from 'ionic-angular';
import { LoginService } from '../../service/login.service';
import { Patient }from "../Collaborativelist/patient";
import { Report } from "../Report_view/report";
import { HomePage } from "../home/home";
import { Collaborative_listPage } from "../Collaborativelist/Collaborativelist";
import { Consultation_listPage } from "../Consultationlist/Consultationlist";
declare function utf8to16(url:string);
import { Patitentxml } from "../../app/app.constants";
import { StudyViewerPage } from "../study-viewer/study-viewer";


@Component({
  selector: 'page-Report_write',
  templateUrl: 'Report_write.html'
})
export class Report_writelist {
  patient : Patient;
  report: Report;
  errorMessage: string;
  reportvalue:any;
  requestvalue:any;
  report_date:string;
  current_user:string;
  report_content:string;
  user_name:string;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              //private user: HomePage,
              private login_service:LoginService) {
    this.patient = navParams.data;
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
    this.report_content = `${Patitentxml}`;    //注意这种写法本质上是想做一个模板数值，然后copy一个值相同的变量。
    console.log(this.patient);
    //this.buildXml();
  }
  //注意，在初始化方法里，需要对字符串进行替换。
  //   init(){
  //     this.login_service.Report_query(this.report.auditing,this.report.report_no)
  //       .subscribe(
  //         res=>{this.report.report_content=utf8to16(window.atob(res["report"]["report_content"]));this.buildXml();
  //           },
  //         error=>this.errorMessage = <any>error);
  //   }

  Return(){
    this.navCtrl.pop();
  }

  openimage(study) {
	this.navCtrl.push(StudyViewerPage, {item : study.rr_study_uid});
  }

  buildXml() {
    this.report_date = this.Format(new Date(), "yyyy-MM-dd hh:mm:ss");

    if (this.patient.dest_hospital_name !== undefined
      && this.patient.dest_hospital_name !== null) {
      this.report_content = this.report_content
        .replace(
          "<patient_hospital_value></patient_hospital_value>",
          "<patient_hospital_value>"
          + this.patient.dest_hospital_name
          + "</patient_hospital_value>")
    }
    if (this.patient.pat_id !== undefined
      && this.patient.pat_id !== null) {
      this.report_content = this.report_content
        .replace(
          "<patient_pid_value></patient_pid_value>",
          "<patient_pid_value>"
          + this.patient.pat_id
          + "</patient_pid_value>")
    }
    if (this.patient.pat_name !== undefined
      && this.patient.pat_name !== null) {
      this.report_content = this.report_content
        .replace(
          "<patient_name_value></patient_name_value>",
          "<patient_name_value>"
          + this.patient.pat_name
          + "</patient_name_value>")
    }
    if (this.patient.pat_sex !== undefined
      && this.patient.pat_sex !== null) {
      this.report_content = this.report_content
        .replace(
          "<patient_sex_value></patient_sex_value>",
          "<patient_sex_value>"
          + this.patient.pat_sex
          + "</patient_sex_value>")
    }
    if (this.patient.pat_birth_str !== undefined
      && this.patient.pat_birth_str !== null) {
      this.report_content = this.report_content
        .replace(
          "<patient_birthday_date></patient_birthday_date>",
          "<patient_birthday_date>"
          + this.patient.pat_birth_str
          + "</patient_birthday_date>")
    }
    if (this.patient.pat_age !== undefined
      && this.patient.pat_age !== null) {
      this.report_content = this.report_content
        .replace(
          "<age_value></age_value>",
          "<age_value>"
          + this.patient.pat_age
          + "</age_value>")
    }
    if (this.patient.reqou_name !== undefined
      && this.patient.reqou_name !== null) {
      this.report_content = this.report_content
        .replace(
          "<dept_no_value></dept_no_value>",
          "<dept_no_value>"
          + this.patient.reqou_name
          + "</dept_no_value>")
    }
    if (this.patient.clinical_symptoms !== undefined
      && this.patient.clinical_symptoms !== null) {
      this.report_content = this.report_content
        .replace(
          "<symptom_value></symptom_value>",
          "<symptom_value>"
          + this.patient.clinical_symptoms
          + "</symptom_value>")
    }
    if (this.patient.clinical_diagnosis !== undefined
      && this.patient.clinical_diagnosis !== null) {
      this.report_content = this.report_content
        .replace(
          "<diagnoses_value></diagnoses_value>",
          "<diagnoses_value>"
          + this.patient.clinical_diagnosis
          + "</diagnoses_value>")
    }
    if (this.patient.bodypart !== undefined
      && this.patient.bodypart !== null) {
      this.report_content = this.report_content
        .replace(
          "<check_part_value></check_part_value>",
          "<check_part_value>"
          + this.patient.bodypart
          + "</check_part_value>")
    }
    if (this.patient.image_symptoms !== undefined
      && this.patient.image_symptoms !== null) {
      this.report.report_content = this.report.report_content
        .replace(
          "<report_content_value></report_content_value>",
          "<report_content_value>"
          + this.patient.image_symptoms
          + "</report_content_value>")
    }
    if (this.patient.image_diagnosis !== undefined
      && this.patient.image_diagnosis !== null) {
      this.report.report_content = this.report.report_content
        .replace(
          "<report_conclusion_value></report_conclusion_value>",
          "<report_conclusion_value>"
          + this.patient.image_diagnosis
          + "</report_conclusion_value>")
    }
    if (this.patient.reqdoc_name !== undefined
      && this.patient.reqdoc_name !== null) {
      this.report_content = this.report_content
        .replace(
          "<exam_doctor_value></exam_doctor_value>",
          "<exam_doctor_value>"
          + this.patient.reqdoc_name
          + "</exam_doctor_value>")
    }
    if (localStorage.getItem("displayname") !== null) {
      this.report_content = this.report_content
        .replace(
          "<report_doctor_value></report_doctor_value>",
          "<report_doctor_value>"
          + localStorage.getItem("displayname")
          + "</report_doctor_value>")
    }
    if (this.report_date !== undefined
      && this.report_date !== null) {
      this.report_content = this.report_content
        .replace(
          "<report_date_value></report_date_value>",
          "<report_date_value>"
          + this.report_date
          + "</report_date_value>")
    }

	if (this.patient.request_type == 'Consult') {
		this.report.auditing = "Y";
	} else if (this.patient.request_type == 'CDO') {
		this.report.auditing = "C";
	}

    this.reportvalue={
      auditing:this.report.auditing,
      auditor_name:localStorage.getItem("displayname"),
      auditor_no:localStorage.getItem("userno"),
      conclusion:this.report.conclusion,
      content:this.report.content,
      hospital_id:this.patient.dest_hospital_id,
      report_content:this.report_content,
      report_date:this.report_date,
      request_no:this.patient.request_no
    };

	this.requestvalue = {
	  request_no:this.patient.request_no
	};

  }

	Submit() {
		this.buildXml();
		console.log(this.reportvalue);
		console.log(this.requestvalue);
		this.login_service.save(this.reportvalue)  //这里先对回应的状态进行打印
				.subscribe(
				res  => {if(String(res.status)  =="Success"){
					this.login_service.submit(this.requestvalue)
						.subscribe(
							res  => {if(String(res.status)=="Success"){
								if (this.patient.request_type == 'Consult') {
									this.navCtrl.push(Consultation_listPage);
								} else if (this.patient.request_type == 'CDO') {
									this.navCtrl.push(Collaborative_listPage);
								}
							} else if (String(res.status)=="Failure") {
								this.onError(res.errorCode);
							}
						}, error => this.errorMessage = <any>error);
				} else if(String(res.status)=="Logged_out") {
					this.navCtrl.push(HomePage);
				} else if(String(res.status)=="Failure") {
					this.onError(res.errorCode);
				}},
				error =>  this.errorMessage = <any>error);
    }

	private onError(message) {
		let message: string ='没有更多病人信息！';

		const toast = this.toastCtrl.create({
		  message,
		  duration: 2000,
		  position: 'bottom'
		});

		toast.present();
	}

	private Format(date, fmt) { // author: meizz
		var o = {
			"M+": date.getMonth() + 1, // 月份
			"d+": date.getDate(), // 日
			"h+": date.getHours(), // 小时
			"m+": date.getMinutes(), // 分
			"s+": date.getSeconds(), // 秒
			"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
			"S": date.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
}


//通信问题：注入依赖时存在错误。
//时间格式问题，无法达到post所要求的时间格式
