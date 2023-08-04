import { Observable, Subject } from 'rxjs';

export class DialogRef {
  constructor() {}

  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
  _onClickExit = new Subject<any>();
  onClickExit: Observable<any> = this._onClickExit.asObservable();

  close(result?: any) {
    this._afterClosed.next(result);
  }
}
