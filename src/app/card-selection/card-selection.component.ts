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
  questions!: Question[];
  currentQuestionIndex!: number;

  showResults = false;
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
    this.http
      .get('/assets/ece17.json')
      .subscribe((formData: any) => {
        this.formData = formData;
      });
  }

  updateChoice(choice: any) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      console.log(this.answers);
      this.showResults = true;
      return;
    }
    this.currentQuestionIndex++;
  }
}
