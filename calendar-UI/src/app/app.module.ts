import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// services
import { AuthenticationService } from './_shared/services/authentication.service';
import { AlertService } from './_shared/services/alert.service';
import { ModalService } from './_shared/services/modal.service';
import { EventsService } from './_shared/services/events.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    AlertService,
    ModalService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
