import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { EventsService } from 'src/app/_shared/services/events.service';
import { AlertService } from 'src/app/_shared/services/alert.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private addFormEvent: FormGroup;
  private data: any;
  private view: boolean = false;
  private scrollTop: number = 0;
  private objEvent: any;
  private exportJson: string | boolean = null;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.subscription = this.modalService.getData().subscribe(data => { 
      console.log(data, "DATA");
      if(data.type === "closed" || data.type === "approval") { 
        this.view = false;
      } else {
        this.view = true;
      }
      if (data.objEvent) {
        this.objEvent = data.objEvent
      } else {
        this.objEvent = null;
      }
      if (data.exportJson) {
        this.exportJson = data.exportJson;
      } else {
        this.exportJson = null;
      }
    });

    this.addFormEvent = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    }, { validator: this.validatorTimeEnd('start', 'end') });
  }

  private validatorTimeEnd(first: string, second: string) {
    return (group: FormGroup) => {
      if (group.controls[first].value >= group.controls[second].value) {
        return group.controls[second].setErrors({lessThenStart: true});
      } else {
        return group.controls[second].setErrors(null);
      }
    }
  }
  

  private addNewEvent() {
    if (this.addFormEvent.invalid) {
      return;
    }
    let { title, start, end } = this.addFormEvent.value;
    const startArr = start.split(":");
    const endArr = end.split(":");
    const startMinutes = ((startArr[0] - 8) * 60) + Number(startArr[1]);
    const endMinutes = ((endArr[0] - 8) * 60) + Number(endArr[1]);
    const duration = endMinutes - startMinutes;
    this.modalService.addEvent({title, start: startMinutes, duration});
    this.close();
  }

  private areaOutside(e) {
    if(e.target.classList.contains('modal')) {
      this.close();
    }
  }

  private close() {
    this.cleaningInputForm();
    this.modalService.closed();
  }

  private confirmation() {
    this.addNewEvent()
    this.cleaningInputForm();
  }


  private cleaningInputForm() {
    this.addFormEvent.reset();
    this.addFormEvent.controls.title.setErrors(null);
    this.addFormEvent.controls.start.setErrors(null);
    this.addFormEvent.controls.end.setErrors(null);
  }

  private delete() {
    this.modalService.delete(this.objEvent);
    this.modalService.closed();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private saveJson() {
    this.modalService.saveJson(this.exportJson)
  }

}
