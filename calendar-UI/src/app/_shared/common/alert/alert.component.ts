import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  private message: string;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => { 
      this.message = message; 
    });
  }

  closed() {
    this.alertService.closed();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
