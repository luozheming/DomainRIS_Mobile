import {DOMAINRIS_SERVER_ADDRESS} from "../app/app.constants"; //全局配置的服务器地址
import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import 'rxjs/add/operator/toPromise';

import { UserInfo } from '../pages/home/UserInfo';

@Injectable()
export class LoginService {

  //private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl_postfix = '/DomainRIS/services/account/login'; // URL to web loginAPI;
  private logoutUrl_postfix = '/DomainRIS/services/account/logout';
  private reportUrl_postfix = 'DomainRIS/services/report/query';
  private searchUrl_postfix = '/DomainRIS/services/request/query';
  private saveUrl_postfix = '/DomainRIS/services/report/save';
  private submitUrl_postfix = '/DomainRIS/services/request/submit';

    constructor(private http: Http) {
	}

	  save(report:any):Observable<Response> {
		var saveUrl = this.getUrl(this.saveUrl_postfix);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers,withCredentials:true});
        return this.http.post(saveUrl, report, options)
                        .map(this.extractData)
                        .catch(this.handleError);
	  }

      submit(request:any):Observable<Response> {
		var submitUrl = this.getUrl(this.submitUrl_postfix);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers,withCredentials:true});
        return this.http.post(submitUrl, request, options)
                        .map(this.extractData)
                        .catch(this.handleError);
	  }

      query(request_type:string, currPage: string,consult_state:string,request_date_start:string,request_date_end:string): Observable<Response> {
		var searchUrl = this.getUrl(this.searchUrl_postfix);
        let params: URLSearchParams = new URLSearchParams();
		params.set('request_type', request_type);
        params.set('currPage', currPage);
        params.set('consult_state', consult_state);
        params.set('request_date_start', request_date_start);
        params.set('request_date_end', request_date_end);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers,withCredentials:true,search: params});

		return this.http.get(searchUrl, options)
							.map(this.extractData)
							.catch(this.handleError);
	  }


      Report_query(auditing:string,report_no:string): Observable<Response> {
		var reportUrl = this.getUrl(this.reportUrl_postfix);
        let params: URLSearchParams = new URLSearchParams();
        params.set('auditing', auditing);
        params.set('report_no', report_no);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers,withCredentials:true,search: params});
        return this.http.get(reportUrl,options)
                        .map(this.extractData)
                        .catch(this.handleError);
      }

     login(id: string,password:string):Observable<Response> {
		var loginUrl = this.getUrl(this.loginUrl_postfix);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers,withCredentials:true});//注意这里带了一个类似cookie的东西。


        return this.http.post(loginUrl,JSON.stringify({user_id:id,user_password:password}), options)
                        .map(this.extractData)
                        .catch(this.handleError);
      }

	  logout():Observable<Response> {
		var logoutUrl = this.getUrl(this.logoutUrl_postfix);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers,withCredentials:true});//注意这里带了一个类似cookie的东西。
		return this.http.get(logoutUrl,options)
                        .map(this.extractData)
                        .catch(this.handleError);

	  }

	  private getUrl(postfix) {
		var prefix = DOMAINRIS_SERVER_ADDRESS;
		if (localStorage.getItem("domainrisurl") != null) {
			prefix = localStorage.getItem("domainrisurl");
		}
		var url = prefix + postfix;
		return url;
	  }

      private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }

      private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
      }

}
