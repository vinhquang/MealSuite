import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BackendService } from '../../backend.service';

export interface DialogData {
}

@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.scss']
})
export class UserListDialogComponent implements OnInit {

  users = this.backend.users();

  constructor(
    private backend: BackendService,
    public thisDialogRef: MatDialogRef<UserListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
  }

  select(userId:number) {
    this.thisDialogRef.close(userId);
  }
}
