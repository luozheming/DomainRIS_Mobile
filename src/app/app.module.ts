import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SettingsPage } from '../pages/Settings/Settings';

import { Consultation_listPage } from '../pages/Consultationlist/Consultationlist';
import { Collaborative_listPage } from "../pages/Collaborativelist/Collaborativelist";
import { Report_writelist } from "../pages/Report_write/Report_write";
import { Report_viewlist} from "../pages/Report_view/Report_view";

import { FormsModule }   from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../service/login.service';
import { HeroService } from '../service/login_DB.service';

//components
//import {ElasticTextarea} from '../components/elasticTextarea';
//import {ProfileHeader} from '../components/profileHeader';

//viewer
import {StudyViewerPage} from "../pages/study-viewer/study-viewer";
import {ReLayoutPopoverPage} from "../pages/study-viewer/popovers/relayout-viewer/relayout-viewer";
import {PresetPopoverPage} from "../pages/study-viewer/popovers/preset-viewer/preset-viewer";
import {MeasurePopoverPage} from "../pages/study-viewer/popovers/measure-viewer/measure-viewer";
import {RoiPopoverPage} from "../pages/study-viewer/popovers/roi-viewer/roi-viewer";
import {OrientPopoverPage} from "../pages/study-viewer/popovers/orient-viewer/orient-viewer";
import {ScopePopoverPage} from "../pages/study-viewer/popovers/scope-viewer/scope-viewer";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Consultation_listPage,
    Collaborative_listPage,
    Report_writelist,
    Report_viewlist,
	StudyViewerPage,
    ReLayoutPopoverPage,
    PresetPopoverPage,
    MeasurePopoverPage,
    RoiPopoverPage,
    OrientPopoverPage,
	ScopePopoverPage,
    SettingsPage,
  ],
  imports: [
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Consultation_listPage,
    Collaborative_listPage,
    Report_writelist,
    Report_viewlist,
	StudyViewerPage,
    ReLayoutPopoverPage,
    PresetPopoverPage,
    MeasurePopoverPage,
    RoiPopoverPage,
    OrientPopoverPage,
	ScopePopoverPage,
    SettingsPage,
  ],
  providers: [//所有的服务在此注册
    HeroService,
    LoginService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
