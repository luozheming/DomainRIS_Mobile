import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { LoginService } from '../../service/login.service';
import { UserInfo } from './UserInfo';
//import { Consultation_listPage } from '../Consultationlist/Consultationlist';
//import { Collaborative_listPage } from "../Collaborativelist/Collaborativelist";
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  errorMessage: string;
  userinfo:UserInfo = new UserInfo();//初始化用户信息
  current_user:string;


  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private login_service:LoginService) { 
				this.checkLogin();
			  }


    test(){
          console.log("账号:"+this.userinfo.user_id+"密码:"+this.userinfo.user_password);
          //如何声明变量类型
      }
	  
  checkLogin() {
	if (localStorage.getItem('userid') != null) {
		this.login(localStorage.getItem('userid'), localStorage.getItem('password'), true);
	}
  }

  login(id:string,password:string,auto:boolean){
  if(id=="" || password==""){        //输入检测部分
      this.showInputErrorAlert();
      return;
    } else{
      this.login_service.login(id,password)  //这里先对回应的状态进行打印
            .subscribe(
            res  => {if(String(res.status)  =="Success"){
              this.current_user=res['account']['username'];
              console.log(this.current_user);
			  localStorage.setItem('userid',id);
			  localStorage.setItem('password',password);
			  localStorage.setItem('userno', res['account']['userno']);
			  localStorage.setItem('displayname', res['account']['displayname']);
			  this.navCtrl.push(ListPage);
			} else {
				if (!auto) {
					this.showInputErrorAlert();
				}
            }},
            error =>  this.errorMessage = <any>error);
      }
    this.test();
  }


  showInputErrorAlert(){
    let alert = this.alertCtrl.create({
          title: '登陆失败',
          subTitle: '请输入用户名或者密码!',
          buttons: ['确定']
        });
        alert.present();
  }

}
