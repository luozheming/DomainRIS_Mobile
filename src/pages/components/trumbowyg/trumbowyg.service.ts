import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/publishReplay";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import {LoadExternalFiles} from "./load-external-file.service";
import {fromPromise} from "rxjs/observable/fromPromise";

const TRUMBOWYG_STYLES_URL = 'assets/css/trumbowyg.min.css';
const JQUERY_SCRIPT_URL = 'assets/js/jquery.min.js';
const TRUMBOWYG_SCRIPT_URL = 'assets/js/trumbowyg.min.js';
declare const window: any;

@Injectable()
export class TrumbowygService {

  private isLoaded$: Observable<boolean>;

  constructor(loadFiles: LoadExternalFiles) {
    const loadFiles$ = window && window["jQuery"] && window["jQuery"]().on ?
      fromPromise(loadFiles.load(TRUMBOWYG_STYLES_URL, TRUMBOWYG_SCRIPT_URL))
      : fromPromise(loadFiles.load(JQUERY_SCRIPT_URL))
        .switchMap(() => fromPromise(loadFiles.load(TRUMBOWYG_STYLES_URL, TRUMBOWYG_SCRIPT_URL)));

    this.isLoaded$ = loadFiles$
      .map(() => true)
      .publishReplay(1)
      .refCount();

  }

  loaded(): Observable<boolean> {
    return this.isLoaded$;
  }
}
