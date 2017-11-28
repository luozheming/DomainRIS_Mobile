//import {AXISS_SERVER_ADDRESS} from "../app/app.constants"; //全局配置的服务器地址
import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import 'rxjs/add/operator/toPromise';

import { Hero } from '../app/hero';

@Injectable()
export class HeroService {

  //private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:810/api/heroes';  // URL to web api

    constructor(private http: Http) {
     console.log(this.heroesUrl);
     }

      getHeroes(): Observable<Hero[]> {
          console.log(this.http.get(this.heroesUrl));
          this.http.get(this.heroesUrl).subscribe((res:Response) =>{console.log(res.json())});
          return this.http.get(this.heroesUrl)
                          .map(this.extractData)
                          .catch(this.handleError);
      }
     create(name: string): Observable<Hero> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers , withCredentials:true});//注意这里带了一个类似cookie的东西。

        return this.http.post(this.heroesUrl, { name }, options)
                        .map(this.extractData)
                        .catch(this.handleError);
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
