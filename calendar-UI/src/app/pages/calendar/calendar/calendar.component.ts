import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_shared/services/alert.service';
import { EventsService } from 'src/app/_shared/services/events.service';
import { ModalService } from 'src/app/_shared/services/modal.service';

import FileSaver from 'file-saver';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private timeSet: any = [
    {time: "8:00"},
    {time: "8:30"},
    {time: "9:00"},
    {time: "9:30"},
    {time: "10:00"},
    {time: "10:30"},
    {time: "11:00"},
    {time: "11:30"},
    {time: "12:00"},
    {time: "12:30"},
    {time: "13:00"},
    {time: "13:30"},
    {time: "14:00"},
    {time: "14:30"},
    {time: "15:00"},
    {time: "15:30"},
    {time: "16:00"},
    {time: "16:30"},
    {time: "17:00"}
  ];
  
  private loader: boolean = false;
  private events: any;

  constructor(
    private alertService: AlertService,
    private eventsService: EventsService,
    private renderer: Renderer2,
    private modalService: ModalService
  ) { }

  @ViewChild('eventsContainer', { static: false }) eventsContainer: ElementRef;

  ngOnInit() {
    this.getEvents();
  }

  private getEvents() {
    this.loader = true;
    this.eventsService.getAll().pipe(first()).subscribe(
      (response: any) => { 
        this.events = response;
        this.eventsContainer.nativeElement.innerHTML = "";

        response.forEach((objEvent, j, arrEvents) => {
          
          for (let i=0; i < arrEvents.length; i++) {
            let log = (arrEvents[i].start < objEvent.start)
              && (objEvent.start < (arrEvents[i].start + arrEvents[i].duration))
              || (arrEvents[i].start < (objEvent.start + objEvent.duration))
              && ((objEvent.start + objEvent.duration) < (arrEvents[i].start + arrEvents[i].duration))
            
            if (log) {
              objEvent.neighbors = [i];
              arrEvents[i].neighbors = [j];
            }
          }

        });

        response.forEach((element, i) => {
          this.createEvent(element, i);
        });
        this.loader = false;
      },
      error => {
        this.alertService.error(error.error.massage || "Error")
        this.loader = false;
      }
    );
  }

  private createEvent(objEvent, arrPosition) {
    const div = this.renderer.createElement('div');
    const divText = this.renderer.createText(objEvent.title);
    this.renderer.appendChild(div, divText);
    this.renderer.setStyle(div, "top", `${objEvent.start * 2}px`);
    this.renderer.setStyle(div, "left", `${arrPosition > objEvent.neighbors ? 50  :  0}%`);
    this.renderer.setStyle(div, "height", `${objEvent.duration * 2}px`);
    this.renderer.setStyle(div, "width", `${objEvent.neighbors ? 100 / (objEvent.neighbors.length + 1)  : 100 }%`);
    this.renderer.setAttribute(div, "data-event_id", `${objEvent._id}`);
    this.renderer.addClass(div, "event");
    this.renderer.listen(div, "click", () => this.callbackToEvent(objEvent))
    this.renderer.appendChild(this.eventsContainer.nativeElement, div);
  }

  private callbackToEvent(objEvent) {
    this.modalService.openEvent(objEvent);
    this.modalService.getData().pipe(first()).subscribe(data => {
      if (data.type === "delete") {
        this.deleteEvent(data.objEvent);
      };
    });
  }

  private openFormToAddEvent() {
    this.modalService.open();
    this.modalService.getData().pipe(first()).subscribe(data => {
      if (data.type === "approval") {
        this.addEvent(data.newEvent);
      };
    });
  }

  private addEvent(newEvent) {
    this.eventsService.addNew(newEvent).pipe(first()).subscribe(
      (response: any) => { 
        this.alertService.success("you added " + response.title);
        this.getEvents();
      },
      error => {
        this.alertService.error(error.error.massage || "Error");
      }
    );
  }

  private deleteEvent(objEvent) {
    this.eventsService.delete(objEvent._id).pipe(first()).subscribe(
      (response: any) => { 
        this.alertService.success("you delete: " + response.title);
        this.getEvents();
      },
      error => {
        this.alertService.error(error.error.massage || "Error not delete")
      }
    );
  }

  private exportJson() {
    
    const exportJson = this.events.map((objEvent) => {
      return { start: objEvent.start, duration: objEvent.duration, title: objEvent.title }
    })
    exportJson.sort((prev, next) => {
      return prev.start - next.start;
    })
    
    this.modalService.exportJson(JSON.stringify(exportJson, null, 1));
    this.modalService.getData().pipe(first()).subscribe(data => {
      if (data.type === "saveJson") {
        const description = " \/\/ 'start' & 'duration' are measured in minutes\r\n\ \/\/ 'start' 0 is 8:00a\r\n\ ";
        let blob = new Blob([description, data.exportJson], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "export_Json.txt");
      };
    })
  }
  
}
