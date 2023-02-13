import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(
    public _diaglogRef: MatDialogRef<ConfirmationComponent>,
    public matDialog: MatDialog
  ) {}

  confirm(): void {
    this.matDialog.closeAll();
  }

  close(): void {
    this._diaglogRef.close();
  }
}
