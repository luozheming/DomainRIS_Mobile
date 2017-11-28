/**
 * Created by kai on 28/10/2017.
 */
export class ArrayUtils{
  static removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
}
