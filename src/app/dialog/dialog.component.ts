import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { DialogConfig } from './dialog-config';
import {NavigationEnd, Router} from "@angular/router";
import { DialogRef } from './dialog-ref';
import { InsertionDirective } from './insertion.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;

  _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef,
    public config: DialogConfig,
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.dialogRef.close();
      }
    });
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next(null);
  }
}
