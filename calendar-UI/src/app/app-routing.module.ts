import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/calendar'
  },
  {
    path: 'auth',
    loadChildren: () => import(`./pages/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import(`./pages/calendar/calendar.module`).then(m => m.CalendarModule)
  },
  {
    path: 'errorPage',
    loadChildren: () => import(`./pages/error-page/error-page.module`).then(m => m.ErrorPageModule),
  },
  {
    path: '**',
    redirectTo: 'errorPage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
