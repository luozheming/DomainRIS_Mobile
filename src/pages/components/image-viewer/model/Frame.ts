/**
 * Created by binsirMac on 2016-12-26.
 */
export class Frame{
  width              : number;
  samplesPerPixel    : number;
  compressionRatio   : string;
  patientPosition    : string;

  constructor(public parentStudy : any,public parentSeries : any,public parentImageSop : any, public frameNumber : number){}
}
