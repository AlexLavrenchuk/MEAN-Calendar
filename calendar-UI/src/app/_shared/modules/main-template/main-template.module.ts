import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainTemplateComponent } from 'src/app/_shared/containers/main-template/main-template.component';
import { HeaderComponent } from 'src/app/_shared/components/header/header.component';
import { FooterComponent } from 'src/app/_shared/components/footer/footer.component';
import { NavigationComponent } from 'src/app/_shared/components/navigation/navigation.component';
import { SharedModule } from 'src/app/_shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    MainTemplateComponent, 
    HeaderComponent, 
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    MainTemplateComponent, 
    HeaderComponent, 
    FooterComponent,
    NavigationComponent,
  ]
})

export class MainTemplateModule { }
