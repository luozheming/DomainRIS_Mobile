/**
 * Created by binsirMac on 2016-12-27.
 */
/** Models an event with a generic sender and generic arguments */
export enum EventTypes {
  SelectTileView,
  ChangeOperatingType,
  Resize,
  PanImage,
  ChangePreset,
  PlayCine,
  PausedCine,
  ScaleChangeNotification,
  PropagateNotification,
  OverlayChangeNotification,
  NeedsDisplayNotification
}

interface IEvent<TEventType, TSender, TArgs> {

  subscribe(eventType : TEventType, fn: (sender: TSender, args: TArgs) => void): void;

  unsubscribe(eventType : TEventType, fn: (sender: TSender, args: TArgs) => void): void;
}

/** The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of the event */
export class EventDispatcher<TEventType, TSender, TArgs> implements IEvent<TEventType, TSender, TArgs> {

  // for the Singleton
  private static instance: EventDispatcher<any, any, any> ;
  private constructor() {
    // do something construct...
  }

  static getInstance() {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher<any, any, any>();
      // ... any one time initialization goes here ...
    }
    return EventDispatcher.instance;
  }

  private _subscriptions: Map< TEventType,Array<(sender: TSender, args: TArgs) => void>> = new Map<TEventType,Array<(sender: TSender, args: TArgs) => void>> ();

  clear(){
    this._subscriptions.clear();
  }

  subscribe(eventType : TEventType ,fn: (sender: TSender, args: TArgs) => void): void {
    let actions : Array<(sender: TSender, args: TArgs) => void> = this._subscriptions.get(eventType);
    if (actions == null) {
      actions =  new Array<(sender: TSender, args: TArgs) => void>();
      this._subscriptions.set(eventType, actions);
    }
    actions.push(fn);
  }

  unsubscribe(eventType : TEventType, fn: (sender: TSender, args: TArgs) => void): void {
    let actions : Array<(sender: TSender, args: TArgs) => void> = this._subscriptions.get(eventType);
    if (actions){
      let i = actions.indexOf(fn);
      if (i > -1) {
        actions.splice(i, 1);
      }
    }
  }

  dispatch(eventType : TEventType,sender: TSender, args: TArgs): void {
    if(this._subscriptions){
      if(this._subscriptions.get(eventType)){
        for (let handler of this._subscriptions.get(eventType)) {
          handler(sender, args);
        }
      }
    }
  }
}
