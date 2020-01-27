import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'src/app/_shared/common/alert/alert.component';
import { LoaderComponent } from 'src/app/_shared/common/loader/loader.component';
import { ModalComponent } from 'src/app/_shared/components/modal/modal.component';


import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AlertComponent,
    ModalComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    AlertComponent,
    ModalComponent,
    LoaderComponent
  ]
})
  
export class SharedModule { }