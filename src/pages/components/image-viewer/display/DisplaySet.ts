import {PresentationImage} from "./PresentationImage";
import {Frame} from "../model/Frame";
/**
 * Created by binsirMac on 2016-12-26.
 */
export class DisplaySet{
  presentationImages  : PresentationImage[] = [];

  constructor(){}

  static generateFromSeries(study : any, series : any){
    let displaySet = new DisplaySet();

    if(series != null && series.image != null){
      let images =  series.image;

      for (let image of images) {
        let frames = this.generateFromImage(study, series, image);
        for (let frame of frames) {
          let presentationImage = new PresentationImage();
          presentationImage.frameReference = frame;
          presentationImage.parentDisplaySet = displaySet;
          displaySet.presentationImages.push(presentationImage);
        }
      }
    }
    return displaySet;
  }

  static generateFromImage(study : any, series : any, image : any){
    if(image.frames == 0){
      let frame = new Frame(study, series, image, 1);
      return [frame];
    }
    let frames : Frame[] = [];
    for(let i = 1; i <= image.frames; i ++){
      let frame = new Frame(study, series, image, i);
      frames.push(frame);
    }
    return frames;
  }
}
