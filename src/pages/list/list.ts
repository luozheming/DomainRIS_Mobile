//tabs的主要跳转界面在这里配置
import { Component } from '@angular/core';
import { Consultation_listPage } from '../Consultationlist/Consultationlist';
import { Collaborative_listPage } from "../Collaborativelist/Collaborativelist";


@Component({
  templateUrl: 'list.html'
})
export class ListPage {//注意这里需要修改
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Consultation_listPage;
  tab2Root: any = Collaborative_listPage;


  constructor() {

  }
}
