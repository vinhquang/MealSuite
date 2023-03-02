import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { BackendService } from '../../backend.service';

import { UserListDialogComponent } from '../../components/user-list-dialog/user-list-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tasks = this.backend.tasks();
  users = this.backend.users();

  displayedColumns: string[] = ['id', 'description', 'assign', 'completed', 'actions'];
  dataSource = this.tasks;

  descriptionFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  selectedUser:MyUser;

  isAdding:boolean = false;

  constructor(
    private dialog: MatDialog,
    private backend: BackendService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Get user name to show up
   */
  getUserName(userId: number) {
    let user = this.backend.getUser(userId);
    if (user) {
      return user.name;
    }
  }

  /**
   * Select user for create new task
   */
  selectUserNewTask() {
    let dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '300px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backend.user(result).subscribe(res => {
           this.selectedUser = res;
        });
      }
    });
  }

  /**
   * Select user for assign task
   * 
   * @param taskId: number
   */
  selectUserAssign(taskId: number) {
    let dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '300px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAdding = true;
        this.backend.assign(taskId, result).subscribe(res => {
          this.tasks = this.backend.tasks();
          this.dataSource = this.tasks;
          this.isAdding = false;
        });
      }
    });
  }

  /**
   * Save new task
   */
  saveNewTask() {
    this.descriptionFormControl.markAllAsTouched();

    if (this.descriptionFormControl.valid) {
      this.isAdding = true;

      let payload = {
        description: this.descriptionFormControl.value,
      };
      if (this.selectedUser) {
        payload['assigneeId'] = this.selectedUser.id;
      }

      this.backend.newTask(payload).subscribe(res => {
        this.tasks = this.backend.tasks();
        this.dataSource = this.tasks;

        this.tasks.subscribe(res => {
          this.resetForm();
        });
      });
    }
  }

  /**
   * Reset form for new task
   */
  resetForm() {
    this.descriptionFormControl.reset();
    this.selectedUser = null;
    this.isAdding = false;
  }
}
