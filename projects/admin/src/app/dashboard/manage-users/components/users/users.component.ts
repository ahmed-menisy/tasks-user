import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { users } from 'projects/admin/src/app/core/interfaces/interfaces';
import { UsersService } from '../../services/users.service';
import { finalize } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private _UsersService: UsersService,
    private _ToastrService: ToastrService,
    private _TranslateService: TranslateService
  ) {}

  displayedColumns: string[] = [
    'position',
    'username',
    'email',
    'assignedTasks',
    'status',
    'action',
  ];
  dataSource: users[] = [];
  stopButton: boolean = false;

  page: number = 1;
  total: number = 0;

  paramsFilter: any = {
    page: this.page,
    limit: 10,
  };

  filterTimeOutRef: any;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this._UsersService.getAllUsers(this.paramsFilter).subscribe({
      next: (response) => {
        this.dataSource = response.users;
        this.total = response.totalItems;
      },
    });
  }

  deleteUser(id: string, index: number) {
    this._UsersService.deleteUser(id).subscribe({
      next: (response) => {
        this.getUsers();
        this._ToastrService.success(
          this._TranslateService.instant('toaster.delScucess'),
          this._TranslateService.instant('toaster.titleSucess')
        );
      },
    });
  }

  changeStatus(id: string, status: string): void {
    this.stopButton = true;
    this._UsersService
      .changeStatus({ id, status })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.stopButton = false;
          }, 2000);
        })
      )
      .subscribe({
        next: (response) => {
          this.getUsers();
          this._ToastrService.success(
            this._TranslateService.instant('toaster.userChange'),
            this._TranslateService.instant('toaster.titleSucess')
          );
        },
      });
  }

  filterData(event: any): void {
    this.paramsFilter['name'] = event.target.value;
    this.paramsFilter['page'] = 1;
    clearTimeout(this.filterTimeOutRef);

    this.filterTimeOutRef = setTimeout(() => {
      this.getUsers();
    }, 1500);
  }

  changePage(event: any): void {
    this.paramsFilter['page'] = event;
    this.page = event;
    this.getUsers();
  }
}
