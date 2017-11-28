import {CGSize} from "./CGSize";
import {CGPoint} from "./CGPoint";
/**
 * Created by binsirMac on 2016-12-26.
 */
export class CGRect {
  public size: CGSize;
  public origin: CGPoint;

  constructor(public x: number, public y: number, public width: number, public height: number) {
    this.size = new CGSize(width, height);
    this.origin = new CGPoint(x, y);
  }
}
