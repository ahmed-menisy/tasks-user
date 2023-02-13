import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [],
  exports: [
    MatPaginatorModule,
    NgxPaginationModule,
    NgxMatFileInputModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule {}
