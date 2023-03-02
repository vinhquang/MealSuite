import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BackendService } from '../../backend.service';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  task: MyTask;
  user: MyUser;

  isCompleting: boolean = false;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private backend: BackendService
  ) {
    this.backend.task(this.route.snapshot.params['id']).subscribe(res => {
      this.task = res;
      this.user = this.backend.getUser(this.task.assigneeId);
    });
  }

  ngOnInit(): void {
  }

  /**
   * Complete or revert a task
   * 
   * @param status: boolean
   */
  completeTask(status: boolean) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: (status)
          ? 'Do you really want to complete this task?'
          : 'Do you really want to revert this task?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isCompleting = true;

        this.backend.complete(this.task.id, status).subscribe(res => {
          this.task.completed = status;

          this.isCompleting = false;
        });
      }
    });
  }
}
