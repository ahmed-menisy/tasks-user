import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from './../../../../../../admin/src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TasksService: TasksService,
    private _Router: Router
  ) {}

  task: any = {};

  ngOnInit(): void {
    const id: string = this._ActivatedRoute.snapshot.paramMap.get('id')!;
    this.getDetails(id);
  }

  getDetails(id: string): void {
    this._TasksService.getDetailsTask(id).subscribe({
      next: (response) => {
        this.task = response.tasks;
        console.log(response.tasks);
      },
    });
  }

  completeTask(id: string): void {
    this._TasksService.completeTask({ id, status: 'Complete' }).subscribe({
      next: (response) => {
        this._Router.navigate(['./']);
      },
    });
  }
}
