import { Component, Input, OnInit } from '@angular/core';
import { QuestionBase } from '../../../dynamic-form/models/question-base';
import { DialogConfig } from '../../dialog-config';
import { DialogRef } from '../../dialog-ref';

interface formOptions {
  [key:string] : Array<any>
}

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  formTitle : string;
  formFields : QuestionBase[];
  formConfiguration;
  options : formOptions;
  value;

  constructor(
    private dialogConfig : DialogConfig,
    private dialogRef : DialogRef ) { }

  ngOnInit() {
    this.formTitle = this.dialogConfig.data.form.title;
    this.formFields = this.dialogConfig.data.form.formFields;
    this.formConfiguration = this.dialogConfig.data.form.formConfiguration;
    this.value = this.dialogConfig.data.form.value;//object to edit

    if(this.dialogConfig.data.form.options){
      this.mapperOptions(this.formFields,this.dialogConfig.data.form.options);
    }

    //populate form (edit)
    if(this.value) {
      this.populateForm(this.value, this.formFields);
    }
  }

  populateForm(valueToEdit: any, configs: QuestionBase[]) {
    Object.entries(valueToEdit).forEach(([key, value]) => {
      if (configs.find(el => el.key === key)){
        configs.find(el => el.key === key).value = value;
      }

    })
  }

  mapperOptions (config : QuestionBase[] , options : formOptions) {
    Object.entries(options).forEach(([key,value],index)=>{
      config = this.elementMapper(config,value,config.findIndex(el => el.key === key));
    })
  }
  private elementMapper(fields: QuestionBase[], data : any , indexTipo : number) {
     fields[indexTipo].options = data.map(el => {
      return {
        key: el.id,
        value: el.name,
        label: el.name
      };
    });
     return fields;
  }

  submit(res) {
    this.dialogRef.close({result : res});
  }

  reset() {
    this.populateForm(this.value, this.formFields);
  }





}
