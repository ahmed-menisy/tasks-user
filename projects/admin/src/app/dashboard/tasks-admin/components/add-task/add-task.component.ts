import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { taskFileds } from 'projects/admin/src/app/core/enums/enums';
import {
  users,
  Tasks,
} from 'projects/admin/src/app/core/interfaces/interfaces';
import { TasksService } from '../../services/tasks.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { SharedService } from './../../../../core/services/shared.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    public dialog: MatDialog,
    private _fb: FormBuilder,
    private _TasksService: TasksService,
    private _ToastrService: ToastrService,
    private _translate: TranslateService,
    @Inject(DIALOG_DATA) public data: Tasks
  ) {}

  lastData: any = {};
  confirmDate: boolean = false;
  pathName: string = '';
  formTask!: FormGroup;
  fileds = taskFileds;
  users: users[] = [];
  userExite: boolean = false;

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
  }

  getUsers(): void {
    this.userExite = true;
    this._TasksService
      .getAllUsers()
      .pipe(finalize(() => (this.userExite = false)))
      .subscribe({
        next: (response) => {
          this.users = response.users;
        },
      });
  }

  createForm(): void {
    this.formTask = this._fb.group({
      [taskFileds.title]: [
        this.data?.title ?? '',
        [Validators.required, Validators.minLength(5)],
      ],
      [taskFileds.description]: [
        this.data?.description ?? '',
        [Validators.required],
      ],
      [taskFileds.deadline]: [
        this.data
          ? new Date(
              this.data?.deadline.split('-').reverse().join('-')
            )?.toISOString()
          : '',
        [Validators.required],
      ],
      [taskFileds.userId]: [this.data?.userId._id ?? '', [Validators.required]],
      [taskFileds.image]: [this.data?.image ?? '', [Validators.required]],
    });

    this.data
      ? this.formTask.get(taskFileds.userId)?.disable()
      : this.formTask.get(taskFileds.userId)?.enable();

    this.lastData = this.formTask.getRawValue();
  }

  prePareForm(): FormData {
    const newDate = moment(
      this.formTask.getRawValue()[taskFileds.deadline]
    ).format('DD-MM-YYYY');

    const newForm = new FormData();
    Object.entries(this.formTask.getRawValue()).forEach(([key, value]: any) => {
      if (key === taskFileds.deadline) {
        newForm.append(key, newDate);
      } else if (key === taskFileds.title) {
        newForm.append(key, value.toLowerCase());
      } else {
        newForm.append(key, value);
      }
    });

    return newForm;
  }

  // Create OR Update Task
  createTask(obj: FormGroup): void {
    this.confirmDate =
      JSON.stringify(this.formTask.getRawValue()) ===
      JSON.stringify(this.lastData); // New Data And Last Data Some Euoal return true

    if (!this.confirmDate) {
      if (obj.valid && !this.data) {
        const formData = this.prePareForm();
        this._TasksService.createTask(formData).subscribe({
          next: (response) => {
            this._ToastrService.success(
              this._translate.instant('toaster.taskCreate'),
              this._translate.instant('toaster.titleSucess')
            );
          },

          complete: () => {
            this.dialogRef.close('closed');
          },
        });
      } else if (obj.valid && this.data) {
        const formData = this.prePareForm();

        this._TasksService.updateTask(formData, this.data._id).subscribe({
          next: (response) => {
            this._ToastrService.success(
              this._translate.instant('toaster.taskUpdate'),
              this._translate.instant('toaster.titleSucess')
            );
          },

          complete: () => {
            this.dialogRef.close('closed');
          },
        });
      }
    } else {
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.confirmDate =
      JSON.stringify(this.formTask.getRawValue()) ===
      JSON.stringify(this.lastData); //  New Data And Last Data Some Euoal return true

    if (this.confirmDate) {
      this.dialogRef.close();
    } else {
      this.dialog.open(ConfirmationComponent, {
        width: '750px',
        disableClose: true,
      });
    }
  }
}
