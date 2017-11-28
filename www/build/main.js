webpackJsonp([0],{

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Consultation_listPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_login_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Report_write_Report_write__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Report_view_Report_view__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Consultation_listPage = (function () {
    function Consultation_listPage(navCtrl, alertCtrl, login_service, toastCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.login_service = login_service;
        this.toastCtrl = toastCtrl;
        this.patient_list = [];
        this.search_continue = true;
        this.page = 1; //设置查询的页数
        this.consult_state = "";
        this.request_date_start = "";
        this.request_date_end = "";
        this.request_type = "Consult";
        this.totalRecord = 0;
        this.search();
    } //小弹窗
    Consultation_listPage.prototype.clear = function () {
        this.consult_state = "";
        this.request_date_start = "";
        this.request_date_end = "";
    };
    Consultation_listPage.prototype.Scrollserch = function () {
        var _this = this;
        this.login_service.query(this.request_type, String(this.page), this.consult_state, this.request_date_start, this.request_date_end) //这里先对回应的状态进行打印
            .subscribe(function (res) {
            if (String(res['status']) == 'Success') {
                for (var n in res["requestList"]) {
                    _this.patient_list.push(res["requestList"][n]);
                }
                ;
                console.log(_this.patient_list);
                _this.totalRecord = res["totalRecord"];
            }
            else if (String(res['status']) == 'Logged_out') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    Consultation_listPage.prototype.search = function () {
        var _this = this;
        this.patient_list = []; //每次调用search方法的时候需要初始化；
        this.page = 1;
        this.search_continue = true;
        this.login_service.query(this.request_type, String(this.page), this.consult_state, this.request_date_start, this.request_date_end) //这里先对回应的状态进行打印
            .subscribe(function (res) {
            if (String(res['status']) == 'Success') {
                for (var n in res["requestList"]) {
                    _this.patient_list.push(res["requestList"][n]);
                }
                ;
                console.log(_this.patient_list);
                _this.totalRecord = res["totalRecord"];
            }
            else if (String(res['status']) == 'Logged_out') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    Consultation_listPage.prototype.init = function (patient) {
    };
    Consultation_listPage.prototype.view = function (patient) {
        if (patient['dicom_ready'] == '传输中') {
            this.onError('图像尚未到达，不能开始会诊！');
            return;
        }
        patient['request_type'] = this.request_type;
        if (patient["consult_state"] == "终审") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__Report_view_Report_view__["a" /* Report_viewlist */], patient);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__Report_write_Report_write__["a" /* Report_writelist */], patient);
        }
        console.log("还没有做完呢┬─┬ ノ( ' - 'ノ)");
    };
    Consultation_listPage.prototype.onError = function (text) {
        var message = text;
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    Consultation_listPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            var curr_length = _this.patient_list.length;
            if (_this.search_continue) {
                _this.page++;
                _this.Scrollserch();
            }
            if (_this.totalRecord == _this.patient_list.length) {
                _this.search_continue = false;
                _this.onError('没有更多病人信息！');
            }
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    return Consultation_listPage;
}());
Consultation_listPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Consultationlist',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\Consultationlist\Consultationlist.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span style="color:#939393">会诊列表</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n        <ion-item style="width:100%;display:inline-block">\n      <ion-label floating>会诊状态</ion-label>\n          <ion-select [(ngModel)]="consult_state">\n            <ion-option>未会诊</ion-option>\n            <ion-option>在会诊</ion-option>\n            <ion-option>已会诊</ion-option>\n          </ion-select>\n        </ion-item>\n    </ion-row>\n\n    <ion-row>\n      <ion-item style="width:100%;float:left">\n      <ion-label floating>会诊开始时间</ion-label>\n          <!--<span item-left  style="min-height: 25px;"></span>-->\n          <ion-datetime pickerFormat="YYYY MM DD" displayFormat="YYYY-MM-DD" [(ngModel)]="request_date_start" max="2020-10-31" min="2000-01-01" cancelText="取消" doneText="确认"></ion-datetime>\n        </ion-item>\n      </ion-row>\n      <ion-row>\n        <ion-item style="width:100%;float:left">\n          <ion-label floating>会诊结束时间</ion-label>\n          <!--<span item-left  style="min-height: 25px;"></span>-->\n          <ion-datetime pickerFormat="YYYY MM DD" displayFormat="YYYY-MM-DD" [(ngModel)]="request_date_end" max="2020-10-31" min="2000-01-01" cancelText="取消" doneText="确认"></ion-datetime>\n        </ion-item>\n\n    </ion-row>\n	<ion-row>\n      <ion-col style="width:50%">\n        <button ion-button full (click)="clear()">清除</button>\n      </ion-col>\n	  <ion-col style="width:50%">\n        <button ion-button full (click)="search()">搜索</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n      <ion-card *ngFor="let patient of patient_list" (click)="view(patient)" (onload)= "init(patient)">\n        <ion-card-header>\n          病人信息\n        </ion-card-header>\n\n        <ion-list>\n          <ion-row>\n          <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="briefcase" item-start></ion-icon>\n            请求医院：{{patient.source_hospital_name}}\n          </button>\n          </ion-col>\n            <ion-col width-50>\n              <button ion-item>\n                <ion-icon name="briefcase" item-start></ion-icon>\n                会诊医院：{{patient.dest_hospital_name}}\n              </button>\n            </ion-col>\n            </ion-row>\n\n          <ion-row>\n            <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="body" item-start></ion-icon>\n            病人性别：{{patient.pat_sex}}\n          </button>\n            </ion-col>\n            <ion-col width-50>\n              <button ion-item>\n                <ion-icon name="contacts" item-start></ion-icon>\n                病人生日：{{patient.pat_birth_str}}\n              </button>\n            </ion-col>\n          </ion-row>\n\n          <ion-row>\n            <ion-col width-50>\n              <button ion-item>\n                <ion-icon name="ribbon" item-start></ion-icon>\n                优先级：{{patient.priority_str}}\n          </button>\n        </ion-col>\n            <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="star" item-start></ion-icon>\n            图像状态：{{patient.dicom_ready}}\n          </button>\n            </ion-col>\n          </ion-row>\n\n          <button ion-item>\n            <ion-icon name="checkbox" item-start></ion-icon>\n            会诊状态：{{patient.consult_state}}\n          </button>\n        </ion-list>\n      </ion-card>\n\n\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\Consultationlist\Consultationlist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__service_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
], Consultation_listPage);

//# sourceMappingURL=Consultationlist.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Report_writelist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_login_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Report_view_report__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Collaborativelist_Collaborativelist__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Consultationlist_Consultationlist__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_constants__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__study_viewer_study_viewer__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Report_writelist = (function () {
    function Report_writelist(navCtrl, navParams, 
        //private user: HomePage,
        login_service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.login_service = login_service;
        this.patient = navParams.data;
        if (this.patient.request_type == 'Consult') {
            this.patient.request_type_chn = "会诊";
        }
        else if (this.patient.request_type == 'CDO') {
            this.patient.request_type_chn = "协同";
        }
        if (this.patient.reportlist !== undefined && this.patient.reportlist !== null) {
            if (this.patient.reportlist.length == 1) {
                this.report = this.patient.reportlist[0];
            }
            else if (this.patient.reportlist.length == 2) {
                for (var n in this.patient.reportlist) {
                    if (this.patient.reportlist[n].auditing != '初始报告') {
                        this.report = this.patient.reportlist[n];
                        break;
                    }
                }
            }
        }
        if (this.report == undefined || this.report == null) {
            this.report = new __WEBPACK_IMPORTED_MODULE_3__Report_view_report__["a" /* Report */]();
        }
        this.report_content = "" + __WEBPACK_IMPORTED_MODULE_7__app_app_constants__["c" /* Patitentxml */]; //注意这种写法本质上是想做一个模板数值，然后copy一个值相同的变量。
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
    Report_writelist.prototype.Return = function () {
        this.navCtrl.pop();
    };
    Report_writelist.prototype.openimage = function (study) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__study_viewer_study_viewer__["a" /* StudyViewerPage */], { item: study.rr_study_uid });
    };
    Report_writelist.prototype.buildXml = function () {
        this.report_date = this.Format(new Date(), "yyyy-MM-dd hh:mm:ss");
        if (this.patient.dest_hospital_name !== undefined
            && this.patient.dest_hospital_name !== null) {
            this.report_content = this.report_content
                .replace("<patient_hospital_value></patient_hospital_value>", "<patient_hospital_value>"
                + this.patient.dest_hospital_name
                + "</patient_hospital_value>");
        }
        if (this.patient.pat_id !== undefined
            && this.patient.pat_id !== null) {
            this.report_content = this.report_content
                .replace("<patient_pid_value></patient_pid_value>", "<patient_pid_value>"
                + this.patient.pat_id
                + "</patient_pid_value>");
        }
        if (this.patient.pat_name !== undefined
            && this.patient.pat_name !== null) {
            this.report_content = this.report_content
                .replace("<patient_name_value></patient_name_value>", "<patient_name_value>"
                + this.patient.pat_name
                + "</patient_name_value>");
        }
        if (this.patient.pat_sex !== undefined
            && this.patient.pat_sex !== null) {
            this.report_content = this.report_content
                .replace("<patient_sex_value></patient_sex_value>", "<patient_sex_value>"
                + this.patient.pat_sex
                + "</patient_sex_value>");
        }
        if (this.patient.pat_birth_str !== undefined
            && this.patient.pat_birth_str !== null) {
            this.report_content = this.report_content
                .replace("<patient_birthday_date></patient_birthday_date>", "<patient_birthday_date>"
                + this.patient.pat_birth_str
                + "</patient_birthday_date>");
        }
        if (this.patient.pat_age !== undefined
            && this.patient.pat_age !== null) {
            this.report_content = this.report_content
                .replace("<age_value></age_value>", "<age_value>"
                + this.patient.pat_age
                + "</age_value>");
        }
        if (this.patient.reqou_name !== undefined
            && this.patient.reqou_name !== null) {
            this.report_content = this.report_content
                .replace("<dept_no_value></dept_no_value>", "<dept_no_value>"
                + this.patient.reqou_name
                + "</dept_no_value>");
        }
        if (this.patient.clinical_symptoms !== undefined
            && this.patient.clinical_symptoms !== null) {
            this.report_content = this.report_content
                .replace("<symptom_value></symptom_value>", "<symptom_value>"
                + this.patient.clinical_symptoms
                + "</symptom_value>");
        }
        if (this.patient.clinical_diagnosis !== undefined
            && this.patient.clinical_diagnosis !== null) {
            this.report_content = this.report_content
                .replace("<diagnoses_value></diagnoses_value>", "<diagnoses_value>"
                + this.patient.clinical_diagnosis
                + "</diagnoses_value>");
        }
        if (this.patient.bodypart !== undefined
            && this.patient.bodypart !== null) {
            this.report_content = this.report_content
                .replace("<check_part_value></check_part_value>", "<check_part_value>"
                + this.patient.bodypart
                + "</check_part_value>");
        }
        if (this.patient.image_symptoms !== undefined
            && this.patient.image_symptoms !== null) {
            this.report.report_content = this.report.report_content
                .replace("<report_content_value></report_content_value>", "<report_content_value>"
                + this.patient.image_symptoms
                + "</report_content_value>");
        }
        if (this.patient.image_diagnosis !== undefined
            && this.patient.image_diagnosis !== null) {
            this.report.report_content = this.report.report_content
                .replace("<report_conclusion_value></report_conclusion_value>", "<report_conclusion_value>"
                + this.patient.image_diagnosis
                + "</report_conclusion_value>");
        }
        if (this.patient.reqdoc_name !== undefined
            && this.patient.reqdoc_name !== null) {
            this.report_content = this.report_content
                .replace("<exam_doctor_value></exam_doctor_value>", "<exam_doctor_value>"
                + this.patient.reqdoc_name
                + "</exam_doctor_value>");
        }
        if (localStorage.getItem("displayname") !== null) {
            this.report_content = this.report_content
                .replace("<report_doctor_value></report_doctor_value>", "<report_doctor_value>"
                + localStorage.getItem("displayname")
                + "</report_doctor_value>");
        }
        if (this.report_date !== undefined
            && this.report_date !== null) {
            this.report_content = this.report_content
                .replace("<report_date_value></report_date_value>", "<report_date_value>"
                + this.report_date
                + "</report_date_value>");
        }
        if (this.patient.request_type == 'Consult') {
            this.report.auditing = "Y";
        }
        else if (this.patient.request_type == 'CDO') {
            this.report.auditing = "C";
        }
        this.reportvalue = {
            auditing: this.report.auditing,
            auditor_name: localStorage.getItem("displayname"),
            auditor_no: localStorage.getItem("userno"),
            conclusion: this.report.conclusion,
            content: this.report.content,
            hospital_id: this.patient.dest_hospital_id,
            report_content: this.report_content,
            report_date: this.report_date,
            request_no: this.patient.request_no
        };
        this.requestvalue = {
            request_no: this.patient.request_no
        };
    };
    Report_writelist.prototype.Submit = function () {
        var _this = this;
        this.buildXml();
        console.log(this.reportvalue);
        console.log(this.requestvalue);
        this.login_service.save(this.reportvalue) //这里先对回应的状态进行打印
            .subscribe(function (res) {
            if (String(res.status) == "Success") {
                _this.login_service.submit(_this.requestvalue)
                    .subscribe(function (res) {
                    if (String(res.status) == "Success") {
                        if (_this.patient.request_type == 'Consult') {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__Consultationlist_Consultationlist__["a" /* Consultation_listPage */]);
                        }
                        else if (_this.patient.request_type == 'CDO') {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__Collaborativelist_Collaborativelist__["a" /* Collaborative_listPage */]);
                        }
                    }
                    else if (String(res.status) == "Failure") {
                        _this.onError(res.errorCode);
                    }
                }, function (error) { return _this.errorMessage = error; });
            }
            else if (String(res.status) == "Logged_out") {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }
            else if (String(res.status) == "Failure") {
                _this.onError(res.errorCode);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    Report_writelist.prototype.onError = function (message) {
        var message = '没有更多病人信息！';
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    Report_writelist.prototype.Format = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return Report_writelist;
}());
Report_writelist = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Report_write',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\Report_write\Report_write.html"*/'<ion-content>\n\n  <ion-card>\n    <ion-card-header>\n      病人信息\n    </ion-card-header>\n\n    <ion-list>\n      <ion-row>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="briefcase" item-start></ion-icon>\n            请求医院：{{patient.source_hospital_name}}\n          </button>\n        </ion-col>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="briefcase" item-start></ion-icon>\n            {{patient.request_type_chn}}医院：{{patient.dest_hospital_name}}\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="body" item-start></ion-icon>\n            病人性别：{{patient.pat_sex}}\n          </button>\n        </ion-col>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="contacts" item-start></ion-icon>\n            病人生日：{{patient.pat_birth_str}}\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="ribbon" item-start></ion-icon>\n            优先级：{{patient.priority_str}}\n          </button>\n        </ion-col>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="star" item-start></ion-icon>\n            图像状态：{{patient.dicom_ready}}\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <button ion-item>\n        <ion-icon name="checkbox" item-start></ion-icon>\n        {{patient.request_type_chn}}状态：{{patient.consult_state}}\n      </button>\n    </ion-list>\n  </ion-card>\n\n    <label>影像学表现 </label>\n  <ion-textarea style="border: 5px solid #8c8c8c;"  rows="5" cols="20" placeholder="报告内容" [(ngModel)]="report.content"></ion-textarea>\n    <label>影像学诊断</label>\n    <ion-textarea style="border: 5px solid #8c8c8c;"  rows="5" cols="20" placeholder="报告内容" [(ngModel)]="report.conclusion"></ion-textarea>\n	\n	<ion-card *ngFor="let study of patient.studylist" (click)="openimage(study)">\n        <ion-card-header>\n          图像信息\n        </ion-card-header>\n\n        <ion-list>\n          <ion-row>\n          <ion-col width-50>\n          <button ion-item>\n            检查日期：{{study.study_date_str}}\n          </button>\n          </ion-col>\n            <ion-col width-50>\n              <button ion-item>\n                检查设备：{{study.modality_concat}}\n              </button>\n            </ion-col>\n            </ion-row>\n\n\n          <ion-row>\n            <ion-col width-50>\n              <button ion-item>\n                检查部位：{{study.study_description}}\n          </button>\n        </ion-col>\n            <ion-col width-50>\n          <button ion-item>\n            系列数：{{study.number_of_series}}\n          </button>\n            </ion-col>\n          </ion-row>\n        </ion-list>\n      </ion-card>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button full (click)="Submit()">提交</button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <button ion-button full (click)="Return()">返回</button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\Report_write\Report_write.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__service_login_service__["a" /* LoginService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_login_service__["a" /* LoginService */]) === "function" && _c || Object])
], Report_writelist);

var _a, _b, _c;
//通信问题：注入依赖时存在错误。
//时间格式问题，无法达到post所要求的时间格式
//# sourceMappingURL=Report_write.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Collaborative_listPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_login_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Report_write_Report_write__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Report_view_Report_view__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Collaborative_listPage = (function () {
    function Collaborative_listPage(navCtrl, alertCtrl, login_service, toastCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.login_service = login_service;
        this.toastCtrl = toastCtrl;
        this.patient_list = [];
        this.search_continue = true;
        this.page = 1; //设置查询的页数
        this.consult_state = "";
        this.request_date_start = "";
        this.request_date_end = "";
        this.request_type = "CDO";
        this.totalRecord = 0;
        this.search();
    } //小弹窗
    Collaborative_listPage.prototype.clear = function () {
        this.consult_state = "";
        this.request_date_start = "";
        this.request_date_end = "";
    };
    Collaborative_listPage.prototype.Scrollserch = function () {
        var _this = this;
        this.login_service.query(this.request_type, String(this.page), this.consult_state, this.request_date_start, this.request_date_end) //这里先对回应的状态进行打印
            .subscribe(function (res) {
            if (String(res['status']) == 'Success') {
                for (var n in res["requestList"]) {
                    _this.patient_list.push(res["requestList"][n]);
                }
                ;
                console.log(_this.patient_list);
                _this.totalRecord = res["totalRecord"];
            }
            else if (String(res['status']) == 'Logged_out') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    Collaborative_listPage.prototype.search = function () {
        var _this = this;
        this.patient_list = []; //每次调用search方法的时候需要初始化；
        this.page = 1;
        this.search_continue = true;
        this.login_service.query(this.request_type, String(this.page), this.consult_state, this.request_date_start, this.request_date_end) //这里先对回应的状态进行打印
            .subscribe(function (res) {
            if (String(res['status']) == 'Success') {
                for (var n in res["requestList"]) {
                    _this.patient_list.push(res["requestList"][n]);
                }
                ;
                console.log(_this.patient_list);
                _this.totalRecord = res["totalRecord"];
            }
            else if (String(res['status']) == 'Logged_out') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    Collaborative_listPage.prototype.init = function (patient) {
        if (patient["priority_str"] == "加急") {
            this.mycolor = "danger";
        }
        else {
            this.mycolor = "danger";
        }
    };
    Collaborative_listPage.prototype.view = function (patient) {
        if (patient['dicom_ready'] == '传输中') {
            this.onError('图像尚未到达，不能开始协同！');
            return;
        }
        patient['request_type'] = this.request_type;
        if (patient["consult_state"] == "终审") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__Report_view_Report_view__["a" /* Report_viewlist */], patient);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__Report_write_Report_write__["a" /* Report_writelist */], patient);
        }
        console.log("还没有做完呢┬─┬ ノ( ' - 'ノ)");
    };
    Collaborative_listPage.prototype.onError = function (text) {
        var message = text;
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    };
    Collaborative_listPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            if (_this.search_continue) {
                _this.page++;
                _this.Scrollserch();
            }
            if (_this.totalRecord == _this.patient_list.length) {
                _this.search_continue = false;
                _this.onError('没有更多病人信息！');
            }
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    };
    return Collaborative_listPage;
}());
Collaborative_listPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Collaborativelist',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\Collaborativelist\Collaborativelist.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n		<span style="color:#939393">协同列表</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n        <ion-item style="width:100%;display:inline-block">\n      <ion-label floating>协同状态</ion-label>\n          <ion-select [(ngModel)]="consult_state">\n            <ion-option>待写</ion-option>\n            <ion-option>待审</ion-option>\n            <ion-option>终审</ion-option>\n          </ion-select>\n        </ion-item>\n    </ion-row>\n\n    <ion-row>\n      <ion-item style="width:100%;float:left">\n      <ion-label floating>协同开始时间</ion-label>\n          <!--<span item-left  style="min-height: 25px;"></span>-->\n          <ion-datetime pickerFormat="YYYY MM DD" displayFormat="YYYY-MM-DD" [(ngModel)]="request_date_start" max="2020-10-31" min="2000-01-01" cancelText="取消" doneText="确认"></ion-datetime>\n        </ion-item>\n      </ion-row>\n      <ion-row>\n        <ion-item style="width:100%;float:left">\n          <ion-label floating>协同结束时间</ion-label>\n          <!--<span item-left  style="min-height: 25px;"></span>-->\n          <ion-datetime pickerFormat="YYYY MM DD" displayFormat="YYYY-MM-DD" [(ngModel)]="request_date_end" max="2020-10-31" min="2000-01-01" cancelText="取消" doneText="确认"></ion-datetime>\n        </ion-item>\n\n    </ion-row>\n	<ion-row>\n      <ion-col style="width:50%">\n        <button ion-button full (click)="clear()">清除</button>\n      </ion-col>\n	  <ion-col style="width:50%">\n        <button ion-button full (click)="search()">搜索</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n      <ion-card *ngFor="let patient of patient_list" (click)="view(patient)">\n        <!--<ion-card-header>-->\n          <!--病人信息-->\n        <!--</ion-card-header>-->\n\n        <ion-list>\n          <!--图像传输状态不同显示不同内容 -->\n          <div *ngIf="patient.dicom_ready==\'传输中\'">\n          <ion-row>\n          <ion-col>\n          <button ion-item>\n            <ion-icon name="briefcase" item-start></ion-icon>\n            请求医院：{{patient.source_hospital_name}}\n          </button>\n          </ion-col>\n            </ion-row>\n            </div>\n\n          <div *ngIf="patient.dicom_ready==\'已到达数据中心\'">\n            <ion-row>\n              <ion-col>\n                <button ion-item>\n                  <ion-icon name="briefcase" item-start color="secondary"></ion-icon>\n                  请求医院：{{patient.source_hospital_name}}\n                </button>\n              </ion-col>\n            </ion-row>\n          </div>\n\n          <div *ngIf="patient.dicom_ready==\'已到达诊断中心\'">\n            <ion-row>\n              <ion-col>\n                <button ion-item>\n                  <ion-icon name="briefcase" item-start color="secondary"></ion-icon>\n                  请求医院：{{patient.source_hospital_name}}\n                </button>\n              </ion-col>\n            </ion-row>\n          </div>\n\n          <!--优先级为普通状态下显示内容 -->\n          <div  *ngIf="patient.priority_str==\'普通\'">\n          <ion-row>\n            <ion-col>\n          <button ion-item>\n                <ion-icon name="body" item-start></ion-icon>\n            病人信息：{{patient.pat_sex}}            {{patient.pat_birth_str}}\n          </button>\n            </ion-col>\n          </ion-row>\n          </div>\n\n          <!--优先级为加急状态下显示内容 -->\n          <div  *ngIf="patient.priority_str==\'加急\'">\n            <ion-row>\n              <ion-col>\n                <button ion-item>\n                  <ion-icon name="body" item-start color="danger"></ion-icon>\n                  病人信息：{{patient.pat_sex}}            {{patient.pat_birth_str}}\n                </button>\n              </ion-col>\n            </ion-row>\n          </div>\n\n          <ion-row>\n            <ion-col>\n              <button ion-item>\n                <ion-icon name="checkbox" item-start></ion-icon>\n                协同描述：{{patient.description}}\n              </button>\n        </ion-col>\n          </ion-row>\n        </ion-list>\n      </ion-card>\n\n\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\Collaborativelist\Collaborativelist.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__service_login_service__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
], Collaborative_listPage);

//# sourceMappingURL=Collaborativelist.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Report_viewlist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_login_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__report__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__study_viewer_study_viewer__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Report_viewlist = (function () {
    function Report_viewlist(navCtrl, navParams, login_service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.login_service = login_service;
        this.patient = navParams.data;
        console.log(this.patient);
        if (this.patient.request_type == 'Consult') {
            this.patient.request_type_chn = "会诊";
        }
        else if (this.patient.request_type == 'CDO') {
            this.patient.request_type_chn = "协同";
        }
        if (this.patient.reportlist !== undefined && this.patient.reportlist !== null) {
            if (this.patient.reportlist.length == 1) {
                this.report = this.patient.reportlist[0];
            }
            else if (this.patient.reportlist.length == 2) {
                for (var n in this.patient.reportlist) {
                    if (this.patient.reportlist[n].auditing != '初始报告') {
                        this.report = this.patient.reportlist[n];
                        break;
                    }
                }
            }
        }
        if (this.report == undefined || this.report == null) {
            this.report = new __WEBPACK_IMPORTED_MODULE_3__report__["a" /* Report */]();
        }
    }
    Report_viewlist.prototype.Return = function () {
        this.navCtrl.pop();
    };
    Report_viewlist.prototype.openimage = function (study) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__study_viewer_study_viewer__["a" /* StudyViewerPage */], { item: study.rr_study_uid });
    };
    return Report_viewlist;
}());
Report_viewlist = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Report_view',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\Report_view\Report_view.html"*/'<ion-content>\n  <ion-card>\n    <ion-card-header>\n      病人信息\n    </ion-card-header>\n\n    <ion-list>\n      <ion-row>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="briefcase" item-start></ion-icon>\n            请求医院：{{patient.source_hospital_name}}\n          </button>\n        </ion-col>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="briefcase" item-start></ion-icon>\n            {{patient.request_type_chn}}医院：{{patient.dest_hospital_name}}\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="body" item-start></ion-icon>\n            病人性别：{{patient.pat_sex}}\n          </button>\n        </ion-col>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="contacts" item-start></ion-icon>\n            病人生日：{{patient.pat_birth_str}}\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="ribbon" item-start></ion-icon>\n            优先级：{{patient.priority_str}}\n          </button>\n        </ion-col>\n        <ion-col width-50>\n          <button ion-item>\n            <ion-icon name="star" item-start></ion-icon>\n            图像状态：{{patient.dicom_ready}}\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <button ion-item>\n        <ion-icon name="checkbox" item-start></ion-icon>\n        {{patient.request_type_chn}}状态：{{patient.consult_state}}\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <label>影像学表现 </label>\n  <ion-textarea style="border: 5px solid #8c8c8c;"  rows="5" cols="20" value={{report.content}} disabled="true" ></ion-textarea>\n  <label>影像学诊断</label>\n  <ion-textarea style="border: 5px solid #8c8c8c;"  rows="5" cols="20" value={{report.conclusion}} disabled="true"></ion-textarea>\n\n  <ion-card *ngFor="let study of patient.studylist" (click)="openimage(study)">\n        <ion-card-header>\n          图像信息\n        </ion-card-header>\n\n        <ion-list>\n          <ion-row>\n          <ion-col width-50>\n          <button ion-item>\n            检查日期：{{study.study_date_str}}\n          </button>\n          </ion-col>\n            <ion-col width-50>\n              <button ion-item>\n                检查设备：{{study.modality_concat}}\n              </button>\n            </ion-col>\n            </ion-row>\n\n\n          <ion-row>\n            <ion-col width-50>\n              <button ion-item>\n                检查部位：{{study.study_description}}\n          </button>\n        </ion-col>\n            <ion-col width-50>\n          <button ion-item>\n            系列数：{{study.number_of_series}}\n          </button>\n            </ion-col>\n          </ion-row>\n        </ion-list>\n      </ion-card>\n	  \n<ion-row>\n  <ion-col>\n    <button ion-button full (click)="Return()">返回</button>\n  </ion-col>\n</ion-row>\n  </ion-content>\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\Report_view\Report_view.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_login_service__["a" /* LoginService */]])
], Report_viewlist);

//# sourceMappingURL=Report_view.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudyViewerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_ImageViewer__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_constants__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popovers_relayout_viewer_relayout_viewer__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__popovers_preset_viewer_preset_viewer__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__popovers_measure_viewer_measure_viewer__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__popovers_roi_viewer_roi_viewer__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__popovers_orient_viewer_orient_viewer__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*
 Generated class for the CaseDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var StudyViewerPage = (function () {
    function StudyViewerPage(navCtrl, navParams, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.studyUID = navParams.data.item;
        this.tabBarElement = document.querySelector('.tabbar');
    }
    StudyViewerPage.prototype.ionViewWillEnter = function () {
        this.tabBarElement.style.display = 'none';
    };
    StudyViewerPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
        if (this.imageViewer) {
            this.imageViewer.clear();
        }
    };
    StudyViewerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad StudyViewerPage');
        //to call the DICOM Viewer
        // var mr1 = cornerstone.enable(document.getElementById('mr1'));
        var dicomViewerElement = this._dicomViewer.nativeElement;
        console.log('Get the dicom Viewer Element to display the study');
        var axvsurl = __WEBPACK_IMPORTED_MODULE_3__app_app_constants__["a" /* AXVS_SERVER_ADDRESS */];
        if (localStorage.getItem("axvsurl") != null) {
            axvsurl = localStorage.getItem("axvsurl");
        }
        this.imageViewer = new __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_ImageViewer__["a" /* ImageViewer */](dicomViewerElement, this.studyUID, 'status', axvsurl, 'doctor', 'doctor');
        this.imageViewer.display();
        window.addEventListener('resize', function () {
            console.log('resize the image viewer');
            _this.imageViewer.resize();
        }, false);
    };
    //reset the study viewer
    StudyViewerPage.prototype.reset = function () {
        this.imageViewer.reset();
    };
    //pop up the relayout page
    StudyViewerPage.prototype.presentReLayoutPopover = function (ev) {
        this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__popovers_relayout_viewer_relayout_viewer__["a" /* ReLayoutPopoverPage */], { imageViewer: this.imageViewer, studyViewer: this });
        this.popover.present({
            ev: ev
        });
    };
    //pop up the preset page
    StudyViewerPage.prototype.presentPresetPopover = function (ev) {
        this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__popovers_preset_viewer_preset_viewer__["a" /* PresetPopoverPage */], { imageViewer: this.imageViewer, studyViewer: this });
        this.popover.present({
            ev: ev
        });
    };
    //pop up the tool page
    StudyViewerPage.prototype.presentMeasurePopover = function (ev) {
        this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__popovers_measure_viewer_measure_viewer__["a" /* MeasurePopoverPage */], { imageViewer: this.imageViewer, studyViewer: this });
        this.popover.present({
            ev: ev
        });
    };
    StudyViewerPage.prototype.presentOrientPopover = function (ev) {
        this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__popovers_orient_viewer_orient_viewer__["a" /* OrientPopoverPage */], { imageViewer: this.imageViewer, studyViewer: this });
        this.popover.present({
            ev: ev
        });
    };
    //pop up the roi page
    StudyViewerPage.prototype.presentRoiPopover = function (ev) {
        this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__popovers_roi_viewer_roi_viewer__["a" /* RoiPopoverPage */], { imageViewer: this.imageViewer, studyViewer: this });
        this.popover.present({
            ev: ev
        });
    };
    StudyViewerPage.prototype.dismiss = function () {
        if (this.popover) {
            this.popover.dismiss();
            this.popover = null;
        }
    };
    return StudyViewerPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('dicomViewer'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], StudyViewerPage.prototype, "_dicomViewer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('popoverContent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], StudyViewerPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('popoverText', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], StudyViewerPage.prototype, "text", void 0);
StudyViewerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-study-viewer',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\study-viewer\study-viewer.html"*/'<!--\n\n  Generated template for the CaseDetail page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar class="navbar">\n\n        <ion-row>\n\n          <ion-col width="20%">\n\n            <img src="assets/img/icon_layout_off.png" name="images" class="newCaseIcon" (click)="presentReLayoutPopover($event)"/>\n\n          </ion-col>\n\n          <ion-col width="20%">\n\n            <img src="assets/img/icon_tabbar_roi_off.png" name="images" class="newCaseIcon" (click)="presentRoiPopover($event)"/>\n\n          </ion-col>\n\n          <ion-col width="20%">\n\n            <img src="assets/img/icon_tabbar_measure_off.png" name="images" class="newCaseIcon" (click)="presentMeasurePopover($event)"/>\n\n          </ion-col>\n\n          <ion-col width="20%">\n\n            <img src="assets/img/icon_tabbar_orient_off.png" name="images" class="newCaseIcon" (click)="presentOrientPopover($event)"/>\n\n          </ion-col>\n\n          <ion-col width="20%">\n\n            <img src="assets/img/icon_tabbar_preset_off.png" name="images" class="newCaseIcon" (click)="presentPresetPopover($event)"/>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<div #dicomViewer style="width:100%;height:100%;display:inline-block;padding-top:56px"\n\n     oncontextmenu="return false"\n\n     unselectable=\'on\'\n\n     onselectstart=\'return false;\'\n\n     onmousedown=\'return false;\'>\n\n</div>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\study-viewer\study-viewer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* PopoverController */]])
], StudyViewerPage);

//# sourceMappingURL=study-viewer.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CGSize; });
/**
 * Created by binsirMac on 2016-12-26.
 */
var CGSize = (function () {
    function CGSize(width, height) {
        this.width = width;
        this.height = height;
    }
    return CGSize;
}());

//# sourceMappingURL=CGSize.js.map

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 169;

/***/ }),

/***/ 212:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 212;

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Consultationlist_Consultationlist__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Collaborativelist_Collaborativelist__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//tabs的主要跳转界面在这里配置



var ListPage = (function () {
    function ListPage() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__Consultationlist_Consultationlist__["a" /* Consultation_listPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__Collaborativelist_Collaborativelist__["a" /* Collaborative_listPage */];
    }
    return ListPage;
}());
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\list\list.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="会诊列表" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="协同列表" tabIcon="heart"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\list\list.html"*/
    }),
    __metadata("design:paramtypes", [])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Report; });
var Report = (function () {
    function Report() {
    }
    return Report;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperationScope; });
/**
 * Created by kai on 22/10/2017.
 */
/**
 * Created by kai on 22/10/2017.
 */ var OperationScope;
(function (OperationScope) {
    OperationScope[OperationScope["StudyScope"] = 0] = "StudyScope";
    OperationScope[OperationScope["SeriesScope"] = 1] = "SeriesScope";
    OperationScope[OperationScope["ImageScope"] = 2] = "ImageScope";
})(OperationScope || (OperationScope = {}));
//# sourceMappingURL=OperationScope.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UIImageOrientation; });
/**
 * Created by binsirMac on 2017-01-05.
 */
/**
 * Created by binsirMac on 2017-01-05.
 */ var UIImageOrientation;
(function (UIImageOrientation) {
    UIImageOrientation[UIImageOrientation["UIImageOrientationUp"] = 0] = "UIImageOrientationUp";
    UIImageOrientation[UIImageOrientation["UIImageOrientationDown"] = 1] = "UIImageOrientationDown";
    UIImageOrientation[UIImageOrientation["UIImageOrientationLeft"] = 2] = "UIImageOrientationLeft";
    UIImageOrientation[UIImageOrientation["UIImageOrientationRight"] = 3] = "UIImageOrientationRight";
    UIImageOrientation[UIImageOrientation["UIImageOrientationUpMirrored"] = 4] = "UIImageOrientationUpMirrored";
    UIImageOrientation[UIImageOrientation["UIImageOrientationDownMirrored"] = 5] = "UIImageOrientationDownMirrored";
    UIImageOrientation[UIImageOrientation["UIImageOrientationLeftMirrored"] = 6] = "UIImageOrientationLeftMirrored";
    UIImageOrientation[UIImageOrientation["UIImageOrientationRightMirrored"] = 7] = "UIImageOrientationRightMirrored";
})(UIImageOrientation || (UIImageOrientation = {}));
//# sourceMappingURL=UIImageOrientation.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logger */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngleRoiTool; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RoiUtil__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_typescript_logging__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_typescript_logging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_typescript_logging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AngleRoi__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_Aesthetics__ = __webpack_require__(94);




var factory = __WEBPACK_IMPORTED_MODULE_1_typescript_logging__["LFService"].createLoggerFactory();
var logger = factory.getLogger("AngleRoiTool");
/**
 * Created by kai on 16/10/2017.
 */
var AngleRoiTool = (function () {
    function AngleRoiTool() {
        this.drawing = false;
        this.trackingTouches = new Array();
    }
    AngleRoiTool.shareAngleRoiTool = function () {
        return AngleRoiTool.instance;
    };
    AngleRoiTool.prototype.removeAllPoint = function () {
        this.trackingTouches = new Array();
    };
    AngleRoiTool.prototype.isDrawing = function () {
        return this.drawing;
    };
    AngleRoiTool.prototype.clearRoiTool = function () {
        this.removeAllPoint();
    };
    AngleRoiTool.prototype.touchesBegan = function (touch, touchedTileView) {
        logger.info('begin to draw the angel');
        if (this.trackingTouches.length == 0) {
            this.drawing = true;
            // this.trackingTouches.push(touch);
        }
    };
    AngleRoiTool.prototype.touchesCancelled = function (touch, touchedTileView) {
    };
    AngleRoiTool.prototype.touchesMoved = function (touch, touchedTileView) {
    };
    AngleRoiTool.prototype.touchesEnded = function (touch, touchedTileView) {
        if (this.drawing) {
            this.trackingTouches.push(touch);
        }
        if (this.trackingTouches.length >= 3) {
            logger.info('draw the angel');
            var angelRoi = new __WEBPACK_IMPORTED_MODULE_2__AngleRoi__["a" /* AngleRoi */](this.trackingTouches[0], this.trackingTouches[1], this.trackingTouches[2]);
            touchedTileView.presentationImage.addRoi(angelRoi);
            this.drawing = false;
            this.removeAllPoint();
        }
    };
    AngleRoiTool.prototype.drawTemporaryIn = function (touchedTileView, context) {
        this.trackingTouches.forEach(function (point, idx, array) {
            __WEBPACK_IMPORTED_MODULE_0__RoiUtil__["a" /* RoiUtil */].drawVertiexAt(point, context);
        });
        if (this.trackingTouches.length > 0) {
            context.lineWidth = __WEBPACK_IMPORTED_MODULE_3__common_Aesthetics__["a" /* Aesthetics */].AxRoiSelectedLineWidth;
            var firstVertexPoint = this.trackingTouches[0];
            context.moveTo(firstVertexPoint.x, firstVertexPoint.y);
            if (this.trackingTouches.length > 1) {
                var secondVertexPoint = this.trackingTouches[1];
                context.lineTo(secondVertexPoint.x, secondVertexPoint.y);
                if (this.trackingTouches.length > 2) {
                    var thirdVertexPoint = this.trackingTouches[2];
                    context.lineTo(thirdVertexPoint.x, thirdVertexPoint.y);
                }
            }
            context.stroke();
        }
    };
    return AngleRoiTool;
}());

AngleRoiTool.instance = new AngleRoiTool();
//# sourceMappingURL=AngleRoiTool.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReLayoutPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_Config__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReLayoutPopoverPage = (function () {
    function ReLayoutPopoverPage(navParams) {
        this.navParams = navParams;
        this.seriesList = new Array();
        this.imageViewer = this.navParams.data.imageViewer;
        this.studyViewer = this.navParams.data.studyViewer;
        if (this.imageViewer && this.imageViewer.displayedStudy) {
            for (var _i = 0, _a = this.imageViewer.displayedStudy.series; _i < _a.length; _i++) {
                var series = _a[_i];
                this.seriesList.push({
                    "study": this.imageViewer.displayedStudy, "series": series,
                    "seriesDescription": series.seriesDescription,
                    "modality": series.modality, "seriesNumber": series.seriesNumber, "numberOfImages": series.numberOfImages,
                    "thumbnail": __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_Config__["a" /* Config */].AXVS_ADDRESS + "/services/thumbnail?studyUID=" + this.imageViewer.displayedStudy.studyUID + "&seriesUID=" + series.seriesUID + "&objectUID=" + series.image[0].imageUID + "&access_token=" + __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_Config__["a" /* Config */].AXVS_ACCESS_TOKEN
                });
            }
        }
    }
    return ReLayoutPopoverPage;
}());
ReLayoutPopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-relayout-viewer',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\relayout-viewer\relayout-viewer.html"*/'<ion-list class="popover-page">\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_layout_1_1_off.png" (click)="imageViewer.reLayout(1, 1);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_layout_2_1_off.png" (click)="imageViewer.reLayout(1, 2);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_layout_1_2_off.png"  (click)="imageViewer.reLayout(2, 1);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_layout_2_2_off.png" (click)="imageViewer.reLayout(2, 2);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <br/>\n\n\n\n\n\n  <ion-card *ngFor="let series of seriesList"\n\n            (click)="imageViewer.selectSeries2Show(series.study,series.series);studyViewer.dismiss();">\n\n\n\n    <ion-item>\n\n      <ion-avatar item-left>\n\n        <img src="{{series.thumbnail}}">\n\n      </ion-avatar>\n\n      <p>{{series.seriesDescription}}</p>\n\n      <p>{{series.modality}}</p>\n\n    </ion-item>\n\n  </ion-card>\n\n</ion-list>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\relayout-viewer\relayout-viewer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], ReLayoutPopoverPage);

//# sourceMappingURL=relayout-viewer.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PresetPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PresetPopoverPage = (function () {
    function PresetPopoverPage(navParams) {
        this.navParams = navParams;
        this.imageViewer = this.navParams.data.imageViewer;
        this.studyViewer = this.navParams.data.studyViewer;
    }
    PresetPopoverPage.prototype.preset = function (presetType) {
        if (this.imageViewer) {
            var modality = this.imageViewer.selectedImageBoxView.currentDisplayedSeries.modality;
            switch (presetType) {
                case 1:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(620, 445);
                            break;
                        case 'CT':
                            this.imageViewer.preset(56, 342);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(135, 240);
                            break;
                    }
                    break;
                case 2:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(436, 628);
                            break;
                        case 'CT':
                            this.imageViewer.preset(-498, 1465);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(508, 1450);
                            break;
                    }
                    break;
                case 3:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(776, 515);
                            break;
                        case 'CT':
                            this.imageViewer.preset(93, 109);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(625, 1410);
                            break;
                    }
                    break;
                case 4:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(783, 735);
                            break;
                        case 'CT':
                            this.imageViewer.preset(570, 3077);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(519, 775);
                            break;
                    }
                    break;
                case 5:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(602, 489);
                            break;
                        case 'CT':
                            this.imageViewer.preset(42, 155);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(500, 500);
                            break;
                    }
                    break;
                case 6:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(625, 646);
                            break;
                        case 'CT':
                            this.imageViewer.preset(111, 195);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(600, 600);
                            break;
                    }
                    break;
                case 7:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(108, 877);
                            break;
                        case 'CT':
                            this.imageViewer.preset(108, 877);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(108, 877);
                            break;
                    }
                    break;
                case 8:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(56, 342);
                            break;
                        case 'CT':
                            this.imageViewer.preset(56, 342);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(56, 342);
                            break;
                    }
                    break;
                case 9:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(455, 958);
                            break;
                        case 'CT':
                            this.imageViewer.preset(455, 958);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(455, 958);
                            break;
                    }
                    break;
                case 10:
                    //icon_preset_abdomen_off
                    switch (modality) {
                        case 'CR':
                        case 'DX':
                        case 'MG':
                            this.imageViewer.preset(747, 727);
                            break;
                        case 'CT':
                            this.imageViewer.preset(747, 727);
                            break;
                        case 'MR':
                        case 'RF':
                        case 'US':
                        case 'XA':
                            this.imageViewer.preset(747, 727);
                            break;
                    }
                    break;
            }
        }
        this.studyViewer.dismiss();
    };
    return PresetPopoverPage;
}());
PresetPopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-preset-viewer',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\preset-viewer\preset-viewer.html"*/'<ion-list class="popover-page">\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_abdomen_off@2x.png" (click)="preset(1)"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_shoulder_off@2x.png" (click)="preset(2)"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_bone_off@2x.png"  (click)="preset(3)"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_brain_off@2x.png" (click)="preset(4)"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_c_spine_off@2x.png"  (click)="preset(5)"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_chest_adbomen_off@2x.png" (click)="preset(6)"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_chest_off@2x.png"  (click)="preset(7)"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_echo_t2_off@2x.png" (click)="preset(8)"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_extremity_off@2x.png"  (click)="preset(9)"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_preset_femur_off@2x.png" (click)="preset(10)"/>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-list>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\preset-viewer\preset-viewer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], PresetPopoverPage);

//# sourceMappingURL=preset-viewer.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeasurePopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_roi_RoiUtil__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_image_viewer_roi_AngleRoiTool__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_image_viewer_Config__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_image_viewer_common_ImageOperatingType__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_image_viewer_common_EventDispatcher__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_image_viewer_roi_LinearRoiTool__ = __webpack_require__(643);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MeasurePopoverPage = (function () {
    function MeasurePopoverPage(navParams) {
        this.navParams = navParams;
        this.imageViewer = this.navParams.data.imageViewer;
        this.studyViewer = this.navParams.data.studyViewer;
    }
    MeasurePopoverPage.prototype.onClickPointMeasureButton = function () {
    };
    MeasurePopoverPage.prototype.onClickElipseMeasureButton = function () {
    };
    MeasurePopoverPage.prototype.onClickRectangleMeasureButton = function () {
    };
    MeasurePopoverPage.prototype.onClickAngleMeasureButton = function () {
        __WEBPACK_IMPORTED_MODULE_4__components_image_viewer_Config__["a" /* Config */].imageOperatingType = __WEBPACK_IMPORTED_MODULE_5__components_image_viewer_common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure;
        __WEBPACK_IMPORTED_MODULE_6__components_image_viewer_common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_6__components_image_viewer_common_EventDispatcher__["b" /* EventTypes */].ChangeOperatingType, this, 'Get the change');
        __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_roi_RoiUtil__["a" /* RoiUtil */].setCurrentRoiTool(__WEBPACK_IMPORTED_MODULE_3__components_image_viewer_roi_AngleRoiTool__["a" /* AngleRoiTool */].shareAngleRoiTool());
    };
    MeasurePopoverPage.prototype.onClickLineMeasureButton = function () {
        __WEBPACK_IMPORTED_MODULE_4__components_image_viewer_Config__["a" /* Config */].imageOperatingType = __WEBPACK_IMPORTED_MODULE_5__components_image_viewer_common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure;
        __WEBPACK_IMPORTED_MODULE_6__components_image_viewer_common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_6__components_image_viewer_common_EventDispatcher__["b" /* EventTypes */].ChangeOperatingType, this, 'Get the change');
        __WEBPACK_IMPORTED_MODULE_2__components_image_viewer_roi_RoiUtil__["a" /* RoiUtil */].setCurrentRoiTool(__WEBPACK_IMPORTED_MODULE_7__components_image_viewer_roi_LinearRoiTool__["a" /* LinearRoiTool */].shareLinearRoiTool());
    };
    return MeasurePopoverPage;
}());
MeasurePopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-measure-viewer',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\measure-viewer\measure-viewer.html"*/'<ion-list class="popover-page">\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_measure_angle_off.png" (click)="onClickAngleMeasureButton();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_measure_elipse_off.png" (click)="onClickElipseMeasureButton();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_measure_line_off.png"  (click)="onClickLineMeasureButton();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_measure_point_off.png" (click)="onClickPointMeasureButton();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_measure_rectangle_off.png"  (click)="onClickRectangleMeasureButton();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-list>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\measure-viewer\measure-viewer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], MeasurePopoverPage);

//# sourceMappingURL=measure-viewer.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoiPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RoiPopoverPage = (function () {
    function RoiPopoverPage(navParams) {
        this.navParams = navParams;
        this.imageViewer = this.navParams.data.imageViewer;
        this.studyViewer = this.navParams.data.studyViewer;
    }
    return RoiPopoverPage;
}());
RoiPopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-roi-viewer',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\roi-viewer\roi-viewer.html"*/'<ion-list class="popover-page">\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_tabbar_zoom_off.png" (click)="imageViewer.doZoom();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_tabbar_roi_off.png" (click)="imageViewer.doROI();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_tabbar_wl_off.png"  (click)="imageViewer.doWL();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_tabbar_reset_off.png"  (click)="imageViewer.reset();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-list>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\roi-viewer\roi-viewer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], RoiPopoverPage);

//# sourceMappingURL=roi-viewer.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrientPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrientPopoverPage = (function () {
    function OrientPopoverPage(navParams) {
        this.navParams = navParams;
        this.imageViewer = this.navParams.data.imageViewer;
        this.studyViewer = this.navParams.data.studyViewer;
    }
    return OrientPopoverPage;
}());
OrientPopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-orient-viewer',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\orient-viewer\orient-viewer.html"*/'<ion-list class="popover-page">\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_orient_flip_horiz_off.png" (click)="imageViewer.rotate(90);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_orient_flip_vert_off.png" (click)="imageViewer.rotate(180);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_orient_rotate_left_off.png"  (click)="imageViewer.rotate(270);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n    <ion-col>\n\n      <img src="assets/img/icon_orient_rotate_right_off.png" (click)="imageViewer.rotate(-90);studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-list>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\orient-viewer\orient-viewer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], OrientPopoverPage);

//# sourceMappingURL=orient-viewer.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_constants__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsPage = (function () {
    function SettingsPage(navCtrl, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.config = {
            domainrisurl: '',
            axvsurl: ''
        };
        console.log(__WEBPACK_IMPORTED_MODULE_3__app_app_constants__["b" /* DOMAINRIS_SERVER_ADDRESS */]);
        if (localStorage.getItem("domainrisurl") == null) {
            this.config.domainrisurl = __WEBPACK_IMPORTED_MODULE_3__app_app_constants__["b" /* DOMAINRIS_SERVER_ADDRESS */];
        }
        else {
            this.config.domainrisurl = localStorage.getItem("domainrisurl");
        }
        if (localStorage.getItem("axvsurl") == null || localStorage.getItem("axvsurl").length == 0) {
            this.config.axvsurl = __WEBPACK_IMPORTED_MODULE_3__app_app_constants__["a" /* AXVS_SERVER_ADDRESS */];
        }
        else {
            this.config.axvsurl = localStorage.getItem("axvsurl");
        }
    } //小弹窗
    SettingsPage.prototype.save = function () {
        localStorage.setItem("domainrisurl", this.config.domainrisurl);
        localStorage.setItem("axvsurl", this.config.axvsurl);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-Settings',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\Settings\Settings.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n		<span style="color:#939393">设置</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n	<ion-grid>\n		<ion-row>\n			<ion-item style="width:100%;display:inline-block">\n			<ion-label floating>DomainRIS URL:</ion-label>\n				<ion-input [(ngModel)]=\'config.domainrisurl\'></ion-input>\n			</ion-item>\n		</ion-row>\n		<ion-row>\n			<ion-item style="width:100%;display:inline-block">\n			<ion-label floating>AxVS URL:</ion-label>\n				<ion-input [(ngModel)]=\'config.axvsurl\'></ion-input>\n			</ion-item>\n		</ion-row>\n		\n		<ion-row>\n		  <ion-col>\n			<button ion-button full (click)="save()">保存</button>\n		  </ion-col>\n		</ion-row>\n	</ion-grid>\n</ion-content>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\Settings\Settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
], SettingsPage);

//# sourceMappingURL=Settings.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hammerjs__);



Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Settings_Settings__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_Consultationlist_Consultationlist__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_Collaborativelist_Collaborativelist__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_Report_write_Report_write__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Report_view_Report_view__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__service_login_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__service_login_DB_service__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_study_viewer_study_viewer__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_study_viewer_popovers_relayout_viewer_relayout_viewer__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_study_viewer_popovers_preset_viewer_preset_viewer__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_study_viewer_popovers_measure_viewer_measure_viewer__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_study_viewer_popovers_roi_viewer_roi_viewer__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_study_viewer_popovers_orient_viewer_orient_viewer__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_study_viewer_popovers_scope_viewer_scope_viewer__ = __webpack_require__(646);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';













//components
//import {ElasticTextarea} from '../components/elasticTextarea';
//import {ProfileHeader} from '../components/profileHeader';
//viewer







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_Consultationlist_Consultationlist__["a" /* Consultation_listPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_Collaborativelist_Collaborativelist__["a" /* Collaborative_listPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_Report_write_Report_write__["a" /* Report_writelist */],
            __WEBPACK_IMPORTED_MODULE_11__pages_Report_view_Report_view__["a" /* Report_viewlist */],
            __WEBPACK_IMPORTED_MODULE_17__pages_study_viewer_study_viewer__["a" /* StudyViewerPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_study_viewer_popovers_relayout_viewer_relayout_viewer__["a" /* ReLayoutPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_study_viewer_popovers_preset_viewer_preset_viewer__["a" /* PresetPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_study_viewer_popovers_measure_viewer_measure_viewer__["a" /* MeasurePopoverPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_study_viewer_popovers_roi_viewer_roi_viewer__["a" /* RoiPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_study_viewer_popovers_orient_viewer_orient_viewer__["a" /* OrientPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_study_viewer_popovers_scope_viewer_scope_viewer__["a" /* ScopePopoverPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_Settings_Settings__["a" /* SettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            //InMemoryWebApiModule.forRoot(InMemoryDataService),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_12__angular_forms__["a" /* FormsModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_Consultationlist_Consultationlist__["a" /* Consultation_listPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_Collaborativelist_Collaborativelist__["a" /* Collaborative_listPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_Report_write_Report_write__["a" /* Report_writelist */],
            __WEBPACK_IMPORTED_MODULE_11__pages_Report_view_Report_view__["a" /* Report_viewlist */],
            __WEBPACK_IMPORTED_MODULE_17__pages_study_viewer_study_viewer__["a" /* StudyViewerPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_study_viewer_popovers_relayout_viewer_relayout_viewer__["a" /* ReLayoutPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_study_viewer_popovers_preset_viewer_preset_viewer__["a" /* PresetPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_study_viewer_popovers_measure_viewer_measure_viewer__["a" /* MeasurePopoverPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_study_viewer_popovers_roi_viewer_roi_viewer__["a" /* RoiPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_study_viewer_popovers_orient_viewer_orient_viewer__["a" /* OrientPopoverPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_study_viewer_popovers_scope_viewer_scope_viewer__["a" /* ScopePopoverPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_Settings_Settings__["a" /* SettingsPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__service_login_DB_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_15__service_login_service__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_Settings_Settings__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_login_service__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, login_service) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.login_service = login_service;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: '设置', component: __WEBPACK_IMPORTED_MODULE_5__pages_Settings_Settings__["a" /* SettingsPage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        this.login_service.logout() //这里先对回应的状态进行打印
            .subscribe(function (res) {
            localStorage.removeItem("userid");
            localStorage.removeItem("password");
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        }, function (error) { return _this.errorMessage = error; });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <button style="padding: 0 12px;" menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n	  <button style="padding: 0 12px;" menuClose ion-item (click)="logout()">\n		登出\n	  </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__service_login_service__["a" /* LoginService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_app_constants__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
 //全局配置的服务器地址






var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        //private headers = new Headers({'Content-Type': 'application/json'});
        this.loginUrl_postfix = '/DomainRIS/services/account/login'; // URL to web loginAPI;
        this.logoutUrl_postfix = '/DomainRIS/services/account/logout';
        this.reportUrl_postfix = 'DomainRIS/services/report/query';
        this.searchUrl_postfix = '/DomainRIS/services/request/query';
        this.saveUrl_postfix = '/DomainRIS/services/report/save';
        this.submitUrl_postfix = '/DomainRIS/services/request/submit';
    }
    LoginService.prototype.save = function (report) {
        var saveUrl = this.getUrl(this.saveUrl_postfix);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        return this.http.post(saveUrl, report, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.submit = function (request) {
        var submitUrl = this.getUrl(this.submitUrl_postfix);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        return this.http.post(submitUrl, request, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.query = function (request_type, currPage, consult_state, request_date_start, request_date_end) {
        var searchUrl = this.getUrl(this.searchUrl_postfix);
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* URLSearchParams */]();
        params.set('request_type', request_type);
        params.set('currPage', currPage);
        params.set('consult_state', consult_state);
        params.set('request_date_start', request_date_start);
        params.set('request_date_end', request_date_end);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true, search: params });
        return this.http.get(searchUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.Report_query = function (auditing, report_no) {
        var reportUrl = this.getUrl(this.reportUrl_postfix);
        var params = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* URLSearchParams */]();
        params.set('auditing', auditing);
        params.set('report_no', report_no);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true, search: params });
        return this.http.get(reportUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.login = function (id, password) {
        var loginUrl = this.getUrl(this.loginUrl_postfix);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true }); //注意这里带了一个类似cookie的东西。
        return this.http.post(loginUrl, JSON.stringify({ user_id: id, user_password: password }), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.logout = function () {
        var logoutUrl = this.getUrl(this.logoutUrl_postfix);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true }); //注意这里带了一个类似cookie的东西。
        return this.http.get(logoutUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    LoginService.prototype.getUrl = function (postfix) {
        var prefix = __WEBPACK_IMPORTED_MODULE_0__app_app_constants__["b" /* DOMAINRIS_SERVER_ADDRESS */];
        if (localStorage.getItem("domainrisurl") != null) {
            prefix = localStorage.getItem("domainrisurl");
        }
        var url = prefix + postfix;
        return url;
    };
    LoginService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    LoginService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(errMsg);
    };
    return LoginService;
}());
LoginService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], LoginService);

//# sourceMappingURL=login.service.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_ImageOperatingType__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_OperationScope__ = __webpack_require__(291);


/**
 * Created by binsirMac on 2016-12-29.
 */
var Config = (function () {
    function Config() {
    }
    return Config;
}());

//for ImageViewer padding
Config.IMAGEVIEWER_PADDING_TOP = 56;
// default
Config.IMAGEBOXVIEW_UNSELECTED_COLOR = 'grey';
Config.IMAGEBOXVIEW_SELECTED_COLOR = '#F00';
Config.IMAGEBOXVIEW_BORDOR_WIDTH = 1;
Config.TILEVIEW_UNSELECTED_COLOR = 'grey';
Config.TILEBOXVIEW_SELECTED_COLOR = 'yellow';
Config.TILEVIEW_BORDOR_WIDTH = 1;
Config.TILEVIEW_LAYOUT_ROWS = 1;
Config.TILEVIEW_LAYOUT_COLUMNS = 1;
Config.imageOperatingType = __WEBPACK_IMPORTED_MODULE_0__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeWindowLevel;
Config.AxOperationScope = __WEBPACK_IMPORTED_MODULE_1__common_OperationScope__["a" /* OperationScope */].SeriesScope;
Config.ROI_STOKE_STYLE = 'green';
Config.ROI_LINE_WIDTH = 1;
Config.RULER_STROKE_STYLE = 'green';
Config.RULER_LINE_WIDTH = 1;
Config.RULER_WIDTH = 16;
Config.RULER_HEIGHT = 16;
Config.RULER_MARGIN_LEFT = 2;
Config.RULER_MARGIN_BOTTOM = 2;
//# sourceMappingURL=Config.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_login_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UserInfo__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_list__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { Consultation_listPage } from '../Consultationlist/Consultationlist';
//import { Collaborative_listPage } from "../Collaborativelist/Collaborativelist";

var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, login_service) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.login_service = login_service;
        this.userinfo = new __WEBPACK_IMPORTED_MODULE_3__UserInfo__["a" /* UserInfo */](); //初始化用户信息
        this.checkLogin();
    }
    HomePage.prototype.test = function () {
        console.log("账号:" + this.userinfo.user_id + "密码:" + this.userinfo.user_password);
        //如何声明变量类型
    };
    HomePage.prototype.checkLogin = function () {
        if (localStorage.getItem('userid') != null) {
            this.login(localStorage.getItem('userid'), localStorage.getItem('password'), true);
        }
    };
    HomePage.prototype.login = function (id, password, auto) {
        var _this = this;
        if (id == "" || password == "") {
            this.showInputErrorAlert();
            return;
        }
        else {
            this.login_service.login(id, password) //这里先对回应的状态进行打印
                .subscribe(function (res) {
                if (String(res.status) == "Success") {
                    _this.current_user = res['account']['username'];
                    console.log(_this.current_user);
                    localStorage.setItem('userid', id);
                    localStorage.setItem('password', password);
                    localStorage.setItem('userno', res['account']['userno']);
                    localStorage.setItem('displayname', res['account']['displayname']);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__list_list__["a" /* ListPage */]);
                }
                else {
                    if (!auto) {
                        _this.showInputErrorAlert();
                    }
                }
            }, function (error) { return _this.errorMessage = error; });
        }
        this.test();
    };
    HomePage.prototype.showInputErrorAlert = function () {
        var alert = this.alertCtrl.create({
            title: '登陆失败',
            subTitle: '请输入用户名或者密码!',
            buttons: ['确定']
        });
        alert.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title><span style="color:#939393">登陆界面</span></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid style="width: 250px">\n    <ion-row>\n      <ion-col>\n        <label>Email or Username:</label>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <input name="username" [(ngModel)]="userinfo.user_id" type="text" id="user-name-field" placeholder="Your email or username" required>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <label>Password:</label>\n      </ion-col>\n    </ion-row>\n    <ion-row >\n      <ion-col>\n        <input name="password" [(ngModel)]="userinfo.user_password" type="password" id="password-field" placeholder="Your password" required>\n      </ion-col>\n    </ion-row>\n    <hr>\n    <ion-row>\n      <ion-col>\n        <button class="loginButton" ion-button (click)="login(userinfo.user_id,userinfo.user_password, false)">Login</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n</ion-content>\n\n<ion-footer id="footer">\n  <a>SITP</a> |\n  <a>上海技术物理研究所</a>\n</ion-footer>\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__service_login_service__["a" /* LoginService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Patitentxml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DOMAINRIS_SERVER_ADDRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AXVS_SERVER_ADDRESS; });
//这里配置全局变量
//以下是服务器的地址
var _DOMAINRIS_SERVER_ADDRESS = '';
// let _DOMAINRIS_SERVER_ADDRESS = 'http://192.168.4.184:8080';
var _AXVS_SERVER_ADDRESS = 'http://192.168.4.184:8080/axvs';
var _PatientXML = "<ReportInfo><PatientInfo><patient_hospital><patient_hospital_title>\u533B\u9662\uFF1A</patient_hospital_title>\n<patient_hospital_value></patient_hospital_value>\n</patient_hospital>\n<patient_pid>\n<patient_pid_title>\u75C5\u4EBAID\u53F7\uFF1A</patient_pid_title>\n<patient_pid_value></patient_pid_value>\n</patient_pid>\n<patient_name>\n<patient_name_title>\u59D3\u540D\uFF1A</patient_name_title>\n<patient_name_value></patient_name_value>\n</patient_name>\n<patient_sex>\n<patient_sex_title>\u6027\u522B\uFF1A</patient_sex_title>\n<patient_sex_value></patient_sex_value>\n</patient_sex>\n<patient_birthday>\n<patient_birthday_title>\u51FA\u751F\u65E5\u671F\uFF1A</patient_birthday_title>\n<patient_birthday_date></patient_birthday_date>\n</patient_birthday>\n<age>\n<age_title>\u5E74\u9F84\uFF1A</age_title>\n<age_value></age_value>\n</age>\n</PatientInfo>\n<NumberInfo>\n<dept_no>\n  <dept_no_title>\u79D1\u522B\uFF1A</dept_no_title>\n<dept_no_value></dept_no_value>\n</dept_no>\n</NumberInfo>\n<PartInfo>\n<symptom>\n  <symptom_title>\u4E34\u5E8A\u75C7\u72B6\uFF1A</symptom_title>\n<symptom_value></symptom_value>\n</symptom>\n<diagnoses>\n<diagnoses_title>\u4E34\u5E8A\u8BCA\u65AD\uFF1A</diagnoses_title>\n<diagnoses_value></diagnoses_value>\n</diagnoses>\n<check_part>\n<check_part_title>\u626B\u63CF\u90E8\u4F4D\uFF1A</check_part_title>\n<check_part_value></check_part_value>\n</check_part>\n</PartInfo>\n<Content>\n<report_content>\n  <report_content_title>\u5F71\u50CF\u5B66\u8868\u73B0\uFF1A</report_content_title>\n<report_content_value></report_content_value>\n</report_content>\n<report_conclusion>\n<report_conclusion_title>\u8BCA\u65AD\u610F\u89C1\uFF1A</report_conclusion_title>\n<report_conclusion_value></report_conclusion_value>\n<report_comments_value></report_comments_value>\n</report_conclusion>\n<report_comments>\n<report_comments_title>\u5F71\u50CF\u6CE8\u91CA\uFF1A</report_comments_title>\n</report_comments>\n<report_result>\n<report_result_title>\u7ED3\u8BBA\uFF1A</report_result_title>\n<report_result_value></report_result_value>\n</report_result>\n<film_quality>\n<film_quality_title>\u80F6\u7247\u8D28\u91CF\uFF1A</film_quality_title>\n<film_quality_value></film_quality_value>\n</film_quality>\n</Content>\n<Doctor_Date>\n<exam_doctor>\n  <exam_doctor_title>\u68C0\u67E5\u533B\u5E08\uFF1A</exam_doctor_title>\n<exam_doctor_value></exam_doctor_value>\n</exam_doctor>\n<report_doctor_no>\n<report_doctor_no_title>\u62A5\u544A\u533B\u5E08\u5DE5\u53F7\uFF1A</report_doctor_no_title>\n<report_doctor_no_value></report_doctor_no_value>\n</report_doctor_no>\n<report_doctor>\n<report_doctor_title>\u62A5\u544A\u533B\u5E08\uFF1A</report_doctor_title>\n<report_doctor_value></report_doctor_value>\n</report_doctor>\n<report_date>\n<report_date_title>\u62A5\u544A\u65E5\u671F\uFF1A</report_date_title>\n<report_date_value></report_date_value>\n</report_date>\n</Doctor_Date>\n<Other>\u672C\u62A5\u544A\u4EC5\u4F9B\u4E34\u5E8A\u53C2\u8003</Other>\n<report_uid></report_uid>\n</ReportInfo>";
var Patitentxml = _PatientXML;
var DOMAINRIS_SERVER_ADDRESS = _DOMAINRIS_SERVER_ADDRESS;
var AXVS_SERVER_ADDRESS = _AXVS_SERVER_ADDRESS;
//# sourceMappingURL=app.constants.js.map

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfo; });
var UserInfo = (function () {
    function UserInfo() {
    }
    return UserInfo;
}());

//这是服务器对应的用户信息。
//# sourceMappingURL=UserInfo.js.map

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logger */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageViewer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typescript_logging__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typescript_logging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_typescript_logging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_ImageBoxView__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loader_StreamJSONStudyLoader__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_CGRect__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Config__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_ImageOperatingType__ = __webpack_require__(65);







/**
 * Created by binsirMac on 2016-12-26.
 */
var factory = __WEBPACK_IMPORTED_MODULE_0_typescript_logging__["LFService"].createLoggerFactory();
var logger = factory.getLogger("ImageViewer");
var ImageViewer = (function () {
    function ImageViewer(imageViewerDivElement, studyUID, studyStatus, axvsAddress, axvsUserId, axvsPassword) {
        var _this = this;
        this.imageViewerDivElement = imageViewerDivElement;
        this.studyUID = studyUID;
        this.studyStatus = studyStatus;
        this.axvsAddress = axvsAddress;
        this.axvsUserId = axvsUserId;
        this.axvsPassword = axvsPassword;
        if (axvsAddress) {
            __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AXVS_ADDRESS = axvsAddress.trim();
        }
        else {
            this.displayError();
        }
        __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AXVS_USERID = axvsUserId;
        __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AXVS_PASSWORD = axvsPassword;
        //define all the event listeners
        __WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().subscribe(__WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, function (selectedTileView, args) {
            _this.selectedImageBoxView = selectedTileView.parentImageBoxView;
        });
    }
    ImageViewer.prototype.clear = function () {
        __WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().clear();
    };
    ImageViewer.prototype.display = function () {
        logger.info("To show the studyUID:" + this.studyUID + ", from the VS:" + this.axvsAddress);
        //imageViewerDivElement.innerText = "call the display image viewer" + this.studyUID;
        this.displayLoading();
        if (this.studyUID) {
            this.displayStudy();
        }
    };
    ImageViewer.prototype.removeAll = function () {
        while (this.imageViewerDivElement.firstChild) {
            this.imageViewerDivElement.removeChild(this.imageViewerDivElement.firstChild);
        }
    };
    ImageViewer.prototype.displayLoading = function () {
        this.removeAll();
        //set the default loading page;
        var img = document.createElement('img');
        img.setAttribute('src', 'assets/img/viewer/waiting.gif');
        img.setAttribute('class', 'centeredImg');
        this.imageViewerDivElement.appendChild(img);
    };
    ImageViewer.prototype.displayError = function () {
        this.removeAll();
        //set the default loading page;
        var img = document.createElement('img');
        img.setAttribute('src', 'assets/img//viewer/error.png');
        img.setAttribute('class', 'centeredImg');
        this.imageViewerDivElement.appendChild(img);
    };
    ImageViewer.prototype.displayStudy = function () {
        var _this = this;
        var streamJSONStudyLoader = new __WEBPACK_IMPORTED_MODULE_2__loader_StreamJSONStudyLoader__["a" /* StreamJSONStudyLoader */](this.studyUID, this.studyStatus);
        streamJSONStudyLoader.load().then(function (study) {
            logger.info("the display study:" + study);
            //1. reset the div to display the study.
            _this.removeAll();
            //2. generate the layout
            _this.displayedStudy = study;
            if (study.series.length == 1) {
                // set the image viewer layout.
                _this.setImageViewerLayout(1, 1, study);
            }
            else if (study.series.length == 2) {
                _this.setImageViewerLayout(2, 1, study);
            }
            else {
                // set the image viewer layout.
                _this.setImageViewerLayout(2, 2, study);
            }
        }, function (error) {
            console.error("Failed!", error);
            _this.displayError();
        });
    };
    ImageViewer.prototype.setImageViewerLayout = function (rows, columns, study) {
        logger.info("set layout to rows:" + rows + ", columns:" + columns);
        //first remove all the elements.
        this.removeAll();
        //second draw the designed grid
        this.imageBoxRows = rows;
        this.imageBoxColumns = columns;
        var newSize = rows * columns;
        var imageViewerRect = this.imageViewerDivElement.getBoundingClientRect();
        var imageViewerRectWidth = imageViewerRect.width;
        var imageViewerRectHeight = imageViewerRect.height - __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].IMAGEVIEWER_PADDING_TOP;
        var imageViewerCGRect = new __WEBPACK_IMPORTED_MODULE_3__common_CGRect__["a" /* CGRect */](0, 0, imageViewerRectWidth, imageViewerRectHeight);
        for (var i = 0; i < newSize; i++) {
            var newImageBoxView = new __WEBPACK_IMPORTED_MODULE_1__viewer_ImageBoxView__["a" /* ImageBoxView */](imageViewerCGRect, rows, columns, i);
            if (study && study.series[i]) {
                newImageBoxView.setCurrentDisplayedSeries(study, study.series[i]);
            }
            newImageBoxView.draw(this.imageViewerDivElement);
            if (i == 0) {
                if (this.selectedImageBoxView) {
                    this.selectedImageBoxView.selected = false;
                }
                newImageBoxView.selected = true;
                newImageBoxView.selectedTileView.selected = true;
                this.selectedImageBoxView = newImageBoxView;
            }
        }
    };
    ImageViewer.prototype.reLayout = function (rows, columns) {
        logger.info("relayout the image viewer, rows:" + rows + ", columns:" + columns);
        this.setImageViewerLayout(rows, columns, this.displayedStudy);
    };
    ImageViewer.prototype.resize = function () {
        var imageViewerRect = this.imageViewerDivElement.getBoundingClientRect();
        var imageViewerRectWidth = imageViewerRect.width;
        var imageViewerRectHeight = imageViewerRect.height - __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].IMAGEVIEWER_PADDING_TOP;
        logger.info("change the size:" + imageViewerRectWidth + "-" + imageViewerRectHeight);
        var imageViewerCGRect = new __WEBPACK_IMPORTED_MODULE_3__common_CGRect__["a" /* CGRect */](0, 0, imageViewerRectWidth, imageViewerRectHeight);
        __WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["b" /* EventTypes */].Resize, this, imageViewerCGRect);
    };
    ImageViewer.prototype.reset = function () {
        if (this.selectedImageBoxView) {
            if (this.selectedImageBoxView.selectedTileView) {
                this.selectedImageBoxView.selectedTileView.reset();
            }
            this.selectedImageBoxView.reset();
        }
    };
    ImageViewer.prototype.preset = function (windowCenter, windowWidth) {
        logger.info("preset the image with windowCenter:" + windowCenter + ", windowWidth:" + windowWidth);
        if (this.selectedImageBoxView) {
            this.selectedImageBoxView.setWL(windowCenter, windowWidth);
        }
    };
    ImageViewer.prototype.rotate = function (degree) {
        if (this.selectedImageBoxView) {
            this.selectedImageBoxView.rotate(degree);
        }
    };
    ImageViewer.prototype.selectSeries2Show = function (study, series) {
        if (this.selectedImageBoxView) {
            this.selectedImageBoxView.setCurrentDisplayedSeries(study, series);
        }
    };
    ImageViewer.prototype.doZoom = function () {
        __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].imageOperatingType = __WEBPACK_IMPORTED_MODULE_6__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeZoom;
        __WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["b" /* EventTypes */].ChangeOperatingType, this, 'Get the change');
    };
    ImageViewer.prototype.doROI = function () {
        __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].imageOperatingType = __WEBPACK_IMPORTED_MODULE_6__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure;
        __WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["b" /* EventTypes */].ChangeOperatingType, this, 'Get the change');
    };
    ImageViewer.prototype.doWL = function () {
        __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].imageOperatingType = __WEBPACK_IMPORTED_MODULE_6__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeWindowLevel;
        __WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_5__common_EventDispatcher__["b" /* EventTypes */].ChangeOperatingType, this, 'Get the change');
    };
    return ImageViewer;
}());

//# sourceMappingURL=ImageViewer.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CGPoint; });
/**
 * Created by binsirMac on 2016-12-26.
 */
var CGPoint = (function () {
    function CGPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return CGPoint;
}());

//# sourceMappingURL=CGPoint.js.map

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logger */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageBoxView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileView__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__display_DisplaySet__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_CGRect__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_typescript_logging__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_typescript_logging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_typescript_logging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_EventDispatcher__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Config__ = __webpack_require__(46);


//import {Series} from "../model/Series";




var factory = __WEBPACK_IMPORTED_MODULE_3_typescript_logging__["LFService"].createLoggerFactory();
var logger = factory.getLogger("ImageBoxView");
/**
 * Created by binsirMac on 2016-12-26.
 */
var ImageBoxView = (function () {
    function ImageBoxView(parentFrame, imageBoxRows, imageBoxColumns, tag) {
        var _this = this;
        this.parentFrame = parentFrame;
        this.imageBoxRows = imageBoxRows;
        this.imageBoxColumns = imageBoxColumns;
        this.tag = tag;
        this.enabled = true;
        this.tileViews = [];
        this._topLeftPresentationImageIndex = -1;
        this.presentationImagesCount = 0;
        var newWidth = (parentFrame.width) / imageBoxColumns;
        var newHeight = (parentFrame.height) / imageBoxRows;
        var newX = newWidth * (tag % imageBoxColumns);
        var newY = newHeight * (tag / imageBoxColumns);
        this.frame = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](newX, newY, newWidth, newHeight);
        this.bounds = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](0, 0, newWidth, newHeight);
        this.imageBoxViewWidth = newWidth;
        this.imageBoxViewHeight = newHeight;
        //create the div HTML Element;
        this.imageBoxRootDivElement = document.createElement('div');
        this.imageBoxRootDivElement.setAttribute("class", "imageBoxView");
        this.imageBoxRootDivElement.setAttribute("style", "border:" + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_UNSELECTED_COLOR + ";float: left; width:" + newWidth + "px;height:" + newHeight + "px;");
        this.imageBoxRootDivElement.setAttribute("tag", "" + tag);
        //create the tile views;
        this.tileRows = __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].TILEVIEW_LAYOUT_ROWS;
        this.tileColumns = __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].TILEVIEW_LAYOUT_COLUMNS;
        var matrixSize = this.tileRows * this.tileColumns;
        for (var i = 0; i < matrixSize; i++) {
            var tileWidth = (newWidth - 2 * __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH) / this.tileColumns;
            var tileHeight = (newHeight - 2 * __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH) / this.tileRows;
            var tileX = tileWidth * (i / this.tileColumns);
            var tileY = tileHeight * (i % this.tileColumns);
            var tileFrame = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](tileX, tileY, tileWidth, tileHeight);
            var tileView = new __WEBPACK_IMPORTED_MODULE_0__TileView__["a" /* TileView */](this, tileFrame, this.tileRows, this.tileColumns, i);
            this.tileViews.push(tileView);
            tileView.draw(this.imageBoxRootDivElement);
            if (i == 0) {
                this.selectedTileView = tileView;
            }
        }
        //define all the event listeners
        __WEBPACK_IMPORTED_MODULE_4__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().subscribe(__WEBPACK_IMPORTED_MODULE_4__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, function (selectedTileView, args) {
            if (selectedTileView.parentImageBoxView == _this) {
                _this.selected = true;
                if (_this.selectedTileView != selectedTileView) {
                    _this.selectedTileView = selectedTileView;
                }
            }
            else {
                _this.selected = false;
            }
        });
        __WEBPACK_IMPORTED_MODULE_4__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().subscribe(__WEBPACK_IMPORTED_MODULE_4__common_EventDispatcher__["b" /* EventTypes */].Resize, function (imageViewer, imageViewerCGRect) {
            logger.info("Resize the Imageboxviewer, width:" + imageViewerCGRect.width + " - " + imageViewerCGRect.height);
            var newWidth = (imageViewerCGRect.width) / _this.imageBoxColumns;
            var newHeight = (imageViewerCGRect.height) / _this.imageBoxRows;
            var newX = newWidth * (_this.tag % _this.imageBoxColumns);
            var newY = newHeight * (_this.tag / _this.imageBoxColumns);
            _this.imageBoxViewWidth = newWidth;
            _this.imageBoxViewHeight = newHeight;
            if (_this.selected) {
                _this.imageBoxRootDivElement.setAttribute("style", "border:" + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_SELECTED_COLOR + ";float: left; width:" + _this.imageBoxViewWidth + "px;height:" + _this.imageBoxViewHeight + "px;");
            }
            else {
                _this.imageBoxRootDivElement.setAttribute("style", "border:" + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_UNSELECTED_COLOR + ";float: left; width:" + _this.imageBoxViewWidth + "px;height:" + _this.imageBoxViewHeight + "px;");
            }
            var i = 0;
            for (var _i = 0, _a = _this.tileViews; _i < _a.length; _i++) {
                var tileView = _a[_i];
                var tileWidth = (newWidth - 2 * __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH) / _this.tileColumns;
                var tileHeight = (newHeight - 2 * __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH) / _this.tileRows;
                var tileX = tileWidth * (i / _this.tileColumns);
                var tileY = tileHeight * (i % _this.tileColumns);
                var tileFrame = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](tileX, tileY, tileWidth, tileHeight);
                tileView.resize(tileFrame);
                i++;
            }
        });
    }
    Object.defineProperty(ImageBoxView.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            if (value) {
                this.imageBoxRootDivElement.setAttribute("style", "border:" + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_SELECTED_COLOR + ";float: left; width:" + this.imageBoxViewWidth + "px;height:" + this.imageBoxViewHeight + "px;");
            }
            else {
                this.imageBoxRootDivElement.setAttribute("style", "border:" + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_5__Config__["a" /* Config */].IMAGEBOXVIEW_UNSELECTED_COLOR + ";float: left; width:" + this.imageBoxViewWidth + "px;height:" + this.imageBoxViewHeight + "px;");
            }
        },
        enumerable: true,
        configurable: true
    });
    ImageBoxView.prototype.draw = function (imageViewerDivElement) {
        imageViewerDivElement.appendChild(this.imageBoxRootDivElement);
    };
    ImageBoxView.prototype.removeAll = function () {
        while (this.imageBoxRootDivElement.firstChild) {
            this.imageBoxRootDivElement.removeChild(this.imageBoxRootDivElement.firstChild);
        }
    };
    ImageBoxView.prototype.setCurrentDisplayedSeries = function (study, series) {
        logger.info("to display series:" + series);
        // 0.remove current display set from the sereis.
        // this.removeAll();
        // 1.set the shown series instance uid
        this.currentDisplayedSeries = series;
        this.currentDisplayedStudy = study;
        // 2.generate the displayset from the series
        var displaySet = __WEBPACK_IMPORTED_MODULE_1__display_DisplaySet__["a" /* DisplaySet */].generateFromSeries(study, series);
        // 3.set the shown displayset
        this.setDisplaySet(displaySet);
        // 4.post the selected tile view change event
        if (this.selected) {
            // NSNotificationCenter *notificationCenter=[NSNotificationCenter defaultCenter];
            //
            // [notificationCenter postNotificationName:AxChangeSeriesNotification
            // object:self.selectedTileView];
        }
    };
    ImageBoxView.prototype.setDisplaySet = function (displaySet) {
        this.displaySet = displaySet;
        this.presentationImagesCount = displaySet.presentationImages.length;
        if (this.presentationImagesCount > 0) {
            var presentationImage = displaySet.presentationImages[0];
            this.displayedSeriesUID = presentationImage.frameReference.parentImageSop.seriesInstanceUid;
        }
        if (this.presentationImagesCount > 0) {
            this.topLeftPresentationImageIndex = 0;
            if (this.presentationImagesCount > 1) {
                this.isCrossSectional = true;
            }
            else {
                this.isCrossSectional = false;
            }
            this.adjustShowImages();
        }
    };
    ImageBoxView.prototype.adjustShowImages = function () {
        var index = 0;
        for (var _i = 0, _a = this.tileViews; _i < _a.length; _i++) {
            var tileView = _a[_i];
            var nexTopLeftPresentationImageIndex = this.topLeftPresentationImageIndex + index;
            if (nexTopLeftPresentationImageIndex < this.presentationImagesCount) {
                tileView.setPresentationImage(this.displaySet.presentationImages[nexTopLeftPresentationImageIndex]);
            }
            else {
                tileView.setPresentationImage(null);
            }
            index++;
        }
    };
    ImageBoxView.prototype.increaseTopLeftPresentationImageIndex = function () {
        if (this.topLeftPresentationImageIndex == this.displaySet.presentationImages.length - 1) {
            return;
        }
        this.topLeftPresentationImageIndex++;
    };
    ImageBoxView.prototype.decreaseTopLeftPresentationImageIndex = function () {
        if (this.topLeftPresentationImageIndex == 0) {
            return;
        }
        this.topLeftPresentationImageIndex--;
    };
    Object.defineProperty(ImageBoxView.prototype, "topLeftPresentationImageIndex", {
        get: function () {
            return this._topLeftPresentationImageIndex;
        },
        set: function (value) {
            if (this._topLeftPresentationImageIndex == value) {
                return;
            }
            if (value >= 0 || value < this.presentationImagesCount) {
                this._topLeftPresentationImageIndex = value;
                var sliderPosition = value / (this.tileColumns * this.tileRows);
                // imageScrollBar.value = sliderPosition;
                // //        [imageScrollBar setIndex:topLeftPresentationImageIndex andTotal:self.presentationImagesCount];
                //
                this.adjustShowImages();
                // [imageScrollBar setScrollImageIndex:self.selectedTileView.presentationImage];
            }
        },
        enumerable: true,
        configurable: true
    });
    ImageBoxView.prototype.reset = function () {
        if (this.selectedTileView) {
            this.selectedTileView.reset();
        }
    };
    ImageBoxView.prototype.setWL = function (windowCenter, windowWidth) {
        if (this.selectedTileView) {
            this.selectedTileView.setWL(windowCenter, windowWidth);
        }
    };
    ImageBoxView.prototype.rotate = function (degree) {
        if (this.selectedTileView) {
            this.selectedTileView.rotate(degree);
        }
    };
    return ImageBoxView;
}());

//# sourceMappingURL=ImageBoxView.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logger */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TileView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_CGRect__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_typescript_logging__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_typescript_logging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_typescript_logging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Config__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_CGSize__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_UIImageOrientation__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_CGPoint__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__roi_AngleRoiTool__ = __webpack_require__(293);










var factory = __WEBPACK_IMPORTED_MODULE_1_typescript_logging__["LFService"].createLoggerFactory();
var logger = factory.getLogger("TileView");
var TileView = (function () {
    function TileView(parentImageBoxView, frame, tileRows, tileColumns, tag) {
        var _this = this;
        this.parentImageBoxView = parentImageBoxView;
        this.frame = frame;
        this.tileRows = tileRows;
        this.tileColumns = tileColumns;
        this.tag = tag;
        this._selected = false;
        //create the div HTML Element;
        this.tileRootDivElement = document.createElement('div');
        this.tileRootDivElement.setAttribute('class', 'tileView');
        this.loadingImg = document.createElement('img');
        this.loadingImg.setAttribute('src', 'assets/img/viewer/waiting.gif');
        this.loadingImg.setAttribute('class', 'centeredImg');
        //set the default loading page;
        this.errorImg = document.createElement('img');
        this.errorImg.setAttribute('src', 'assets/img//viewer/error.png');
        this.errorImg.setAttribute('class', 'centeredImg');
        this.tileRootDivElement.setAttribute("style", "float: left;border:" + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_UNSELECTED_COLOR + ";position: relative; width:" + frame.width + "px;height:" + frame.height + "px");
        this.tileRootDivElement.setAttribute("tag", "" + tag);
        //add the overlays
        //topleft
        this.topLeftDivElement = document.createElement('div');
        this.topLeftDivElement.setAttribute('class', 'topLeftOverlayDiv');
        this.patientNameOverlayElement = document.createElement('div');
        this.topLeftDivElement.appendChild(this.patientNameOverlayElement);
        this.topLeftDivBackgroundElement = document.createElement('div');
        this.topLeftDivBackgroundElement.setAttribute('class', 'topLeftOverlayBackgroundDiv');
        this.patientNameOverlayBackgroundElement = document.createElement('div');
        this.topLeftDivBackgroundElement.appendChild(this.patientNameOverlayBackgroundElement);
        //toperight
        this.topRightDivElement = document.createElement('div');
        this.topRightDivElement.setAttribute('class', 'topRightOverlayDiv');
        this.patientIdOverlayElement = document.createElement('div');
        this.topRightDivElement.appendChild(this.patientIdOverlayElement);
        this.topRightDivBackgroundElement = document.createElement('div');
        this.topRightDivBackgroundElement.setAttribute('class', 'topRightOverlayBackgroundDiv');
        this.patientIdOverlayBackgroundElement = document.createElement('div');
        this.topRightDivBackgroundElement.appendChild(this.patientIdOverlayBackgroundElement);
        //bottomleft
        this.bottomLeftDivElement = document.createElement('div');
        this.bottomLeftDivElement.setAttribute('class', 'bottomLeftOverlayDiv');
        this.instanceNumberOverlayElement = document.createElement('div');
        this.bottomLeftDivElement.appendChild(this.instanceNumberOverlayElement);
        this.bottomLeftDivBackgroundElement = document.createElement('div');
        this.bottomLeftDivBackgroundElement.setAttribute('class', 'bottomLeftOverlayBackgroundDiv');
        this.instanceNumberOverlayBackgroundElement = document.createElement('div');
        this.bottomLeftDivBackgroundElement.appendChild(this.instanceNumberOverlayBackgroundElement);
        //bottomright
        this.bottomRightDivElement = document.createElement('div');
        this.bottomRightDivElement.setAttribute('class', 'bottomRightOverlayDiv');
        this.zoomOverlayElement = document.createElement('div');
        this.bottomRightDivElement.appendChild(this.zoomOverlayElement);
        this.wlOverlayElement = document.createElement('div');
        this.bottomRightDivElement.appendChild(this.wlOverlayElement);
        this.bottomRightBackgroundDivElement = document.createElement('div');
        this.bottomRightBackgroundDivElement.setAttribute('class', 'bottomRightOverlayBackgroundDiv');
        this.zoomOverlayBackgroundElement = document.createElement('div');
        this.bottomRightBackgroundDivElement.appendChild(this.zoomOverlayBackgroundElement);
        this.wlOverlayBackgroundElement = document.createElement('div');
        this.bottomRightBackgroundDivElement.appendChild(this.wlOverlayBackgroundElement);
        //initial the canvas for draw the image
        this.canv = document.createElement("canvas");
        this.canv.width = frame.width - 2 * __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH;
        this.canv.height = frame.height - 2 * __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH;
        this.canv.setAttribute("style", "width:" + this.canv.width + "px;height:" + this.canv.height + "px");
        this.ctx = this.canv.getContext("2d");
        //add all elements to tile view
        //this.addAll();
        //add the events listener
        __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().subscribe(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, function (selectedTileView, args) {
            logger.info('Get the tap from tileview!');
            if (_this != selectedTileView) {
                _this.selected = false;
            }
        });
        //add the events listener
        __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().subscribe(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].ChangeOperatingType, function (args) {
            logger.info('Get the change operating type !');
            // this.updateGestureRecognizer();
            _this.currentImageOperatingType = __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].imageOperatingType;
            if (__WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool()) {
                __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool().removeAllPoint();
            }
        });
        //add the events listener
        __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().subscribe(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].NeedsDisplayNotification, function (sender, args) {
            logger.info('need to display!');
            if (_this.presentationImage == sender) {
                //update the display parameters according the new presentationimage
                _this.presentationImage.updateDisplayParams(_this.frame.size);
                //
                _this.setNeedsDisplay();
            }
        });
        this.currentImageOperatingType = __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeWindowLevel;
        //add the gestures
        // create a manager for that element
        this.hammerManager = new Hammer.Manager(this.tileRootDivElement);
        // create recognizers
        this.singleTapThumbnail = new Hammer.Tap({
            taps: 1
        });
        this.panRecognizer = new Hammer.Pan({ threshold: 0, pointers: 0 });
        this.adjustWLGesture = new Hammer.Pan({ threshold: 5 });
        // create recognizers
        this.swipeLeftGesture = new Hammer.Swipe({ pointers: 2 });
        this.swipeRightGesture = new Hammer.Swipe({ pointers: 2 });
        this.pinchRecognizer = new Hammer.Pinch({ threshold: 0.01 });
        this.hammerManager.add(this.singleTapThumbnail);
        this.hammerManager.add(this.panRecognizer);
        this.panRecognizer.recognizeWith(this.swipeLeftGesture);
        this.pinchRecognizer.recognizeWith(this.swipeRightGesture);
        this.pinchRecognizer.recognizeWith(this.pinchRecognizer);
        // subscribe to events
        this.hammerManager.on('tap', function (e) {
            // do the tap
            _this.selected = true;
            __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, _this, 'Get the tap');
        });
        var deltaX = 0;
        var deltaY = 0;
        this.hammerManager.on('panstart', function (e) {
            e.preventDefault();
            if (!_this.selected) {
                __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, _this, 'Get the tap');
            }
            if (_this.presentationImage && (_this.currentImageOperatingType == __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure)) {
                logger.info('begin to draw the roi');
                __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool().touchesBegan(_this.getCanvasPos(e.pointers[0]), _this);
            }
        });
        this.hammerManager.on('pancancel', function (e) {
            e.preventDefault();
            if (_this.presentationImage && (_this.currentImageOperatingType == __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure)) {
                logger.info('cancel to draw the roi');
                __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool().touchesCancelled(_this.getCanvasPos(e.pointers[0]), _this);
            }
        });
        this.hammerManager.on('panmove', function (e) {
            e.preventDefault();
            var dX = deltaX + (e.deltaX);
            var dY = deltaY + (e.deltaY);
            if (dX == 0 && dY == 0) {
                return;
            }
            if (_this.presentationImage) {
                switch (_this.currentImageOperatingType) {
                    case __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeWindowLevel:
                        logger.info("change the window level with width:" + dX + ",center:" + dY);
                        _this.presentationImage.changeWindowLevel(dX, dY);
                        break;
                    case __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeZoom:
                        logger.info("zoom image with width:" + dX + ",center:" + dY);
                        // self.presentationImage resizeImageWithScale:newScale atPoint:location andTileCenter:tileCenter
                        break;
                    case __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure:
                        __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool().touchesMoved(_this.getCanvasPos(e.pointers[0]), _this);
                        break;
                }
                _this.displayImage();
            }
        });
        this.hammerManager.on('panend', function (e) {
            e.preventDefault();
            deltaX = deltaX + e.deltaX;
            deltaY = deltaY + e.deltaY;
            if (_this.presentationImage && (_this.currentImageOperatingType == __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure)) {
                logger.info('end to draw the roi');
                __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool().touchesEnded(_this.getCanvasPos(e.pointers[0]), _this);
            }
        });
        /*
        this.canv.onmousedown = (e) => {
          if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
            RoiUtil.getCurrentRoiTool().touchesBegan(this.getCanvasPos(e),this);
            this.displayImage();
          }
        };
    
        this.canv.onmousemove = (e) => {
          if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
            RoiUtil.getCurrentRoiTool().touchesMoved(this.getCanvasPos(e),this);
            this.displayImage();
          }
        };
    
        this.canv.onmouseup = (e) => {
          if(this.presentationImage && (this.currentImageOperatingType == ImageOperatingType.ImageOperatingTypeMeasure)) {
            RoiUtil.getCurrentRoiTool().touchesEnded(this.getCanvasPos(e),this);
            this.displayImage();
          }
        };*/
        this.hammerManager.on('swipeleft', function (e) {
            logger.info('get the swip left event');
            if (!_this.selected) {
                __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, _this, 'Get the tap');
            }
            if (_this.parentImageBoxView) {
                _this.parentImageBoxView.increaseTopLeftPresentationImageIndex();
            }
        });
        this.hammerManager.on('swiperight', function (e) {
            logger.info('get the swip right event');
            if (!_this.selected) {
                __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, _this, 'Get the tap');
            }
            if (_this.parentImageBoxView) {
                _this.parentImageBoxView.decreaseTopLeftPresentationImageIndex();
            }
        });
        // let initScale :number ;
        // hammerManager.on('pinchstart', e => {
        //   if(this.presentationImage){
        //     initScale = this.presentationImage.aspectScale;
        //   }else{
        //     initScale = 1;
        //   }
        //   logger.info('get the pinch event to initial the scale get fom the image. with scale:'+initScale);
        // });
        this.hammerManager.on('pinch', function (e) {
            if (!_this.selected) {
                __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].SelectTileView, _this, 'Get the tap');
            }
            var centerPoint = e.center;
            if (_this.presentationImage) {
                if (e.scale * _this.presentationImage.width * _this.presentationImage.aspectScale > 20) {
                    _this.presentationImage.lenCenterAtImage.x = centerPoint.x;
                    _this.presentationImage.lenCenterAtImage.y = centerPoint.y;
                    logger.info('get the pinch event, with scale:' + e.scale * _this.presentationImage.aspectScale);
                    _this.presentationImage.aspectScale = _this.presentationImage.aspectScale * e.scale;
                    _this.displayImage();
                }
            }
        });
        // this.updateGestureRecognizer();
        // hammerManager.on('pinchend', e => {
        //   let centerPoint : HammerPoint = e.center;
        //   this.presentationImage.lenCenterAtImage.x = centerPoint.x;
        //   this.presentationImage.lenCenterAtImage.y = centerPoint.y;
        //   initScale = initScale * e.scale;
        //   logger.info('get the pinch event, with scale:'+initScale);
        //   // reset the final scale
        // });
    }
    TileView.prototype.resizeWithOldSuperviewSize = function (oldBoundsSize, rotated, cleared) {
        this.allCleared = cleared;
        if (this.tileRows == 0 || this.tileColumns == 0) {
            return;
        }
        if (cleared) {
            // this.setNeedsDisplay();
            return;
        }
        var centerPoint = this.center;
        centerPoint = new __WEBPACK_IMPORTED_MODULE_7__common_CGPoint__["a" /* CGPoint */](centerPoint.x - this.frame.origin.x, centerPoint.y - this.frame.origin.y);
        var superFrame = this.parentImageBoxView.bounds;
        var newWidth = superFrame.size.width / this.tileColumns;
        var newHeight = superFrame.size.height / this.tileRows;
        var newX = newWidth * (this.tag % this.tileColumns);
        var newY = newHeight * (this.tag / this.tileColumns);
        var newFrame = new __WEBPACK_IMPORTED_MODULE_0__common_CGRect__["a" /* CGRect */](newX, newY, newWidth, newHeight);
        this.frame = newFrame;
        this.presentationImage.setTileViewSize(newFrame.size, rotated, centerPoint);
        this.setNeedsDisplay();
    };
    TileView.prototype.setRows = function (rows, columns) {
        if (this.tileRows == 1 && this.tileColumns == 1 && rows == 1 && columns == 1) {
            return;
        }
        this.tileRows = rows;
        this.tileColumns = columns;
        var rect = this.parentImageBoxView.bounds;
        this.resizeWithOldSuperviewSize(rect.size, false, false);
    };
    Object.defineProperty(TileView.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            if (value) {
                this.tileRootDivElement.setAttribute("style", "float: left;border:" + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEBOXVIEW_SELECTED_COLOR + ";position: relative; width:" + this.frame.width + "px;height:" + this.frame.height + "px");
            }
            else {
                this.tileRootDivElement.setAttribute("style", "float: left;border:" + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_UNSELECTED_COLOR + ";position: relative; width:" + this.frame.width + "px;height:" + this.frame.height + "px");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileView.prototype, "presentationImage", {
        get: function () {
            return this._presentationImage;
        },
        set: function (presentationImage) {
            if (this._presentationImage == null && presentationImage == null) {
                this.setNeedsDisplay();
                return;
            }
            if (this._presentationImage != presentationImage) {
                if (this._presentationImage) {
                    this._presentationImage.parentTileView = null;
                }
                this._presentationImage = presentationImage;
                this._presentationImage.parentTileView = this;
                //        currentShownImageRef = nil;
                this.needDrawImage = true;
                if (!presentationImage) {
                    this.setNeedsDisplay();
                    return;
                }
                var imageBoxView = this.parentImageBoxView;
                // [self addGestureRecognizerByOperatingType:imageBoxView.currentImageOperatingType];
                //coment the following tow lines
                // [presentationImage dicomImage];
                this.setNeedsDisplay();
                // if (!presentationImage.frameReference.parentImageSop.dataSource.isLoaded) {
                //
                //   return;
                // }
                this.presentationImage.setTileViewSize(this.frame.size, false, this.center);
                __WEBPACK_IMPORTED_MODULE_9__roi_AngleRoiTool__["a" /* AngleRoiTool */].shareAngleRoiTool().clearRoiTool();
                this.setNeedsDisplay();
                if (this.selected) {
                    __WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_2__common_EventDispatcher__["b" /* EventTypes */].OverlayChangeNotification, this, null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TileView.prototype.setNeedsDisplay = function () {
        //update the overlays
        this.updateOverlays();
        //draw the image
        this.displayImage();
    };
    TileView.prototype.reset = function () {
        if (this.presentationImage) {
            this.presentationImage.reset();
            this.displayImage();
        }
    };
    TileView.prototype.getCanvasPos = function (e) {
        var rect = this.canv.getBoundingClientRect();
        return new __WEBPACK_IMPORTED_MODULE_7__common_CGPoint__["a" /* CGPoint */](e.clientX - rect.left * (this.canv.width / rect.width), e.clientY - rect.top * (this.canv.height / rect.height));
    };
    ;
    Object.defineProperty(TileView.prototype, "size", {
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_4__common_CGSize__["a" /* CGSize */](this.canv.width, this.canv.height); //this.canv.bounds.size;
        },
        enumerable: true,
        configurable: true
    });
    TileView.prototype.addGestureRecognizerByOperatingType = function (imageOperatingType) {
        // add the recognizers
        if (this.presentationImage == null) {
            return;
        }
        switch (imageOperatingType) {
            case __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeWindowLevel:
            case __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeZoom:
                this.addStandardGestureOrgnization();
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure:
                this.addMeasureGestureOrgnization();
                break;
        }
        this.currentImageOperatingType = imageOperatingType;
    };
    TileView.prototype.addSingleTapGestureOrgnization = function () {
        this.hammerManager.add(this.singleTapThumbnail);
    };
    TileView.prototype.addStandardGestureOrgnization = function () {
        this.removeMeasureGestureOrgnization();
        this.addSingleTapGestureOrgnization();
        this.hammerManager.add(this.pinchRecognizer);
        this.hammerManager.add(this.panRecognizer);
        this.hammerManager.add(this.adjustWLGesture);
    };
    TileView.prototype.removeStandardGestureOrgnization = function () {
        this.hammerManager.remove(this.pinchRecognizer);
        this.hammerManager.remove(this.panRecognizer);
        this.hammerManager.remove(this.adjustWLGesture);
    };
    TileView.prototype.addMeasureGestureOrgnization = function () {
        this.hammerManager.remove(this.singleTapThumbnail);
        this.removeStandardGestureOrgnization();
    };
    TileView.prototype.removeMeasureGestureOrgnization = function () {
    };
    TileView.prototype.scaleImage = function (pinchRecognizer) {
        var parentImageBox = this.parentImageBoxView;
        if (!(this.selected && parentImageBox.selected)) {
            // this.handleTapImageBoxView(null);
        }
    };
    TileView.prototype.draw = function (imageBoxRootDivElement) {
        imageBoxRootDivElement.appendChild(this.tileRootDivElement);
    };
    TileView.prototype.setPresentationImage = function (presentationImage) {
        //remove the display elements from div
        if (presentationImage == null) {
            this.removeAll();
            if (this.presentationImage) {
                this.presentationImage.parentTileView = null;
            }
            return;
        }
        if (this.presentationImage == presentationImage) {
            return;
        }
        if (this.presentationImage) {
            this.presentationImage.parentTileView = null;
        }
        this.presentationImage = presentationImage;
        this.presentationImage.parentTileView = this;
        if (!this.tileRootDivElement.contains(this.canv)) {
            this.addAll();
        }
        this._presentationImage.setTileViewSize(this.frame.size, false, this.center);
        logger.info("To display image:" + presentationImage);
        this.setNeedsDisplay();
    };
    TileView.prototype.updateOverlays = function () {
        this.patientNameOverlayElement.innerText = this.presentationImage.patientName;
        this.patientNameOverlayBackgroundElement.innerText = this.patientNameOverlayElement.innerText;
        this.patientIdOverlayElement.innerText = this.presentationImage.patientId;
        this.patientIdOverlayBackgroundElement.innerText = this.patientIdOverlayElement.innerText;
        this.instanceNumberOverlayElement.innerText = "Image:#" + this.presentationImage.instanceNumber + "/" + this.presentationImage.parentDisplaySet.presentationImages.length;
        this.instanceNumberOverlayBackgroundElement.innerText = this.instanceNumberOverlayElement.innerText;
        this.wlOverlayElement.innerText = 'W:' + this.presentationImage.windowWidth + '/L:' + this.presentationImage.windowCenter;
        this.wlOverlayBackgroundElement.innerText = this.wlOverlayElement.innerText;
        this.zoomOverlayElement.innerText = 'Zoom:' + this.presentationImage.aspectScale.toFixed(2);
        this.zoomOverlayBackgroundElement.innerText = this.zoomOverlayElement.innerText;
    };
    TileView.prototype.removeAll = function () {
        while (this.tileRootDivElement.firstChild) {
            this.tileRootDivElement.removeChild(this.tileRootDivElement.firstChild);
        }
    };
    TileView.prototype.addAll = function () {
        this.tileRootDivElement.appendChild(this.loadingImg);
        this.tileRootDivElement.appendChild(this.topLeftDivElement);
        this.tileRootDivElement.appendChild(this.topLeftDivBackgroundElement);
        this.tileRootDivElement.appendChild(this.topRightDivElement);
        this.tileRootDivElement.appendChild(this.topRightDivBackgroundElement);
        this.tileRootDivElement.appendChild(this.bottomLeftDivElement);
        this.tileRootDivElement.appendChild(this.bottomLeftDivBackgroundElement);
        this.tileRootDivElement.appendChild(this.bottomRightDivElement);
        this.tileRootDivElement.appendChild(this.bottomRightBackgroundDivElement);
        this.tileRootDivElement.appendChild(this.canv);
    };
    TileView.prototype.displayImage = function () {
        logger.info('To display the image');
        this.ctx.save();
        //display the presentation image
        if (this.presentationImage) {
            if (__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].imageOperatingType != __WEBPACK_IMPORTED_MODULE_5__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure) {
                this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
                if (!this.tileRootDivElement.contains(this.loadingImg)) {
                    this.tileRootDivElement.appendChild(this.loadingImg);
                }
            }
            this.presentationImage.drawInRect(this.frame, this.ctx);
            //display the ROIs
            if (__WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool() && __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool().isDrawing() && this.selected) {
                __WEBPACK_IMPORTED_MODULE_8__roi_RoiUtil__["a" /* RoiUtil */].getCurrentRoiTool().drawTemporaryIn(this, this.ctx);
            }
        }
        this.ctx.restore();
    };
    TileView.prototype.computeHorizontalRulerUnit = function () {
        var result = -1;
        if (this.presentationImage.pixelSpacingX != 0 && this.presentationImage.pixelSpacingY != 0) {
            result = this.presentationImage.originalSize.width * this.presentationImage.pixelSpacingX / 2.0;
        }
        else if (this.presentationImage.imagerPixelSpacingX != 0 && this.presentationImage.imagerPixelSpacingY != 0) {
            result = this.presentationImage.originalSize.width * this.presentationImage.imagerPixelSpacingX / 2.0;
        }
        return result;
    };
    TileView.prototype.computeVerticalRulerUnit = function () {
        var result = -1;
        if (this.presentationImage.pixelSpacingX != 0 && this.presentationImage.pixelSpacingY != 0) {
            result = this.presentationImage.originalSize.height * this.presentationImage.pixelSpacingY / 2.0;
        }
        else if (this.presentationImage.imagerPixelSpacingX != 0 && this.presentationImage.imagerPixelSpacingY != 0) {
            result = this.presentationImage.originalSize.height * this.presentationImage.imagerPixelSpacingY / 2.0;
        }
        return result;
    };
    Object.defineProperty(TileView.prototype, "center", {
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_7__common_CGPoint__["a" /* CGPoint */](this.canv.width / 2, this.canv.height / 2);
        },
        enumerable: true,
        configurable: true
    });
    TileView.prototype.drawRulers = function () {
        this.ctx.strokeStyle = "" + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_STROKE_STYLE;
        this.ctx.lineWidth = __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_LINE_WIDTH;
        var imageSize = this.presentationImage.currentSize;
        //draw ruler
        var imageHeight = 0;
        var imageWidth = 0;
        var verticalRulerUnit = -1; //[self computeVerticalRulerUnit];
        var horizontalRulerUnit = -1; //[self computeHorizontalRulerUnit];
        if (this.presentationImage.imageOrientation == __WEBPACK_IMPORTED_MODULE_6__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft ||
            this.presentationImage.imageOrientation == __WEBPACK_IMPORTED_MODULE_6__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored ||
            this.presentationImage.imageOrientation == __WEBPACK_IMPORTED_MODULE_6__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight ||
            this.presentationImage.imageOrientation == __WEBPACK_IMPORTED_MODULE_6__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored) {
            imageHeight = imageSize.width;
            imageWidth = imageSize.height;
            verticalRulerUnit = this.computeHorizontalRulerUnit();
            horizontalRulerUnit = this.computeVerticalRulerUnit();
        }
        else {
            imageHeight = imageSize.height;
            imageWidth = imageSize.width;
            verticalRulerUnit = this.computeVerticalRulerUnit();
            horizontalRulerUnit = this.computeHorizontalRulerUnit();
        }
        var rectHeightCenter = this.center.y - this.frame.origin.y;
        var rulerOriginY = rectHeightCenter - imageHeight / 4;
        {
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rectHeightCenter + imageHeight / 4);
            this.ctx.stroke();
            //       if (verticalRulerUnit > 0) {
            //         [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 8) withValue:[NSString stringWithFormat:@"%.0f",verticalRulerUnit] withColor:AxRulerColor];
            //
            //         //delete the following codes at 2013-10-17
            // //            if (self.presentationImage.pixelSpacingX != 0 && self.presentationImage.pixelSpacingY != 0) {
            // //                [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 18) withValue:@"mm" withColor:AxRulerColor];
            // //            }else if (self.presentationImage.imagerPixelSpacingX != 0 && self.presentationImage.imagerPixelSpacingY != 0) {
            // //                [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 18) withValue:@"imager mm" withColor:AxRulerColor];
            // //            }
            //         [RoiUtil drawTextAt:CGPointMake(RULER_MARGIN_LEFT + RULER_WIDTH / 2.0 + 8, rulerOriginY + imageHeight*4/16 + 18) withValue:@"mm" withColor:AxRulerColor];
            //       }
            //1 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH, rulerOriginY);
            this.ctx.stroke();
            //2 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH / 2, rulerOriginY + imageHeight / 16);
            this.ctx.stroke();
            //3 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight * 2 / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH / 2, rulerOriginY + imageHeight * 2 / 16);
            this.ctx.stroke();
            //4 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight * 3 / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH / 2, rulerOriginY + imageHeight * 3 / 16);
            this.ctx.stroke();
            //5 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight * 4 / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH / 2, rulerOriginY + imageHeight * 4 / 16);
            this.ctx.stroke();
            //6 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight * 5 / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH / 2, rulerOriginY + imageHeight * 5 / 16);
            this.ctx.stroke();
            //7 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight * 6 / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH / 2, rulerOriginY + imageHeight * 6 / 16);
            this.ctx.stroke();
            //8 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight * 7 / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH / 2, rulerOriginY + imageHeight * 7 / 16);
            this.ctx.stroke();
            //9 line
            this.ctx.beginPath();
            this.ctx.moveTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT, rulerOriginY + imageHeight * 8 / 16);
            this.ctx.lineTo(__WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_LEFT + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_WIDTH, rulerOriginY + imageHeight * 8 / 16);
            this.ctx.stroke();
        }
        var rectWidthCenter = this.center.x - this.frame.origin.x; ////;rect.origin.x + rect.size.width / 2;
        var rulerOriginX = rectWidthCenter - imageWidth / 4;
        {
            var paddingBottom = this.canv.height - __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_MARGIN_BOTTOM;
            var paddingBottomEndLong = paddingBottom - __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_HEIGHT;
            var paddingBottomEndShort = paddingBottom - __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].RULER_HEIGHT / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX, paddingBottom);
            this.ctx.lineTo(rectWidthCenter + imageWidth / 4, paddingBottom);
            this.ctx.stroke();
            //1 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX, paddingBottomEndLong);
            this.ctx.lineTo(rulerOriginX, paddingBottom);
            this.ctx.stroke();
            //2 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth / 16, paddingBottomEndShort);
            this.ctx.lineTo(rulerOriginX + imageWidth / 16, paddingBottom);
            this.ctx.stroke();
            //3 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth * 2 / 16, paddingBottomEndShort);
            this.ctx.lineTo(rulerOriginX + imageWidth * 2 / 16, paddingBottom);
            this.ctx.stroke();
            //4 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth * 3 / 16, paddingBottomEndShort);
            this.ctx.lineTo(rulerOriginX + imageWidth * 3 / 16, paddingBottom);
            this.ctx.stroke();
            //5 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth * 4 / 16, paddingBottomEndShort);
            this.ctx.lineTo(rulerOriginX + imageWidth * 4 / 16, paddingBottom);
            this.ctx.stroke();
            //draw the ruler unit
            if (horizontalRulerUnit > 0) {
                ////delete the following codes at 2013-10-17
                //            if (self.presentationImage.pixelSpacingX != 0 && self.presentationImage.pixelSpacingY != 0) {
                //
                //                [RoiUtil drawTextAt:CGPointMake(rulerOriginX+imageWidth*4/16, paddingBottom + 10) withValue:[NSString stringWithFormat:@"%.0f mm",horizontalRulerUnit]  withColor:AxRulerColor];
                //            }else if (self.presentationImage.imagerPixelSpacingX != 0 && self.presentationImage.imagerPixelSpacingY != 0) {
                //
                //                [RoiUtil drawTextAt:CGPointMake(rulerOriginX+imageWidth*4/16, paddingBottom + 10) withValue:[NSString stringWithFormat:@"%.0f imager mm",horizontalRulerUnit]  withColor:AxRulerColor];
                //            }
                //         [RoiUtil drawTextAt:CGPointMake(rulerOriginX+imageWidth*4/16, paddingBottom + 10) withValue:[NSString stringWithFormat:@"%.0f mm",horizontalRulerUnit]  withColor:AxRulerColor];
            }
            //6 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth * 5 / 16, paddingBottomEndShort);
            this.ctx.lineTo(rulerOriginX + imageWidth * 5 / 16, paddingBottom);
            this.ctx.stroke();
            //7 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth * 6 / 16, paddingBottomEndShort);
            this.ctx.lineTo(rulerOriginX + imageWidth * 6 / 16, paddingBottom);
            this.ctx.stroke();
            //8 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth * 7 / 16, paddingBottomEndShort);
            this.ctx.lineTo(rulerOriginX + imageWidth * 7 / 16, paddingBottom);
            this.ctx.stroke();
            //9 line
            this.ctx.beginPath();
            this.ctx.moveTo(rulerOriginX + imageWidth * 8 / 16, paddingBottomEndLong);
            this.ctx.lineTo(rulerOriginX + imageWidth * 8 / 16, paddingBottom);
            this.ctx.stroke();
        }
    };
    TileView.prototype.displayRect = function () {
        return new __WEBPACK_IMPORTED_MODULE_0__common_CGRect__["a" /* CGRect */](0, 0, this.canv.width, this.canv.height);
    };
    TileView.prototype.removeLoadingImg = function () {
        if (this.tileRootDivElement.contains(this.loadingImg)) {
            this.tileRootDivElement.removeChild(this.loadingImg);
        }
        if (this.tileRootDivElement.contains(this.errorImg)) {
            this.tileRootDivElement.removeChild(this.errorImg);
        }
    };
    TileView.prototype.displayError = function () {
        if (!this.tileRootDivElement.contains(this.errorImg)) {
            this.tileRootDivElement.appendChild(this.errorImg);
        }
    };
    TileView.prototype.resize = function (imageBoxViewRect) {
        this.frame = imageBoxViewRect;
        if (this.selected) {
            this.tileRootDivElement.setAttribute("style", "float: left;border:" + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEBOXVIEW_SELECTED_COLOR + ";position: relative; width:" + this.frame.width + "px;height:" + this.frame.height + "px");
        }
        else {
            this.tileRootDivElement.setAttribute("style", "float: left;border:" + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH + "px solid " + __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_UNSELECTED_COLOR + ";position: relative; width:" + this.frame.width + "px;height:" + this.frame.height + "px");
        }
        this.canv.width = this.frame.width - 2 * __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH;
        this.canv.height = this.frame.height - 2 * __WEBPACK_IMPORTED_MODULE_3__Config__["a" /* Config */].TILEVIEW_BORDOR_WIDTH;
        this.canv.setAttribute("style", "width:" + this.canv.width + "px;height:" + this.canv.height + "px");
        this.displayImage();
    };
    TileView.prototype.setWL = function (windowCenter, windowWidth) {
        if (this.presentationImage) {
            this.presentationImage.setWL(windowCenter, windowWidth);
            this.displayImage();
        }
    };
    TileView.prototype.rotate = function (degrees) {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
        this.ctx.save();
        this.ctx.translate(this.canv.width / 2, this.canv.height / 2);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.drawImage(this.presentationImage.currentDisplayImage, -this.presentationImage.currentDisplayImage.width / 2, -this.presentationImage.currentDisplayImage.width / 2);
        this.ctx.restore();
    };
    return TileView;
}());

//# sourceMappingURL=TileView.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AngleRoi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_Aesthetics__ = __webpack_require__(94);
/**
 * Created by binsirMac on 2017-01-09.
 */

var AngleRoi = (function () {
    function AngleRoi(firstPointInOriginalImage, secondPointInOriginalImage, thirdPointInOriginalImage) {
        this.firstPointInOriginalImage = firstPointInOriginalImage;
        this.secondPointInOriginalImage = secondPointInOriginalImage;
        this.thirdPointInOriginalImage = thirdPointInOriginalImage;
    }
    AngleRoi.prototype.drawRoiOnImage = function (context, presentationImage) {
        context.lineWidth = __WEBPACK_IMPORTED_MODULE_0__common_Aesthetics__["a" /* Aesthetics */].AxRoiSelectedLineWidth;
        context.moveTo(this.firstPointInOriginalImage.x, this.firstPointInOriginalImage.y);
        context.lineTo(this.secondPointInOriginalImage.x, this.secondPointInOriginalImage.y);
        context.lineTo(this.thirdPointInOriginalImage.x, this.thirdPointInOriginalImage.y);
        context.stroke();
    };
    AngleRoi.prototype.checkSelectedWithPoint = function (pointInOriginImage, presentationImage) {
    };
    AngleRoi.prototype.moveTo = function (pointInOriginImage, presentationImage) {
    };
    return AngleRoi;
}());

//# sourceMappingURL=AngleRoi.js.map

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisplaySet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PresentationImage__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Frame__ = __webpack_require__(641);


/**
 * Created by binsirMac on 2016-12-26.
 */
var DisplaySet = (function () {
    function DisplaySet() {
        this.presentationImages = [];
    }
    DisplaySet.generateFromSeries = function (study, series) {
        var displaySet = new DisplaySet();
        if (series != null && series.image != null) {
            var images = series.image;
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var image = images_1[_i];
                var frames_1 = this.generateFromImage(study, series, image);
                for (var _a = 0, frames_2 = frames_1; _a < frames_2.length; _a++) {
                    var frame = frames_2[_a];
                    var presentationImage = new __WEBPACK_IMPORTED_MODULE_0__PresentationImage__["a" /* PresentationImage */]();
                    presentationImage.frameReference = frame;
                    presentationImage.parentDisplaySet = displaySet;
                    displaySet.presentationImages.push(presentationImage);
                }
            }
        }
        return displaySet;
    };
    DisplaySet.generateFromImage = function (study, series, image) {
        if (image.frames == 0) {
            var frame = new __WEBPACK_IMPORTED_MODULE_1__model_Frame__["a" /* Frame */](study, series, image, 1);
            return [frame];
        }
        var frames = [];
        for (var i = 1; i <= image.frames; i++) {
            var frame = new __WEBPACK_IMPORTED_MODULE_1__model_Frame__["a" /* Frame */](study, series, image, i);
            frames.push(frame);
        }
        return frames;
    };
    return DisplaySet;
}());

//# sourceMappingURL=DisplaySet.js.map

/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logger */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PresentationImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_CGSize__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_CGRect__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dto_RetrieveImageRequest__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Config__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_ImageOperatingType__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_ArrayUtils__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_typescript_logging__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_typescript_logging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_typescript_logging__);












var factory = __WEBPACK_IMPORTED_MODULE_11_typescript_logging__["LFService"].createLoggerFactory();
var logger = factory.getLogger("PresentationImage");
/**
 * Created by binsirMac on 2016-12-26.
 */
var PresentationImage = (function () {
    function PresentationImage() {
        this.isNeedToComputeLen = false;
        this._scaleAspectFit = true;
        this.rois = [];
        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp;
    }
    Object.defineProperty(PresentationImage.prototype, "currentSize", {
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_1__common_CGSize__["a" /* CGSize */](this.originalSize.width * this.aspectScale, this.originalSize.height * this.aspectScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "currentTileSize", {
        get: function () {
            return this.parentTileView.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "originalSize", {
        get: function () {
            if (this._originalSize == null) {
                this._originalSize = new __WEBPACK_IMPORTED_MODULE_1__common_CGSize__["a" /* CGSize */](this.width, this.height);
            }
            return this._originalSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "aspectScale", {
        get: function () {
            if (this._aspectScale == null) {
                //default in the image's center point width/2, heigt/2.
                // this._aspectScale = new CGPoint(Math.ceil(this.width/2),Math.ceil(this.height/2));
                if (this.parentTileView) {
                    var rect = this.parentTileView.displayRect();
                    var sx = rect.width / this.frameReference.parentImageSop.width;
                    var sy = rect.height / this.frameReference.parentImageSop.height;
                    this._aspectScale = sx > sy ? sy : sx;
                }
            }
            return this._aspectScale;
        },
        set: function (value) {
            this.scaleAspectFit = false;
            if (value != this._aspectScale) {
                var tempX = this.lenCenterAtImage.x - (this.aspectScale * this.width - this.width) / 2;
                if (tempX < this.parentTileView.displayRect().width && tempX > (-this.parentTileView.displayRect().width)) {
                    this.lenCenterAtImage.x = tempX;
                }
                var tempY = this.lenCenterAtImage.y - (this.aspectScale * this.height - this.height) / 2;
                if (tempY < this.parentTileView.displayRect().height && tempY > (-this.parentTileView.displayRect().height)) {
                    this.lenCenterAtImage.y = tempY;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "lenCenterAtImage", {
        get: function () {
            if (this._lenCenterAtImage == null) {
                //default in the image's center point width/2, heigt/2.
                // this._lenCenterAtImage = new CGPoint(Math.ceil(this.width/2),Math.ceil(this.height/2));
                this._lenCenterAtImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](0, 0);
            }
            return this._lenCenterAtImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "currentWindowCenter", {
        get: function () {
            if (this._currentWindowCenter == null) {
                this._currentWindowCenter = this.windowCenter;
            }
            return this._currentWindowCenter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "currentWindowWidth", {
        get: function () {
            if (this._currentWindowWidth == null) {
                this._currentWindowWidth = this.windowWidth;
            }
            return this._currentWindowWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "patientName", {
        get: function () {
            if (this._patientName == null) {
                this._patientName = this.frameReference.parentStudy.patientsName;
            }
            return this._patientName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "patientId", {
        get: function () {
            if (this._patientId == null) {
                this._patientId = this.frameReference.parentStudy.patientId;
            }
            return this._patientId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "instanceNumber", {
        get: function () {
            if (this._instanceNumber == null) {
                this._instanceNumber = this.frameReference.parentImageSop.instanceNumber;
            }
            return this._instanceNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "pixelSpacingX", {
        get: function () {
            if (this._pixelSpacingX == null) {
                this._pixelSpacingX = this.frameReference.parentImageSop.pixelSpacingX;
            }
            return this._pixelSpacingX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "pixelSpacingY", {
        get: function () {
            if (this._pixelSpacingY == null) {
                this._pixelSpacingY = this.frameReference.parentImageSop.pixelSpacingY;
            }
            return this._pixelSpacingY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "imagerPixelSpacingX", {
        get: function () {
            if (this._imagerPixelSpacingX == null) {
                this._imagerPixelSpacingX = this.frameReference.parentImageSop.imagerPixelSpacingH;
            }
            return this._imagerPixelSpacingX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "imagerPixelSpacingY", {
        get: function () {
            if (this._imagerPixelSpacingY == null) {
                this._imagerPixelSpacingY = this.frameReference.parentImageSop.imagerPixelSpacingV;
            }
            return this._imagerPixelSpacingY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "samplesPerPixel", {
        get: function () {
            if (this._samplesPerPixel == null) {
                this._samplesPerPixel = this.frameReference.parentImageSop.samplesPerPixel;
            }
            return this._samplesPerPixel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "derivationDescription", {
        get: function () {
            if (this._derivationDescription == null) {
                this._derivationDescription = this.frameReference.parentImageSop.derivationDescription;
            }
            return this._derivationDescription;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "windowCenter", {
        get: function () {
            if (this._windowCenter == null) {
                this._windowCenter = Number(this.frameReference.parentImageSop.windowCenter);
            }
            return this._windowCenter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "windowWidth", {
        get: function () {
            if (this._windowWidth == null) {
                this._windowWidth = Number(this.frameReference.parentImageSop.windowWidth);
            }
            return this._windowWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "bitAllocated", {
        get: function () {
            if (this._bitAllocated == null) {
                this._bitAllocated = this.frameReference.parentImageSop.bitAllocated;
            }
            return this._bitAllocated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "bitsStored", {
        get: function () {
            if (this._bitsStored == null) {
                this._bitsStored = this.frameReference.parentImageSop.bitsStored;
            }
            return this._bitsStored;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "width", {
        get: function () {
            if (this._width == null) {
                this._width = this.frameReference.parentImageSop.width;
            }
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "height", {
        get: function () {
            if (this._height == null) {
                this._height = this.frameReference.parentImageSop.height;
            }
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    PresentationImage.prototype.addRoi = function (roi) {
        this.rois.push(roi);
    };
    PresentationImage.prototype.checkSelectedRoiWithPoint = function (pointInLens) {
        var _this = this;
        var result = false;
        //    CGPoint pointInOriginImage = [self convertToPointInOriginalImage:pointInLens];
        this.rois.forEach(function (roi) {
            roi.selected = false;
        });
        this.rois.forEach(function (roi) {
            result = roi.checkSelectedWithPoint(pointInLens, _this);
            if (result) {
                roi.selected = true;
                return result;
            }
        });
        return result;
    };
    PresentationImage.prototype.getSelectedRoi = function () {
        this.rois.forEach(function (roi) {
            if (roi.selected) {
                return roi;
            }
        });
        return null;
    };
    PresentationImage.prototype.removeSelectedRoi = function () {
        var selectedRoi;
        this.rois.forEach(function (roi) {
            if (roi.selected) {
                selectedRoi = roi;
            }
        });
        if (selectedRoi) {
            __WEBPACK_IMPORTED_MODULE_9__common_ArrayUtils__["a" /* ArrayUtils */].removeByValue(this.rois, selectedRoi);
        }
        else {
            //if no roi selection, should remove the last one.
            this.rois.pop();
        }
    };
    Object.defineProperty(PresentationImage.prototype, "imageOrientation", {
        get: function () {
            return this._imageOrientation;
        },
        set: function (imageOrientation) {
            this._imageOrientation = imageOrientation;
            if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AxOperationScope != __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__["a" /* OperationScope */].ImageScope) {
                __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["b" /* EventTypes */].PropagateNotification, this, { 'imageOrientation': this._imageOrientation, 'isUsingPreset': this.isUsingPreset });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "inverted", {
        get: function () {
            return this._inverted;
        },
        set: function (inverted) {
            this._inverted = inverted;
            if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AxOperationScope != __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__["a" /* OperationScope */].ImageScope) {
                __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["b" /* EventTypes */].PropagateNotification, this, { 'inverted': this.inverted, 'isUsingPreset': this.isUsingPreset });
            }
        },
        enumerable: true,
        configurable: true
    });
    PresentationImage.prototype.setAspectScale = function (aspectScale, zoomLocationInLens) {
        this.aspectScale = aspectScale;
        //    _zoomLocationInLens = zoomLocationInLens;
    };
    Object.defineProperty(PresentationImage.prototype, "lensRect", {
        get: function () {
            return this._lensRect;
        },
        set: function (lensRect) {
            this._lensRect = lensRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PresentationImage.prototype, "scaleAspectFit", {
        set: function (scaleAspectFit) {
            this._scaleAspectFit = scaleAspectFit;
            if (scaleAspectFit) {
                this.computeFitPresentation();
            }
            if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AxOperationScope != __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__["a" /* OperationScope */].ImageScope) {
                __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["b" /* EventTypes */].PropagateNotification, this, { 'scaleAspectFit': this.scaleAspectFit, 'isUsingPreset': this.isUsingPreset });
            }
        },
        enumerable: true,
        configurable: true
    });
    PresentationImage.prototype.computePresentationParams = function () {
        var oldScale = this.aspectScale;
        if (this.scaleAspectFit) {
            this.computeFitPresentation();
        }
        else {
            var _currentTileSize = this.currentTileSize;
            this.updateDisplayParams(_currentTileSize);
        }
        if (oldScale != this._aspectScale) {
            __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["b" /* EventTypes */].ScaleChangeNotification, this, { 'aspectScale': this.aspectScale });
        }
        ;
    };
    PresentationImage.prototype.updateDisplayParams = function (tileSize) {
        if (this.isNeedToComputeLen) {
            var orientation_1 = this.imageOrientation; //[self getImageCurrentOrientation];
            switch (orientation_1) {
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                    {
                        this._lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this._lenCenterAtImage.x * this._aspectScale - tileSize.width / 2, this._lenCenterAtImage.y * this._aspectScale - tileSize.height / 2, tileSize.width, tileSize.height);
                    }
                    break;
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
                case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                    {
                        this._lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this._lenCenterAtImage.x * this._aspectScale - tileSize.height / 2, this._lenCenterAtImage.y * this._aspectScale - tileSize.width / 2, tileSize.height, tileSize.width);
                    }
                    break;
                default:
                    break;
            }
        }
    };
    PresentationImage.prototype.resetAllValuesFromNotif = function () {
        this._currentWindowCenter = this.windowCenter;
        this._currentWindowWidth = this.windowWidth;
        this.isUsingPreset = false;
        this._scaleAspectFit = true;
        this._inverted = false;
        this._imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp;
        var tileSize = this.currentTileSize;
        if (tileSize.width != 0 && tileSize.height != 0) {
            this.resetLensAndCurrentSize(tileSize);
        }
        this.rois = [];
    };
    PresentationImage.prototype.computeFitPresentation = function () {
        var _currentTileSize = this.currentTileSize;
        var _originalImageSize = this.originalSize;
        var orientation = this.imageOrientation; //[self getImageCurrentOrientation];
        switch (orientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                {
                    var sx = _currentTileSize.width / _originalImageSize.width;
                    var sy = _currentTileSize.height / _originalImageSize.height;
                    var newScale = Math.min(sx, sy);
                    this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */]((_originalImageSize.width * newScale - _currentTileSize.width) / 2, (_originalImageSize.height * newScale - _currentTileSize.height) / 2, _currentTileSize.width, _currentTileSize.height);
                    this.aspectScale = newScale;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                {
                    var sx = _currentTileSize.width / _originalImageSize.height;
                    var sy = _currentTileSize.height / _originalImageSize.width;
                    var newScale = Math.min(sx, sy);
                    this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */]((_originalImageSize.width * newScale - _currentTileSize.height) / 2, (_originalImageSize.height * newScale - _currentTileSize.width) / 2, _currentTileSize.height, _currentTileSize.width);
                    this.aspectScale = newScale;
                }
                break;
            default:
                break;
        }
    };
    PresentationImage.prototype.computeScalePresentation = function () {
        var orientation = this.imageOrientation; //[self getImageCurrentOrientation];
        switch (orientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                break;
            default:
                break;
        }
    };
    PresentationImage.prototype.computeLensRectWithOldTileSize = function (oldTileSize) {
        var _currentTileSize = this.currentTileSize;
        var orientation = this.imageOrientation; //[self getImageCurrentOrientation];
        switch (orientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + oldTileSize.width / 2.0 - _currentTileSize.width / 2.0, this.lensRect.origin.y + oldTileSize.height / 2.0 - _currentTileSize.height / 2.0, _currentTileSize.width, _currentTileSize.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + oldTileSize.height / 2.0 - _currentTileSize.height / 2.0, this.lensRect.origin.y + oldTileSize.width / 2.0 - _currentTileSize.width / 2.0, _currentTileSize.height, _currentTileSize.width);
                break;
            default:
                break;
        }
    };
    PresentationImage.prototype.reComputeLensSizeAgainstScope = function () {
        //for the stored
        this._lenCenterAtImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.preScopeLenCenterInImage.x / this.preScopeOriginalImageSize.width * this.originalSize.width, this.preScopeLenCenterInImage.y / this.preScopeOriginalImageSize.height * this.originalSize.height);
    };
    PresentationImage.prototype.setTileViewSize = function (tileSize, rotated, centerPoint) {
        if (this._scaleAspectFit) {
            this.computeFitPresentation();
            return;
        }
        else {
            if (rotated) {
                this.isNeedToComputeLen = true;
            }
            else {
                this.isNeedToComputeLen = true;
            }
        }
    };
    PresentationImage.prototype.resetLensAndCurrentSize = function (tileSize) {
        var sx = tileSize.width / this.originalSize.width;
        var sy = tileSize.height / this.originalSize.height;
        var newScale = Math.min(sx, sy);
        this.aspectScale = newScale;
        //set the lens rect
        this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */]((this.originalSize.width * this.aspectScale - tileSize.width) / 2, (this.originalSize.height * this.aspectScale - tileSize.height) / 2, tileSize.width, tileSize.height);
    };
    PresentationImage.prototype.reset = function () {
        this.resetAllValues();
        if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AxOperationScope != __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__["a" /* OperationScope */].ImageScope) {
            __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["b" /* EventTypes */].ScaleChangeNotification, this, { 'resetToOriginal': 'resetToOriginal' });
        }
    };
    PresentationImage.prototype.resetAllValues = function () {
        this.isUsingPreset = false;
        this.setWL(this.windowWidth, this.windowCenter);
        this._scaleAspectFit = true;
        this._inverted = true;
        this._imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp;
        var tileSize = this.currentTileSize;
        if (tileSize.width != 0 && tileSize.height != 0) {
            this.resetLensAndCurrentSize(tileSize);
        }
        this.rois = [];
    };
    PresentationImage.prototype.resizeImageWithScale = function (newScale, locationInLens, tileViewCenter) {
        /*remove the scale check at 2013-07-10
         if (newScale > self.maxAspectScale || newScale < self.minAspectScale) {
         return;
         }*/
        // recompute the lens rect
        this.computeLensWithScale(newScale, locationInLens);
        //    [self setAspectScale:newScale withZoomLocationInLens:locationInLens];
        this._aspectScale = newScale;
        this._scaleAspectFit = false;
        this._lenCenterAtImage = this.convertToPointInOriginalImage(tileViewCenter);
        if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AxOperationScope != __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__["a" /* OperationScope */].ImageScope) {
            __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["b" /* EventTypes */].ScaleChangeNotification, this, { 'lensRect': this._lensRect, 'aspectScale': this._aspectScale, 'lenCenterInImage': this._lenCenterAtImage,
                'originalImageSize': this.originalSize, 'scaleAspectFit': this._scaleAspectFit, 'isUsingPreset': this.isUsingPreset });
        }
        // update the presentational properties
        //    self.zoomLocationInLens = locationInLens;
        //
        //    self.aspectScale = newScale;
    };
    PresentationImage.prototype.computeLensWithScale = function (newScale, locationInLens) {
        var locationInOriginal = this.convertToPointInOriginalImage(locationInLens);
        var orientation = this.imageOrientation; //[self getImageCurrentOrientation];
        var _currentTileSize = this.currentTileSize;
        switch (orientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInOriginal.x * newScale - locationInLens.x, locationInOriginal.y * newScale - locationInLens.y, this.lensRect.size.width, this.lensRect.size.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInLens.x - _currentTileSize.width + locationInOriginal.x * newScale, locationInOriginal.y * newScale - locationInLens.y, this.lensRect.size.width, this.lensRect.size.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInLens.x - _currentTileSize.width + locationInOriginal.x * newScale, locationInLens.y - _currentTileSize.height + locationInOriginal.y * newScale, this.lensRect.size.width, this.lensRect.size.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInOriginal.x * newScale - locationInLens.x, locationInLens.y - _currentTileSize.height + locationInOriginal.y * newScale, this.lensRect.size.width, this.lensRect.size.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInLens.y - _currentTileSize.height + locationInOriginal.x * newScale, locationInOriginal.y * newScale - locationInLens.x, this.lensRect.size.width, this.lensRect.size.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInOriginal.y * newScale - locationInLens.y, locationInOriginal.y * newScale - locationInLens.x, this.lensRect.size.width, this.lensRect.size.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInOriginal.x * newScale - locationInLens.y, locationInLens.x - _currentTileSize.width + locationInOriginal.y * newScale, this.lensRect.size.width, this.lensRect.size.height);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](locationInLens.y - _currentTileSize.height + locationInOriginal.x * newScale, locationInLens.x - _currentTileSize.width + locationInOriginal.y * newScale, this.lensRect.size.width, this.lensRect.size.height);
                break;
            default:
                break;
        }
        this.isNeedToComputeLen = false;
    };
    PresentationImage.prototype.changed = function (widthStep, centerStep) {
        //    CGFloat newWindowCenter = self.currentWindowCenter + centerStep;//self.currentSensitivity * centerStep;//(self.currentSensitivity * centerStep/self.bitDepth);
        //    CGFloat newWindowWidth = self.currentWindowWidth + widthStep;//self.currentSensitivity * widthStep;//(self.currentSensitivity * widthStep/self.bitDepth);
        var newWindowCenter = this.currentWindowCenter + this.currentSensitivity * centerStep; //(self.currentSensitivity * centerStep/self.bitDepth);
        var newWindowWidth = this.currentWindowWidth + this.currentSensitivity * widthStep; //(self.currentSensitivity * widthStep/self.bitDepth);
        //window width(0028,1051) shall always be greater than or equal to 1
        if (newWindowWidth < 1) {
            newWindowWidth = 1;
        }
        //    NSLog(@"window level - width :%f center :%f",newWindowWidth,newWindowCenter);
        this.setWL(newWindowWidth, newWindowCenter);
    };
    PresentationImage.prototype.convertToPointInOriginalImage = function (locationInLens) {
        return this.convertToPointInOriginalImageWithScale(locationInLens, this.aspectScale);
    };
    PresentationImage.prototype.convertToPointInOriginalImageWithScale = function (locationInLens, scale) {
        var _currentTileSize = this.currentTileSize;
        var locationInOldImage;
        var orientation = this.imageOrientation; //[self getImageCurrentOrientation];
        switch (orientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + locationInLens.x, this.lensRect.origin.y + locationInLens.y);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + _currentTileSize.width - locationInLens.x, this.lensRect.origin.y + locationInLens.y);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + _currentTileSize.width - locationInLens.x, this.lensRect.origin.y + _currentTileSize.height - locationInLens.y);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + locationInLens.x, this.lensRect.origin.y + _currentTileSize.height - locationInLens.y);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + _currentTileSize.height - locationInLens.y, this.lensRect.origin.y + locationInLens.x);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + locationInLens.y, this.lensRect.origin.y + locationInLens.x);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + locationInLens.y, this.lensRect.origin.y + _currentTileSize.width - locationInLens.x);
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                locationInOldImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + _currentTileSize.height - locationInLens.y, this.lensRect.origin.y + _currentTileSize.width - locationInLens.x);
                break;
            default:
                break;
        }
        var locationInOriginalImage = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](locationInOldImage.x / scale, locationInOldImage.y / scale);
        return locationInOriginalImage;
    };
    PresentationImage.prototype.convertFromOriginalImageToLens = function (locationInOriginal) {
        var _currentTileSize = this.currentTileSize;
        var orientation = this.imageOrientation; //[self getImageCurrentOrientation];
        var currentAspectScale = this.aspectScale;
        switch (orientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](locationInOriginal.x * currentAspectScale - this.lensRect.origin.x, locationInOriginal.y * currentAspectScale - this.lensRect.origin.y);
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + _currentTileSize.width - locationInOriginal.x * currentAspectScale, locationInOriginal.y * currentAspectScale - this.lensRect.origin.y);
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.x + _currentTileSize.width - locationInOriginal.x * currentAspectScale, this.lensRect.origin.y + _currentTileSize.height - locationInOriginal.y * currentAspectScale);
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](locationInOriginal.x * currentAspectScale - this.lensRect.origin.x, this.lensRect.origin.y + _currentTileSize.height - locationInOriginal.y * currentAspectScale);
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](locationInOriginal.y * currentAspectScale - this.lensRect.origin.y, this.lensRect.origin.x + _currentTileSize.height - locationInOriginal.x * currentAspectScale);
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](locationInOriginal.y * currentAspectScale - this.lensRect.origin.y, locationInOriginal.x * currentAspectScale - this.lensRect.origin.x);
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.y + _currentTileSize.width - locationInOriginal.y * currentAspectScale, locationInOriginal.x * currentAspectScale - this.lensRect.origin.x);
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                return new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.lensRect.origin.y + _currentTileSize.width - locationInOriginal.y * currentAspectScale, this.lensRect.origin.x + _currentTileSize.height - locationInOriginal.x * currentAspectScale);
            default:
                break;
        }
    };
    PresentationImage.prototype.convertToPointInNewImageWithScale = function (locationInLens, newScale) {
        var locationInOriginalImage = this.convertToPointInOriginalImage(locationInLens); //CGPointMake(locationInLens.x + _lensRect.origin.x, locationInLens.y + _lensRect.origin.y);
        var locationInNewImage = this.convertFromOriginalImageToLens(locationInOriginalImage); //CGPointMake(locationInOriginalImage.x * newScale, locationInOriginalImage.y * newScale);
        return locationInNewImage;
    };
    //finite-state machine
    PresentationImage.prototype.orientImageWith = function (orientType) {
        switch (this.imageOrientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        {
                            this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown;
                            if (!this.scaleAspectFit) {
                                this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                switch (orientType) {
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipHoriz:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].FlipVert:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateLeft:
                        if (!this.scaleAspectFit) {
                            this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                        }
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored;
                        break;
                    case __WEBPACK_IMPORTED_MODULE_6__common_ImageOrientType__["a" /* ImageOrientType */].RotateRight:
                        this.imageOrientation = __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored;
                        if (!this.scaleAspectFit) {
                            this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](this.lensRect.origin.x + this.lensRect.size.width / 2.0 - this.lensRect.size.height / 2.0, this.lensRect.origin.y + this.lensRect.size.height / 2.0 - this.lensRect.size.width / 2.0, this.lensRect.size.height, this.lensRect.size.width);
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        if (this.scaleAspectFit) {
            this.computeFitPresentation();
        }
    };
    /**
     * Draw the presentation image in the given client Rect under the context
     *
     * @param rect
     * @param context
     */
    PresentationImage.prototype.drawInRect = function (rect, context) {
        // let rect: CGRect = this.lensRect;//this.parentTileView.displayRect();
        var _this = this;
        logger.info("draw the image in the rect,X:" + rect.x + ",Y:" + rect.y + ",width:" + rect.width + ",height:" + rect.height);
        var img = new Image();
        if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].imageOperatingType == __WEBPACK_IMPORTED_MODULE_8__common_ImageOperatingType__["a" /* ImageOperatingType */].ImageOperatingTypeMeasure) {
            //draw the roi
            this.drawRois(context);
        }
        else {
            img.onload = (function () {
                if (_this.parentTileView == null) {
                    return;
                }
                _this.parentTileView.removeLoadingImg();
                var imgWidth = img.width;
                var imgHeight = img.height;
                if (_this.inverted) {
                    var imgData = _this.loadFromImage(img);
                    for (var i = 0; i < imgData.data.length; i += 4) {
                        imgData.data[i] = 255 - imgData.data[i];
                        imgData.data[i + 1] = 255 - imgData.data[i + 1];
                        imgData.data[i + 2] = 255 - imgData.data[i + 2];
                        imgData.data[i + 3] = 255;
                    }
                    context.putImageData(imgData, (rect.width - imgWidth) / 2, (rect.height - imgHeight) / 2);
                }
                else {
                    context.drawImage(img, (rect.width - imgWidth) / 2, (rect.height - imgHeight) / 2, imgWidth, imgHeight);
                }
                //draw the roi
                _this.drawRois(context);
                //draw the rulers
                _this.parentTileView.drawRulers();
                _this.currentDisplayImage = img;
            });
            img.onerror = (function (e) {
                console.log(e);
                _this.parentTileView.removeLoadingImg();
                _this.parentTileView.displayError();
            });
            img.crossOrigin = 'Anonymous';
            img.src = this.generateURL(rect);
        }
    };
    /**
     * decode the jpeg image downloaded from AxVS.
     *
     * @param img
     * @returns {ImageData}
     */
    PresentationImage.prototype.loadFromImage = function (img) {
        var w = img.width;
        var h = img.height;
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, w, h); // some browsers synchronously decode image here
    };
    PresentationImage.prototype.generateURL = function (rect) {
        return __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AXVS_ADDRESS + "/services/image?access_token=" + __WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AXVS_ACCESS_TOKEN + "&" + this.convert2RetrieveImageRequest(rect).toURI();
    };
    PresentationImage.prototype.changeWindowLevel = function (widthStep, centerStep) {
        this._currentWindowCenter = this._currentWindowCenter + centerStep;
        this._currentWindowWidth = this._currentWindowWidth + widthStep;
    };
    PresentationImage.prototype.convert2RetrieveImageRequest = function (rect) {
        var newRetrieveImageRequest = new __WEBPACK_IMPORTED_MODULE_3__dto_RetrieveImageRequest__["a" /* RetrieveImageRequest */]();
        newRetrieveImageRequest.studyUID = this.frameReference.parentStudy.studyUID;
        newRetrieveImageRequest.seriesUID = this.frameReference.parentSeries.seriesUID;
        newRetrieveImageRequest.objectUID = this.frameReference.parentImageSop.imageUID;
        /**
         * From 1 to n.
         */
        newRetrieveImageRequest.frameNumber = this.frameReference.parentImageSop.frames;
        //newRetrieveImageRequest.hasOverlay = number;
        //background : string;
        //tiles : string;
        newRetrieveImageRequest.windowWidth = Math.round(this.currentWindowWidth);
        newRetrieveImageRequest.windowCenter = Math.round(this.currentWindowCenter);
        if (this.aspectScale == null) {
            var sx = rect.width / this.frameReference.parentImageSop.width;
            var sy = rect.height / this.frameReference.parentImageSop.height;
            this.aspectScale = sx > sy ? sy : sx;
            // newRetrieveImageRequest.zoom = this.aspectScale;
        } //else {
        //compRate : number;
        if (this.parentTileView) {
            newRetrieveImageRequest.viewWidth = Math.round(rect.width);
            newRetrieveImageRequest.viewHeight = Math.round(rect.height);
            // newRetrieveImageRequest.originX = this.parentTileView.frame.x;
            // newRetrieveImageRequest.originY = this.parentTileView.frame.y;
            newRetrieveImageRequest.originX = this.lenCenterAtImage.x;
            newRetrieveImageRequest.originY = this.lenCenterAtImage.y;
        }
        newRetrieveImageRequest.zoom = this.aspectScale;
        // }
        // zoomMethod : string;
        //roiType : string;
        //roiLeft : string;
        //roiRight : string;
        //roiBottom : string;
        //roiTop : string;
        //modalityLutIndex : number;
        //voiLutIndex : number;
        //isKeyOperation : number;
        return newRetrieveImageRequest;
    };
    PresentationImage.prototype.setWL = function (windowCenter, windowWidth) {
        this._currentWindowCenter = windowCenter;
        this._currentWindowWidth = windowWidth;
        if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AxOperationScope != __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__["a" /* OperationScope */].ImageScope) {
            __WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["a" /* EventDispatcher */].getInstance().dispatch(__WEBPACK_IMPORTED_MODULE_10__common_EventDispatcher__["b" /* EventTypes */].ScaleChangeNotification, this, { 'currentWindowCenter': this.currentWindowCenter, 'currentWindowWidth': this.currentWindowWidth, 'isUsingPreset': this.isUsingPreset });
        }
    };
    PresentationImage.prototype.drawRois = function (context) {
        for (var _i = 0, _a = this.rois; _i < _a.length; _i++) {
            var roi = _a[_i];
            roi.drawRoiOnImage(context, this);
        }
    };
    PresentationImage.prototype.fminf = function (sx, sy) {
        return sx > sy ? sy : sx;
    };
    PresentationImage.prototype.moveToXToY = function (x, y) {
        var point = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](x, y);
        var lensRect = this.lensRect;
        var lensCenter = this.parentTileView.center;
        lensCenter = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](lensCenter.x - this.parentTileView.frame.origin.x, lensCenter.y - this.parentTileView.frame.origin.y);
        var xLens, yLens, xCenterLens, yCenterLens;
        var orientation = this.imageOrientation; //[self getImageCurrentOrientation];
        switch (orientation) {
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUp:
                xLens = lensRect.origin.x - point.x;
                yLens = lensRect.origin.y - point.y;
                xCenterLens = lensCenter.x - point.x;
                yCenterLens = lensCenter.y - point.y;
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationUpMirrored:
                xLens = lensRect.origin.x + point.x;
                yLens = lensRect.origin.y - point.y;
                xCenterLens = lensCenter.x + point.x;
                yCenterLens = lensCenter.y - point.y;
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDown:
                xLens = lensRect.origin.x + point.x;
                yLens = lensRect.origin.y + point.y;
                xCenterLens = lensCenter.x + point.x;
                yCenterLens = lensCenter.y + point.y;
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationDownMirrored:
                xLens = lensRect.origin.x - point.x;
                yLens = lensRect.origin.y + point.y;
                xCenterLens = lensCenter.x - point.x;
                yCenterLens = lensCenter.y + point.y;
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeftMirrored:
                xLens = lensRect.origin.x - point.y;
                yLens = lensRect.origin.y - point.x;
                xCenterLens = lensCenter.x - point.y;
                yCenterLens = lensCenter.y - point.x;
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRight:
                xLens = lensRect.origin.x - point.y;
                yLens = lensRect.origin.y + point.x;
                xCenterLens = lensCenter.x - point.y;
                yCenterLens = lensCenter.y + point.x;
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationRightMirrored:
                xLens = lensRect.origin.x + point.y;
                yLens = lensRect.origin.y + point.x;
                xCenterLens = lensCenter.x + point.y;
                yCenterLens = lensCenter.y + point.x;
                break;
            case __WEBPACK_IMPORTED_MODULE_5__common_UIImageOrientation__["a" /* UIImageOrientation */].UIImageOrientationLeft:
                xLens = lensRect.origin.x + point.y;
                yLens = lensRect.origin.y - point.x;
                xCenterLens = lensCenter.x + point.y;
                yCenterLens = lensCenter.y - point.x;
                break;
            default:
                break;
        }
        this.lensRect = new __WEBPACK_IMPORTED_MODULE_2__common_CGRect__["a" /* CGRect */](xLens, yLens, lensRect.size.width, lensRect.size.height);
        this.scaleAspectFit = false;
        this.isNeedToComputeLen = false;
        this._lenCenterAtImage = this.convertToPointInOriginalImage(lensCenter);
        if (__WEBPACK_IMPORTED_MODULE_4__Config__["a" /* Config */].AxOperationScope != __WEBPACK_IMPORTED_MODULE_7__common_OperationScope__["a" /* OperationScope */].ImageScope) {
            // NSDictionaryy * info = [NSDictionary dictionaryWithObjectsAndKeys:
            // [NSValue valueWithCGRect:_lensRect],   @"lensRect",
            // [NSString stringWithFormat:@"%f",_aspectScale],   @"aspectScale",
            // [NSValue valueWithCGSize:self.originalSize],   @"originalImageSize",
            // [NSValue valueWithCGPoint:_lenCenterAtImage],   @"lenCenterInImage",
            // [NSString stringWithFormat:@"%d",_scaleAspectFit],   @"scaleAspectFit",
            // [NSString stringWithFormat:@"%d",_isUsingPreset],   @"isUsingPreset",
            // nil];
            // [[NSNotificationCenter defaultCenter] postNotificationName:AxPropagateNotification object:self userInfo:info];
        }
    };
    return PresentationImage;
}());

//# sourceMappingURL=PresentationImage.js.map

/***/ }),

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RetrieveImageRequest; });
/**
 * Created by binsirMac on 2016-12-28.
 */
var RetrieveImageRequest = (function () {
    function RetrieveImageRequest() {
    }
    RetrieveImageRequest.prototype.construct = function () { };
    RetrieveImageRequest.prototype.toURI = function () {
        //let result = `studyUID=${this.studyUID}&seriesUID=${this.seriesUID}&objectUID=${this.objectUID}&frameNumber=${this.frameNumber}&hasOverlay=${this.hasOverlay}&background=${this.background}&tiles=${this.tiles}&windowWidth=${this.windowWidth}&windowCenter=${this.windowCenter}&compRate=${this.compRate}&viewWidth=${this.viewWidth}&viewHeight=${this.viewHeight}&originX=${this.originX}&originY=${this.originY}&zoom=${this.zoom}&zoomMethod=${this.zoomMethod}&roiType=${this.roiType}&roiLeft=${this.roiLeft}&roiRight=${this.roiRight}&roiBottom=${this.roiBottom}&roiTop=${this.roiTop}&modalityLutIndex=${this.modalityLutIndex}&voiLutIndex=${this.voiLutIndex}&isKeyOperation=${this.isKeyOperation}`;
        var result = "studyUID=" + this.studyUID + "&seriesUID=" + this.seriesUID + "&objectUID=" + this.objectUID;
        if (this.windowWidth) {
            result = result + ("&windowWidth=" + this.windowWidth);
        }
        if (this.windowCenter) {
            result = result + ("&windowCenter=" + this.windowCenter);
        }
        if (this.zoom) {
            result = result + ("&zoom=" + this.zoom + "&zoomMethod=Interpolation");
        }
        if (this.viewWidth) {
            result = result + ("&viewWidth=" + this.viewWidth);
        }
        if (this.viewHeight) {
            result = result + ("&viewHeight=" + this.viewHeight);
        }
        //the dicom image in the view Coordinate
        if (this.originX) {
            result = result + ("&originX=" + this.originX);
        }
        if (this.originY) {
            result = result + ("&originY=" + this.originY);
        }
        return result.replace(/undefined/g, '');
    };
    return RetrieveImageRequest;
}());

//# sourceMappingURL=RetrieveImageRequest.js.map

/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageOrientType; });
/**
 * Created by kai on 22/10/2017.
 */
/**
 * Created by kai on 22/10/2017.
 */ var ImageOrientType;
(function (ImageOrientType) {
    ImageOrientType[ImageOrientType["RotateLeft"] = 0] = "RotateLeft";
    ImageOrientType[ImageOrientType["RotateRight"] = 1] = "RotateRight";
    ImageOrientType[ImageOrientType["FlipHoriz"] = 2] = "FlipHoriz";
    ImageOrientType[ImageOrientType["FlipVert"] = 3] = "FlipVert";
})(ImageOrientType || (ImageOrientType = {}));
;
//# sourceMappingURL=ImageOrientType.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EventTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDispatcher; });
/**
 * Created by binsirMac on 2016-12-27.
 */
/** Models an event with a generic sender and generic arguments */
/**
 * Created by binsirMac on 2016-12-27.
 */ var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["SelectTileView"] = 0] = "SelectTileView";
    EventTypes[EventTypes["ChangeOperatingType"] = 1] = "ChangeOperatingType";
    EventTypes[EventTypes["Resize"] = 2] = "Resize";
    EventTypes[EventTypes["PanImage"] = 3] = "PanImage";
    EventTypes[EventTypes["ChangePreset"] = 4] = "ChangePreset";
    EventTypes[EventTypes["PlayCine"] = 5] = "PlayCine";
    EventTypes[EventTypes["PausedCine"] = 6] = "PausedCine";
    EventTypes[EventTypes["ScaleChangeNotification"] = 7] = "ScaleChangeNotification";
    EventTypes[EventTypes["PropagateNotification"] = 8] = "PropagateNotification";
    EventTypes[EventTypes["OverlayChangeNotification"] = 9] = "OverlayChangeNotification";
    EventTypes[EventTypes["NeedsDisplayNotification"] = 10] = "NeedsDisplayNotification";
})(EventTypes || (EventTypes = {}));
/** The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of the event */
var EventDispatcher = (function () {
    function EventDispatcher() {
        this._subscriptions = new Map();
        // do something construct...
    }
    EventDispatcher.getInstance = function () {
        if (!EventDispatcher.instance) {
            EventDispatcher.instance = new EventDispatcher();
            // ... any one time initialization goes here ...
        }
        return EventDispatcher.instance;
    };
    EventDispatcher.prototype.clear = function () {
        this._subscriptions.clear();
    };
    EventDispatcher.prototype.subscribe = function (eventType, fn) {
        var actions = this._subscriptions.get(eventType);
        if (actions == null) {
            actions = new Array();
            this._subscriptions.set(eventType, actions);
        }
        actions.push(fn);
    };
    EventDispatcher.prototype.unsubscribe = function (eventType, fn) {
        var actions = this._subscriptions.get(eventType);
        if (actions) {
            var i = actions.indexOf(fn);
            if (i > -1) {
                actions.splice(i, 1);
            }
        }
    };
    EventDispatcher.prototype.dispatch = function (eventType, sender, args) {
        if (this._subscriptions) {
            if (this._subscriptions.get(eventType)) {
                for (var _i = 0, _a = this._subscriptions.get(eventType); _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler(sender, args);
                }
            }
        }
    };
    return EventDispatcher;
}());

//# sourceMappingURL=EventDispatcher.js.map

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayUtils; });
/**
 * Created by kai on 28/10/2017.
 */
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    ArrayUtils.removeByValue = function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    };
    return ArrayUtils;
}());

//# sourceMappingURL=ArrayUtils.js.map

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Frame; });
/**
 * Created by binsirMac on 2016-12-26.
 */
var Frame = (function () {
    function Frame(parentStudy, parentSeries, parentImageSop, frameNumber) {
        this.parentStudy = parentStudy;
        this.parentSeries = parentSeries;
        this.parentImageSop = parentImageSop;
        this.frameNumber = frameNumber;
    }
    return Frame;
}());

//# sourceMappingURL=Frame.js.map

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StreamJSONStudyLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Config__ = __webpack_require__(46);

/**
 * Created by binsirMac on 2016-12-26.
 */
var StreamJSONStudyLoader = (function () {
    function StreamJSONStudyLoader(studyUID, studyStatus) {
        this.studyUID = studyUID;
        this.studyStatus = studyStatus;
    }
    StreamJSONStudyLoader.prototype.load = function () {
        return this.loadFromAxVS(__WEBPACK_IMPORTED_MODULE_0__Config__["a" /* Config */].AXVS_ADDRESS + "/services/query?studyUID=" + this.studyUID + "&studyStatus=MATCHED,UNMATCHED,NULL,VERIFIED,COMPLETED&viewer=flex&userId=&userName=&location=&workstationId=&displayName=&requestSys=&rowGuid=&access_token=" + __WEBPACK_IMPORTED_MODULE_0__Config__["a" /* Config */].AXVS_ACCESS_TOKEN).then(function (study) {
            console.log("Success!", study);
            //construct the Study Model
            //then return the new promise
            return new Promise(function (resolve, reject) {
                resolve(study);
            });
        }, function (error) {
            console.error("Failed!", error);
            return new Promise(function (resolve, reject) {
                reject(error);
            });
        });
    };
    StreamJSONStudyLoader.prototype.createAuthorizationCode = function (userId, pwd) {
        var base64Code = "Basic ";
        var sourceString = userId + ":" + pwd;
        var encoder = window.btoa(sourceString);
        base64Code = base64Code + encoder;
        return base64Code;
    };
    StreamJSONStudyLoader.prototype.loadFromAxVS = function (url) {
        var _this = this;
        // Return a new promise.
        return new Promise(function (resolve, reject) {
            // Do the usual XHR stuff
            var req = new XMLHttpRequest();
            req.open('GET', url);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.setRequestHeader("Authorization", _this.createAuthorizationCode('doctor', 'doctor'));
            req.onload = function () {
                // This is called even on 404 etc
                // so check the status
                if (req.status == 200) {
                    // Resolve the promise with the response text
                    var response = JSON.parse(req.response);
                    if (response.status == 'Success') {
                        if (response.studyList.study.length == 1) {
                            resolve(response.studyList.study[0]);
                        }
                        else {
                            reject(Error('Error return the study size.'));
                        }
                    }
                    else {
                        reject(Error('The selected study does not exist.'));
                    }
                }
                else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };
            // Handle network errors
            req.onerror = function () {
                reject(Error("Network Error"));
            };
            // Make the request
            req.send();
        });
    };
    return StreamJSONStudyLoader;
}());

//# sourceMappingURL=StreamJSONStudyLoader.js.map

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export logger */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinearRoiTool; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typescript_logging__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typescript_logging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_typescript_logging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RoiUtil__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_CGPoint__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinearRoi__ = __webpack_require__(644);




/**
 * Created by kai on 24/10/2017.
 */
var factory = __WEBPACK_IMPORTED_MODULE_0_typescript_logging__["LFService"].createLoggerFactory();
var logger = factory.getLogger("LinearRoiTool");
var LinearRoiTool = (function () {
    function LinearRoiTool() {
        this.drawing = false;
        this.trackingTouches = new Array();
        this.startPoints = new Array();
    }
    LinearRoiTool.shareLinearRoiTool = function () {
        return LinearRoiTool.instance;
    };
    LinearRoiTool.prototype.removeAllPoint = function () {
        this.trackingTouches = new Array();
    };
    LinearRoiTool.prototype.isDrawing = function () {
        return this.drawing;
    };
    LinearRoiTool.prototype.clearRoiTool = function () {
        this.removeAllPoint();
    };
    LinearRoiTool.prototype.touchesBegan = function (touch, touchedTileView) {
        logger.info('begin to draw the angel');
        if (this.drawing) {
            return;
        }
        this.drawing = true;
        this.trackingTouches.push(touch);
        var location = touchedTileView.getCanvasPos(touch);
        this.startPoints.push(location);
    };
    LinearRoiTool.prototype.touchesCancelled = function (touch, touchedTileView) {
        this.drawing = false;
        this.trackingTouches = new Array();
        this.startPoints = new Array();
    };
    LinearRoiTool.prototype.touchesMoved = function (touch, touchedTileView) {
    };
    LinearRoiTool.prototype.touchesEnded = function (touch, touchedTileView) {
        {
            var touchIndex = this.trackingTouches.indexOf(touch);
            if (touchIndex) {
                var startPoint = this.startPoints[touchIndex];
                var endPoint = touchedTileView.getCanvasPos(touch);
                var startPointInOriginalImage = touchedTileView.presentationImage.convertToPointInOriginalImage(startPoint);
                var endPointInOriginalImage = touchedTileView.presentationImage.convertToPointInOriginalImage(endPoint);
                var length_1 = __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].computeLengthFrom(startPointInOriginalImage, endPointInOriginalImage, touchedTileView.presentationImage);
                var linearRoi = new __WEBPACK_IMPORTED_MODULE_3__LinearRoi__["a" /* LinearRoi */](startPointInOriginalImage, endPointInOriginalImage, length_1);
                touchedTileView.presentationImage.addRoi(linearRoi);
                this.drawing = false;
                this.trackingTouches.splice(touchIndex, 1);
                this.startPoints.splice(touchIndex, 1);
            }
        }
        this.trackingTouches = new Array();
        this.startPoints = new Array();
    };
    LinearRoiTool.prototype.drawTemporaryIn = function (touchedTileView, context) {
        var _this = this;
        var presentationImage = touchedTileView.presentationImage;
        this.trackingTouches.forEach(function (touch, index) {
            var startPoint = _this.startPoints[index];
            var endPoint = touchedTileView.getCanvasPos(touch);
            __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawLineFrom(context, startPoint, endPoint, true);
            __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawVertiexAt(startPoint, context);
            __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawVertiexAt(endPoint, context);
            //2. draw the value
            var startPointInOriginalImage = presentationImage.convertToPointInOriginalImage(startPoint);
            var endPointInOriginalImage = presentationImage.convertToPointInOriginalImage(endPoint);
            var length = __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].computeLengthFrom(startPointInOriginalImage, endPointInOriginalImage, presentationImage);
            var pixelSpacingX = presentationImage.pixelSpacingX;
            var pixelSpacingY = presentationImage.pixelSpacingY;
            var imagerPixelSpacingX = presentationImage.imagerPixelSpacingX;
            var imagerPixelSpacingY = presentationImage.imagerPixelSpacingY;
            var lengthTextValue = 'ts';
            // if (pixelSpacingX != 0 || pixelSpacingY != 0)
            // {
            //   lengthTextValue = Aesthetics.AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMm, length] : [NSString stringWithFormat:AxFormatLengthCm, length];
            // }else if (imagerPixelSpacingX != 0 || imagerPixelSpacingY != 0)
            // {
            //   lengthTextValue = AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMmImager, length] : [NSString stringWithFormat:AxFormatLengthCmImager, length];
            // }else{
            //   lengthTextValue = [NSString stringWithFormat:AxFormatLengthPixels, length];
            // }
            var valuePointX = startPoint.x >= endPoint.x ? (endPoint.x + (startPoint.x - endPoint.x) / 2) : (startPoint.x + (endPoint.x - startPoint.x) / 2);
            var valuePointY = startPoint.y >= endPoint.y ? startPoint.y : endPoint.y;
            __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawTextAt(context, new __WEBPACK_IMPORTED_MODULE_2__common_CGPoint__["a" /* CGPoint */](valuePointX, valuePointY), lengthTextValue);
        });
    };
    return LinearRoiTool;
}());

LinearRoiTool.instance = new LinearRoiTool();
//# sourceMappingURL=LinearRoiTool.js.map

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinearRoi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RoiUtil__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_Aesthetics__ = __webpack_require__(94);
/**
 * Created by binsirMac on 2017-01-09.
 */



/**
 * Created by binsirMac on 2017-01-09.
 */
var LinearRoiSelectType;
(function (LinearRoiSelectType) {
    LinearRoiSelectType[LinearRoiSelectType["StartPointSelected"] = 0] = "StartPointSelected";
    LinearRoiSelectType[LinearRoiSelectType["EndPointSelected"] = 1] = "EndPointSelected";
    LinearRoiSelectType[LinearRoiSelectType["LinearRoiSelected"] = 2] = "LinearRoiSelected";
})(LinearRoiSelectType || (LinearRoiSelectType = {}));
;
var LinearRoi = (function () {
    function LinearRoi(startPoint, endPoint, length) {
        this.selected = true;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.length = length;
    }
    LinearRoi.prototype.checkSelectedWithPoint = function (pointInLens, presentationImage) {
        var startPointInLens = presentationImage.convertFromOriginalImageToLens(this.startPoint);
        var endPointInLens = presentationImage.convertFromOriginalImageToLens(this.endPoint);
        if (Math.abs(pointInLens.x - startPointInLens.x) + Math.abs(pointInLens.y - startPointInLens.y) < __WEBPACK_IMPORTED_MODULE_2__common_Aesthetics__["a" /* Aesthetics */].AxRoiSelectedRadius) {
            this.selectedRoiType = LinearRoiSelectType.StartPointSelected;
            return true;
        }
        else if (Math.abs(pointInLens.x - endPointInLens.x) + Math.abs(pointInLens.y - endPointInLens.y) < __WEBPACK_IMPORTED_MODULE_2__common_Aesthetics__["a" /* Aesthetics */].AxRoiSelectedRadius) {
            this.selectedRoiType = LinearRoiSelectType.EndPointSelected;
            return true;
        }
        else {
            //check whether select the line
            // check in the linear rect
            var minX = Math.min(startPointInLens.x, endPointInLens.x);
            var maxX = Math.max(startPointInLens.x, endPointInLens.x);
            var minY = Math.min(startPointInLens.y, endPointInLens.y);
            var maxY = Math.max(startPointInLens.y, endPointInLens.y);
            if (pointInLens.x < minX - 10) {
                return true;
            }
            if (pointInLens.x > maxX + 10) {
                return true;
            }
            if (pointInLens.y < minY - 10) {
                return true;
            }
            if (pointInLens.y > maxY + 10) {
                return true;
            }
            //if ((pointInLens.x >= minX && pointInLens.x <= maxX)&&(pointInLens.y >= minY && pointInLens.y <= maxY))
            {
                // 1.translate coordinate
                var clickedPointX = pointInLens.x - startPointInLens.x;
                var clickedPointY = pointInLens.y - startPointInLens.y;
                // 2.compute the linear equation: Ax + By =0
                var aInEquation = endPointInLens.y - startPointInLens.y;
                var bInEquation = endPointInLens.x - startPointInLens.x;
                // 3.compute the distance
                var distant = Math.abs((aInEquation * clickedPointX - bInEquation * clickedPointY) / Math.sqrt(aInEquation * aInEquation + bInEquation * bInEquation));
                if (distant < 10) {
                    this.selectedRoiType = LinearRoiSelectType.LinearRoiSelected;
                    this.clickOnLinearPoint = presentationImage.convertToPointInOriginalImage(pointInLens);
                    return true;
                }
            }
        }
        return false;
    };
    LinearRoi.prototype.moveTo = function (pointInLens, presentationImage) {
        var pointInOriginalImage = presentationImage.convertToPointInOriginalImage(pointInLens);
        switch (this.selectedRoiType) {
            case LinearRoiSelectType.StartPointSelected:
                this.startPoint = pointInOriginalImage;
                break;
            case LinearRoiSelectType.EndPointSelected:
                this.endPoint = pointInOriginalImage;
                break;
            case LinearRoiSelectType.LinearRoiSelected:
                {
                    var xOffset = pointInOriginalImage.x - this.clickOnLinearPoint.x;
                    var yOffset = pointInOriginalImage.y - this.clickOnLinearPoint.y;
                    this.startPoint = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.startPoint.x + xOffset, this.startPoint.y + yOffset);
                    this.endPoint = new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](this.endPoint.x + xOffset, this.endPoint.y + yOffset);
                    this.clickOnLinearPoint = pointInOriginalImage;
                }
                break;
            default:
                break;
        }
        if (this.selectedRoiType == LinearRoiSelectType.StartPointSelected || this.selectedRoiType == LinearRoiSelectType.EndPointSelected) {
            this.length = __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].computeLengthFrom(this.startPoint, this.endPoint, presentationImage);
        }
    };
    LinearRoi.prototype.drawRoiOnImage = function (context, presentationImage) {
        //1. draw the path
        var startPointInLens = presentationImage.convertFromOriginalImageToLens(this.startPoint);
        var newStartPointX = startPointInLens.x; //self.startPoint.x * scale - origin.x;
        var newStartPointY = startPointInLens.y; //self.startPoint.y * scale - origin.y;
        var endPointInLens = presentationImage.convertFromOriginalImageToLens(this.endPoint);
        var newEndPointX = endPointInLens.x; //self.endPoint.x * scale - origin.x;
        var newEndPointY = endPointInLens.y; //self.endPoint.y * scale - origin.y;
        __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawLineFrom(context, startPointInLens, endPointInLens, this.selected);
        //2. draw the value
        var pixelSpacingX = presentationImage.pixelSpacingX;
        var pixelSpacingY = presentationImage.pixelSpacingY;
        var imagerPixelSpacingX = presentationImage.imagerPixelSpacingX;
        var imagerPixelSpacingY = presentationImage.imagerPixelSpacingY;
        var lengthTextValue = '';
        // if (pixelSpacingX != 0 || pixelSpacingY != 0)
        // {
        //   lengthTextValue = Aesthetics.AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMm, length] : [NSString stringWithFormat:AxFormatLengthCm, length];
        // }else if (imagerPixelSpacingX != 0 || imagerPixelSpacingY != 0)
        // {
        //   lengthTextValue = AxFormatedByMM?[NSString stringWithFormat:AxFormatLengthMmImager, length] : [NSString stringWithFormat:AxFormatLengthCmImager, length];
        // }else{
        //   lengthTextValue = [NSString stringWithFormat:AxFormatLengthPixels, length];
        // }
        /*
         change the position to draw the value
         [RoiUtil drawTextAt:CGPointMake((newStartPointX + newEndPointX)/2, (newStartPointY + newEndPointY)/2)
         withValue:lengthTextValue];
         */
        var valuePointX = newStartPointX >= newEndPointX ? (newEndPointX + (newStartPointX - newEndPointX) / 2) : (newStartPointX + (newEndPointX - newStartPointX) / 2);
        var valuePointY = newStartPointY >= newEndPointY ? newStartPointY : newEndPointY;
        __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawTextAt(context, new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](valuePointX, valuePointY), lengthTextValue);
        //3. draw the vertexes
        if (this.selected) {
            //draw the highlight start and end point
            __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawVertiexAt(new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](newStartPointX, newStartPointY), context);
            __WEBPACK_IMPORTED_MODULE_1__RoiUtil__["a" /* RoiUtil */].drawVertiexAt(new __WEBPACK_IMPORTED_MODULE_0__common_CGPoint__["a" /* CGPoint */](newEndPointX, newEndPointY), context);
        }
    };
    return LinearRoi;
}());

//# sourceMappingURL=LinearRoi.js.map

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import {AXISS_SERVER_ADDRESS} from "../app/app.constants"; //全局配置的服务器地址






var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        //private headers = new Headers({'Content-Type': 'application/json'});
        this.heroesUrl = 'http://localhost:810/api/heroes'; // URL to web api
        console.log(this.heroesUrl);
    }
    HeroService.prototype.getHeroes = function () {
        console.log(this.http.get(this.heroesUrl));
        this.http.get(this.heroesUrl).subscribe(function (res) { console.log(res.json()); });
        return this.http.get(this.heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true }); //注意这里带了一个类似cookie的东西。
        return this.http.post(this.heroesUrl, { name: name }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HeroService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    HeroService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errMsg);
    };
    return HeroService;
}());
HeroService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], HeroService);

//# sourceMappingURL=login_DB.service.js.map

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScopePopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScopePopoverPage = (function () {
    function ScopePopoverPage(navParams) {
        this.navParams = navParams;
        this.imageViewer = this.navParams.data.imageViewer;
        this.studyViewer = this.navParams.data.studyViewer;
    }
    return ScopePopoverPage;
}());
ScopePopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-scope-viewer',template:/*ion-inline-start:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\scope-viewer\scope-viewer.html"*/'<ion-list class="popover-page">\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_scope_study.png" (click)="imageViewer.doZoom();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_scope_series.png" (click)="imageViewer.doROI();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row class="row-dots">\n\n    <ion-col>\n\n      <img src="assets/img/icon_scope_image.png"  (click)="imageViewer.doWL();studyViewer.dismiss();"/>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-list>\n\n'/*ion-inline-end:"H:\DomainRIS_Mobile\src\pages\study-viewer\popovers\scope-viewer\scope-viewer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], ScopePopoverPage);

//# sourceMappingURL=scope-viewer.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageOperatingType; });
/**
 * Created by binsirMac on 2017-01-09.
 */
/**
 * Created by binsirMac on 2017-01-09.
 */ var ImageOperatingType;
(function (ImageOperatingType) {
    ImageOperatingType[ImageOperatingType["ImageOperatingTypeZoom"] = 0] = "ImageOperatingTypeZoom";
    ImageOperatingType[ImageOperatingType["ImageOperatingTypePan"] = 1] = "ImageOperatingTypePan";
    ImageOperatingType[ImageOperatingType["ImageOperatingTypeWindowLevel"] = 2] = "ImageOperatingTypeWindowLevel";
    ImageOperatingType[ImageOperatingType["ImageOperatingTypeMeasure"] = 3] = "ImageOperatingTypeMeasure";
})(ImageOperatingType || (ImageOperatingType = {}));
//# sourceMappingURL=ImageOperatingType.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoiUtil; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_Aesthetics__ = __webpack_require__(94);

/**
 * Created by kai on 15/10/2017.
 */
var RoiUtil = (function () {
    function RoiUtil() {
    }
    RoiUtil.setCurrentRoiTool = function (roiTool) {
        this.instance = roiTool;
    };
    RoiUtil.getCurrentRoiTool = function () {
        return this.instance;
    };
    RoiUtil.drawVertiexAt = function (point, context) {
    };
    RoiUtil.computeLengthFrom = function (startPoint, endPoint, presentationImage) {
        //	short yT, xT;
        var mesureLength;
        var pixelSpacingX = presentationImage.pixelSpacingX;
        var pixelSpacingY = presentationImage.pixelSpacingY;
        var imagerPixelSpacingX = presentationImage.imagerPixelSpacingX;
        var imagerPixelSpacingY = presentationImage.imagerPixelSpacingY;
        {
            var coteA = void 0, coteB = void 0;
            coteA = Math.abs(startPoint.x - endPoint.x);
            coteB = Math.abs(startPoint.y - endPoint.y);
            if (pixelSpacingX != 0 && pixelSpacingY != 0) {
                coteA *= pixelSpacingX;
                coteB *= pixelSpacingY;
            }
            else if (imagerPixelSpacingX != 0 && imagerPixelSpacingY != 0) {
                coteA *= imagerPixelSpacingX;
                coteB *= imagerPixelSpacingY;
            }
            if (coteA == 0)
                mesureLength = coteB;
            else if (coteB == 0)
                mesureLength = coteA;
            else
                mesureLength = Math.sqrt(coteA * coteA + coteB * coteB); // coteB / (sin (atan( coteB / coteA)));
            if ((pixelSpacingX != 0 && pixelSpacingY != 0 && !__WEBPACK_IMPORTED_MODULE_0__common_Aesthetics__["a" /* Aesthetics */].AxFormatedByMM) || (imagerPixelSpacingX != 0 && imagerPixelSpacingY != 0 && !__WEBPACK_IMPORTED_MODULE_0__common_Aesthetics__["a" /* Aesthetics */].AxFormatedByMM)) {
                mesureLength /= 10.0;
            }
        }
        return mesureLength;
    };
    RoiUtil.drawLineFrom = function (context, startPoint, endPoint, selected) {
        if (selected) {
            context.lineWidth = __WEBPACK_IMPORTED_MODULE_0__common_Aesthetics__["a" /* Aesthetics */].AxRoiSelectedLineWidth;
        }
        else {
            context.lineWidth = __WEBPACK_IMPORTED_MODULE_0__common_Aesthetics__["a" /* Aesthetics */].AxRoiUnselectedLineWidth;
        }
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(startPoint.x, startPoint.y);
        context.stroke();
    };
    RoiUtil.drawTextAt = function (context, point, value) {
    };
    return RoiUtil;
}());

//# sourceMappingURL=RoiUtil.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CGRect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CGSize__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CGPoint__ = __webpack_require__(63);


/**
 * Created by binsirMac on 2016-12-26.
 */
var CGRect = (function () {
    function CGRect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.size = new __WEBPACK_IMPORTED_MODULE_0__CGSize__["a" /* CGSize */](width, height);
        this.origin = new __WEBPACK_IMPORTED_MODULE_1__CGPoint__["a" /* CGPoint */](x, y);
    }
    return CGRect;
}());

//# sourceMappingURL=CGRect.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Aesthetics; });
/**
 * Created by kai on 20/10/2017.
 */
var Aesthetics = (function () {
    function Aesthetics() {
    }
    return Aesthetics;
}());

Aesthetics.AxRoiSelectedRadius = 2.0;
Aesthetics.AxFormatedByMM = false;
Aesthetics.AxRoiUnselectedLineWidth = 2.0;
Aesthetics.AxRoiSelectedLineWidth = 3.0;
//# sourceMappingURL=Aesthetics.js.map

/***/ })

},[300]);
//# sourceMappingURL=main.js.map