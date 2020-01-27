import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private subject = new Subject<any>();
  constructor() { }

  public open() {
    this.subject.next({type: "open"});
  }
  
  public closed() {
    this.subject.next({type: "closed"});
  }

  public getData(): Observable<any> {
    return this.subject.asObservable();
  }

  public addEvent(newEvent) {
    this.subject.next({type: "approval", newEvent});
  }

  public openEvent(objEvent) {
    this.subject.next({type: "open", objEvent});
  }

  public delete(objEvent) {
    this.subject.next({type: "delete", objEvent});
  }

  public exportJson(exportJson) {
    this.subject.next({type: "open", exportJson});
  }

  public saveJson(exportJson) {
    this.subject.next({type: "saveJson", exportJson});
  }
}
