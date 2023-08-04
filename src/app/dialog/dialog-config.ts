export class DialogConfig {
  data?: DialogConfigType;
}

interface DialogConfigType extends GenericDialgConfig  {
  style?: {width?: string};
  panelTitle?: string;

}

interface GenericDialgConfig {
  [key:string]: any;
}
