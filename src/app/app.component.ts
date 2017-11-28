import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/Settings/Settings';
import { LoginService } from '../service/login.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  errorMessage:string;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private login_service:LoginService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '设置', component: SettingsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
	this.login_service.logout()  //这里先对回应的状态进行打印
		.subscribe(
			res  => {
				localStorage.removeItem("userid");
				localStorage.removeItem("password");
				this.nav.setRoot(HomePage);},
			error =>  this.errorMessage = <any>error);
  }
}
