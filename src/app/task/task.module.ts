import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared.module';
import { MatButtonModule } from '@angular/material/button';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

import { UserListDialogComponent } from '../components/user-list-dialog/user-list-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    UserListDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    MatButtonModule,
  ],
  exports: [
  ],
  entryComponents: [
  ]
})
export class TaskModule { }
