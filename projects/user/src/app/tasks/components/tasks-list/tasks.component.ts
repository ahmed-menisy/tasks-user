import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from './../../../../../../admin/src/app/core/interfaces/interfaces';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private _TasksService: TasksService) {}

  page: number = 1;
  selectedStatus: string = 'In-Progress';
  tasksUser: Tasks[] = [];
  total: number = 0;
  filteration: any = {
    page: this.page,
    limit: 10,
    status: this.selectedStatus,
  };

  ngOnInit(): void {
    this.getTasks();
  }

  filterData(event: any, key: string): void {
    this.filteration[key] = event.value;
    this.filteration['page'] = 1;
    this.getTasks();
  }

  getTasks(index?: number): void {
    const userData = JSON.parse(localStorage.getItem('_Data')!);
    this._TasksService
      .getTasks(this.filteration, userData?.userId)
      .pipe(
        finalize(() => {
          index !== undefined ? this.tasksUser.splice(index, 1) : '';
        })
      )
      .subscribe({
        next: (response) => {
          this.tasksUser = response.tasks;
          this.total = response.totalItems;
        },
        error: (err) => {
          if (err.error.message === 'No Tasks Found Assgined To This ID...')
            this.tasksUser = [];
        },
      });
  }

  completeTask(id: string, index: number): void {
    this._TasksService.completeTask({ id, status: 'Complete' }).subscribe({
      next: (response) => {
        this.getTasks(index);
      },
    });
  }
}
