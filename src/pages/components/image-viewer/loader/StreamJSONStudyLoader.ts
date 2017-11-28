import {Config} from "../Config";

/**
 * Created by binsirMac on 2016-12-26.
 */
export class StreamJSONStudyLoader {
  constructor(private studyUID: string,
              private studyStatus: string) {

  }

  load() {
    return this.loadFromAxVS(`${Config.AXVS_ADDRESS}/services/query?studyUID=${this.studyUID}&studyStatus=MATCHED,UNMATCHED,NULL,VERIFIED,COMPLETED&viewer=flex&userId=&userName=&location=&workstationId=&displayName=&requestSys=&rowGuid=&access_token=${Config.AXVS_ACCESS_TOKEN}`).then((study) => {
      console.log("Success!", study);
      //construct the Study Model
      //then return the new promise
      return new Promise(
        (resolve, reject) => {
          resolve(study);
        }
      )
    }, (error) => {
      console.error("Failed!", error);
      return new Promise(
        (resolve, reject) => {
          reject(error);
        }
      )
    });
  }
  
  createAuthorizationCode(userId, pwd) {
		var base64Code = "Basic ";
		var sourceString = userId + ":" + pwd;
		var encoder = window.btoa(sourceString);
		base64Code = base64Code + encoder;
		return base64Code;
	}

  loadFromAxVS(url) {
    // Return a new promise.
    return new Promise((resolve, reject) => {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);
	  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  req.setRequestHeader("Authorization", this.createAuthorizationCode('doctor','doctor'));

      req.onload = function () {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          let response = JSON.parse(req.response);
          if (response.status == 'Success'){
            if(response.studyList.study.length == 1){
              resolve(response.studyList.study[0]);
            }else{
              reject(Error('Error return the study size.'));
            }
          }else{
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
  }
}
