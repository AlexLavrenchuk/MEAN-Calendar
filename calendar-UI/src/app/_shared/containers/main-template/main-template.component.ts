import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss']
})
export class MainTemplateComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  filter: boolean = false;
  
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.subscription = this.modalService.getData().subscribe(data => { 
      if(data.type === "closed" || data.type === "approval") {
        this.filter = false;
      } else {
        this.filter = true;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
