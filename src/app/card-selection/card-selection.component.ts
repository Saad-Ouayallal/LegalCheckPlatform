import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JsonFormData } from '../input-form/input-form.component';
import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.scss'],
})
export class CardSelectionComponent implements OnInit {
  public formData!: JsonFormData;

  quiz!: Quiz;
  answers!: Answers;
  answersNew: any = [];
  questions!: Question[];
  currentQuestionIndex!: number;

  showResults = false;
  showCoordinate = false;
  // inject both the active route and the questions service
  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    //read from the dynamic route and load the proper quiz data
    this.questionsService.getQuestions('questions').subscribe((questions) => {
      this.questions = questions;
      this.answers = new Answers();
      this.currentQuestionIndex = 0;
    });
  }

  getNorm(filename: any) {
    this.http.get(`/assets/${filename}.json`).subscribe((formData: any) => {
      this.formData = formData;
    });
  }

  updateChoice(choice: any) {
    this.answers.values[this.currentQuestionIndex] = choice;
    this.answersNew.push(choice);
    console.log(this.answersNew)
    if (
      choice.value.toLowerCase() === 'ece14' ||
      choice.value.toLowerCase() === 'fvmss210'
    ) {
      this.questionsService
        .getQuestions('questions-ece14')
        .subscribe((questions) => {
          this.questions = questions;
          this.currentQuestionIndex = 0;
        });
      this.getNorm(choice.value.toLowerCase());
    }
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      console.log(this.answers);
      console.log(this.answersNew)
      if (this.answers.values.length === 3) {
        console.log("heeeeere1")
        this.getNorm(this.answers.values[1].value.toLowerCase());
        this.showResults = true;
        return;
      } else {
        console.log("heeere 2")
        this.showCoordinate = true;
      }
    }
    this.currentQuestionIndex++;
  }
}
