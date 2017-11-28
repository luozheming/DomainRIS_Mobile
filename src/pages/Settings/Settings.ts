import { Component } from '@angular/core';
import { NavController,AlertController,ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DOMAINRIS_SERVER_ADDRESS } from '../../app/app.constants';
import { AXVS_SERVER_ADDRESS } from '../../app/app.constants';


@Component({
  selector: 'page-Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {
    config = {
		domainrisurl : '',
		axvsurl : ''
	}

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private readonly toastCtrl: ToastController
              ) {
				console.log(DOMAINRIS_SERVER_ADDRESS);
				if (localStorage.getItem("domainrisurl") == null ) {
					this.config.domainrisurl = DOMAINRIS_SERVER_ADDRESS;
				} else {
					this.config.domainrisurl = localStorage.getItem("domainrisurl");
				}

				if (localStorage.getItem("axvsurl") == null || localStorage.getItem("axvsurl").length == 0) {
					this.config.axvsurl = AXVS_SERVER_ADDRESS;
				} else {
					this.config.axvsurl = localStorage.getItem("axvsurl");
				}
			  }//小弹窗

	save() {
		localStorage.setItem("domainrisurl", this.config.domainrisurl);
		localStorage.setItem("axvsurl", this.config.axvsurl);
		this.navCtrl.push(HomePage);
	}
}
