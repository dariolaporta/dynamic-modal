import { Component, OnInit } from '@angular/core';
import { DialogConfig } from 'src/app/core/components/dialog/dialog-config';
import { DialogRef } from 'src/app/core/components/dialog/dialog-ref';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  title: string;
  mainText: string;
  data;
  hideButtons = false;
  action:string;

  constructor(
    private dialogConfig : DialogConfig,
    private dialogRef : DialogRef) { }

  ngOnInit() {
    this.title = this.dialogConfig.data.modalConfirm.title;
    this.mainText = this.dialogConfig.data.modalConfirm.text;
    this.data = this.dialogConfig.data.modalConfirm.data;
    this.hideButtons = this.dialogConfig.data.modalConfirm.hideButtons ? 
                       this.dialogConfig.data.modalConfirm.hideButtons : false;
    this.action = this.dialogConfig.data.modalConfirm.action ? this.dialogConfig.data.modalConfirm.action : undefined;
  }

  onAction (event : boolean) {
    this.dialogRef.close({modalEvent : event , data : this.data , action:this.action});
  }

}
