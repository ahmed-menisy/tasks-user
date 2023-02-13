import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import {
  Tasks,
  users,
} from 'projects/admin/src/app/core/interfaces/interfaces';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  constructor(
    private _TasksService: TasksService,
    public dialog: MatDialog,
    private _ToastrService: ToastrService,
    private _translate: TranslateService
  ) {}

  displayedColumns: string[] = [
    'image',
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  users: users[] = [];
  filterTimeOutRef: any;
  page: number = 1;
  total: number = 0;

  filterParams: any = {
    page: this.page,
    limit: 10,
  };

  dataSource = new MatTableDataSource<Tasks>();

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
  }

  filterData(event: any, key: string): void {
    this.filterParams['page'] = 1;
    this.filterParams[key] = event.target?.value ?? event.value;
    console.log(this.filterParams);

    clearTimeout(this.filterTimeOutRef);
    this.filterTimeOutRef = setTimeout(
      () => {
        this.getTasks();
      },
      key.includes('key') ? 1500 : 0
    );
  }

  filterDate(event: any, key: string): void {
    this.filterParams['page'] = 1;

    this.filterParams[key] = moment(event.value).format('DD-MM-YYYY');

    if (
      key === 'toDate' &&
      this.filterParams['fromDate'] !== 'Invalid date' &&
      this.filterParams['toDate'] !== 'Invalid date'
    ) {
      this.getTasks();
    }
  }

  getTasks(): void {
    this._TasksService.getAllTasks(this.filterParams).subscribe({
      next: (response) => {
        console.log(response);

        this.dataSource.data = this.mappingTasks(response.tasks);
        this.total = response.totalItems;
      },
    });
  }

  getUsers(): void {
    this._TasksService.getAllUsers().subscribe((response) => {
      this.users = response.users;
    });
  }

  mappingTasks(data: Tasks[]): Tasks[] {
    return data.map((item) => {
      return {
        ...item,
        user: item.userId?.username,
      };
    });
  }

  addTask(): void {
    const dir: any = document.documentElement.dir;
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose: true,
      direction: dir,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'closed') this.getTasks();
    });
  }

  deleteTask(id: string, index: number): void {
    this._TasksService.deleteTask(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(
          this._translate.instant('toaster.delScucess'),
          this._translate.instant('toaster.titleSucess')
        );
      },

      complete: () => {
        let data = this.dataSource.data;
        data.splice(index, 1);
        this.dataSource.data = data;
      },
    });
  }

  updateData(element: Tasks): void {
    const dir: any = document.documentElement.dir;
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element,
      disableClose: true,
      direction: dir,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'closed') this.getTasks();
    });
  }

  changePagination(page: number): void {
    this.page = page;
    this.filterParams['page'] = page;
    this.getTasks();
  }

  handleErrorImage(element: HTMLElement): void {
    element.setAttribute('src', './assets/download.jfif');
  }
}
