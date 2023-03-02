import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { BackendService } from "../../backend.service";

import { UserListDialogComponent } from './user-list-dialog.component';

describe('UserListDialogComponent', () => {
  let component: UserListDialogComponent;
  let fixture: ComponentFixture<UserListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListDialogComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: BackendService, useValue: new BackendService() },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
