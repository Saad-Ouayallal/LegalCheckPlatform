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
    if (this.myForm.valid) {
      alert('This form is valid for the inputs you have entered')
    } else {
      alert('This Form is not valid, please check once again the measurments')
    }
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }
}
