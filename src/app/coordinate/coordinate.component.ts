import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-coordinate',
  templateUrl: './coordinate.component.html',
  styleUrls: ['./coordinate.component.scss'],
})
export class CoordinateComponent implements OnInit {
  @Input() answers: any;
  @Input() answersNew: any;

  form: FormGroup;
  result!: { x: number; y: number; z: number };
  degree: any;
  alpha: any;
  alphaValidity: any;
  display: any;
  designValid = false;
  designNonValid = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      anchorPointX: '',
      anchorPointY: '',
      anchorPointZ: '',
      hPointX: '',
      hPointY: '',
      hPointZ: '',
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    const anchorPointX = this.form.value.anchorPointX;
    const anchorPointY = this.form.value.anchorPointY;
    const anchorPointZ = this.form.value.anchorPointZ;
    const hPointX = this.form.value.hPointX;
    const hPointY = this.form.value.hPointY;
    const hPointZ = this.form.value.hPointZ;
    const pi = Math.PI;

    this.result = {
      x: Math.abs(anchorPointX - hPointX),
      y: Math.abs(anchorPointY - hPointY),
      z: Math.abs(anchorPointZ - hPointZ),
    };

    this.degree = Math.atan(this.result.z / this.result.x);
    this.alpha = this.degree * (180 / pi);

    if (this.answersNew[1].value.toLowerCase() === 'ece14') {
      if (
        this.answers.values[0].value.toLowerCase() ===
          'attached to the body of the seat cushion' &&
        this.alpha <= 70 &&
        this.alpha >= 50 
      ) {
        this.alphaValidity = 'Alpha is between 50deg and 70deg';
        this.display = 'The belt is in the right zone';
        this.designValid = true;
        this.designNonValid = false;
      } else {
        this.alphaValidity = 'Alpha is not between 30deg and 70deg please enter new measurments';
        this.display = 'Not in the right belt zone!!';
        this.designValid = false;
        this.designNonValid = true;
      }
    }

    if (this.answersNew[1].value.toLowerCase() === 'fvmss210') {
      if (
        this.answers.values[0].value.toLowerCase() ===
          'attached to the body of the seat cushion' &&
        this.alpha <= 75 &&
        this.alpha >= 30
      ) {
        this.alphaValidity = 'Alpha is between 30deg and 75deg';
        this.display = 'The belt is in the right zone';
        this.designValid = true;
        this.designNonValid = false;
      } else {
        this.alphaValidity =
          'Alpha is not between 30deg and 75deg, please enter new measurments';
        this.display = 'Not in the right belt zone!!';
        this.designValid = false;
        this.designNonValid = true;
      }
    }





    console.log(this.answers);
  }
}
