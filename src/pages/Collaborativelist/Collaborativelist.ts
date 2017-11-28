import { Component } from '@angular/core';
import { NavController,AlertController,ToastController } from 'ionic-angular';
import { LoginService } from '../../service/login.service';
import  { Patient } from "./patient";
import { Report_writelist} from  '../Report_write/Report_write';
import { Report_viewlist } from "../Report_view/Report_view";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-Collaborativelist',
  templateUrl: 'Collaborativelist.html'
})
export class Collaborative_listPage {
      errorMessage: string;
      patient_list : Array<Patient> = [];
      private search_continue:boolean=true;
      private page : number = 1;//设置查询的页数
      private consult_state: string = "";
      private request_date_start : string = "";
      private request_date_end :string = "";
	  private request_type:string = "CDO";
	  private totalRecord: number = 0;
	  private mycolor:string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private login_service:LoginService,
              private readonly toastCtrl: ToastController
              ) {
				this.search();
			  }//小弹窗

	clear() {
		this.consult_state = "";
		this.request_date_start = "";
		this.request_date_end = "";
	}

    Scrollserch(){
      this.login_service.query(this.request_type, String(this.page),this.consult_state,this.request_date_start,this.request_date_end)  //这里先对回应的状态进行打印
        .subscribe(
          res  => {if (String(res['status']) == 'Success') {
			  for (var n in res["requestList"])
			  {this.patient_list.push(res["requestList"][n])};
				console.log(this.patient_list);
				this.totalRecord = res["totalRecord"];
			} else if (String(res['status']) == 'Logged_out') {
				this.navCtrl.push(HomePage);
			}
		  }, error =>  this.errorMessage = <any>error);
    }

    search(){
      this.patient_list = [];//每次调用search方法的时候需要初始化；
      this.page = 1;
      this.search_continue=true;
      this.login_service.query(this.request_type, String(this.page),this.consult_state,this.request_date_start,this.request_date_end)  //这里先对回应的状态进行打印
            .subscribe(
            res  => {if (String(res['status']) == 'Success') {
			  for (var n in res["requestList"])
				  {this.patient_list.push(res["requestList"][n])};
					console.log(this.patient_list);
					this.totalRecord = res["totalRecord"];
				} else if (String(res['status']) == 'Logged_out') {
					this.navCtrl.push(HomePage);
				}
			}, error =>  this.errorMessage = <any>error);
      }


      init(patient){
      if(patient["priority_str"]=="加急"){
        this.mycolor = "danger";
      }else{
        this.mycolor = "danger";
      }
      }

    view(patient){
	  if (patient['dicom_ready'] == '传输中') {
		this.onError('图像尚未到达，不能开始协同！');
		return;
	  }
	  patient['request_type'] = this.request_type;
      if(patient["consult_state"]=="终审"){
        this.navCtrl.push(Report_viewlist,patient);
      }else {
        this.navCtrl.push(Report_writelist,patient);
      }
      console.log("还没有做完呢┬─┬ ノ( ' - 'ノ)");
    }


  private onError(text) {
    let message: string = text;

    const toast = this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      if(this.search_continue){                       //如果请求到的列表长度不再改变，便不再发送get请求；
      this.page++;
      this.Scrollserch();}
      if(this.totalRecord == this.patient_list.length){
        this.search_continue=false;
        this.onError('没有更多病人信息！');
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);

    }



}
