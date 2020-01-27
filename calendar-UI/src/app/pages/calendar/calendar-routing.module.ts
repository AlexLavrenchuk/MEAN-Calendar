import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainTemplateComponent } from 'src/app/_shared/containers/main-template/main-template.component';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
  { 
    path: '', 
    component: MainTemplateComponent,
    children: [
      {
        path: '',
        component: CalendarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
