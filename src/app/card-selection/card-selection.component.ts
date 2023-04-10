import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';



@Component({
  selector: 'app-card-selection',
  templateUrl: './card-selection.component.html',
  styleUrls: ['./card-selection.component.scss'],
})
export class CardSelectionComponent implements OnInit {


  quiz!: Quiz;
  answers!: Answers;
  questions!: Question[];
  currentQuestionIndex!: number;

  showResults = false;
  // inject both the active route and the questions service
  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) {}

  ngOnInit() {
    //read from the dynamic route and load the proper quiz data
    this.questionsService
      .getQuestions('questions')
      .subscribe((questions) => {
        this.questions = questions;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });
  }

  updateChoice(choice: any) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      console.log(this.answers)
      this.showResults = true;
      return;
    }
    this.currentQuestionIndex++;
  }

}
