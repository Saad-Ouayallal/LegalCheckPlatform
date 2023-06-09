import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
}


interface JsonFormControls {
  name: string;
  description: string;
  value: string;
  type: string;
  validators: JsonFormValidators;
}

interface JsonFormTypes {
  name: string;
  values: JsonFormControls[];
}
export interface JsonFormData {
  types: JsonFormTypes[];
}


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormComponent implements OnChanges {
  @Input()
  jsonFormData!: JsonFormData;

  @Input() answers: any;
  public showResult = false;
  formResult: any;
  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges) {
    this.createForm(this.jsonFormData.types);
  }

  createForm(types: JsonFormTypes[]) {
    for (const type of types) {
      for (const control of type.values) {
        const validatorsToAdd = [];
        for (const [key, value] of Object.entries(control.validators)) {
          switch (key) {
            case 'min':
              validatorsToAdd.push(Validators.min(value));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(value));
              break;
            case 'required':
              if (value) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            default:
              break;
          }
        }

        this.myForm.addControl(
          control.name,
          this.fb.control(control.value, validatorsToAdd)
        );
      }
    }
  }

  onSubmit() {
      this.showResult = true;
    if (this.myForm.valid) {
      this.formResult = this.myForm.value;
      this.formResult = Object.entries(this.myForm.value);
      console.log("form valid");
    } else {
      this.formResult = this.myForm.value;
      this.formResult = Object.entries(this.myForm.value);
      console.log('form not valid');
    }

  }

  returnBack() {
    this.showResult = false;
  }
}
