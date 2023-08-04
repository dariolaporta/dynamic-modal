import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../dialog-config';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  constructor(private dialogConfig : DialogConfig) { }

  pdf;

  ngOnInit() {
    this.pdf = this.dialogConfig.data.src;
    console.log(this.dialogConfig.data.src)
  }

}
