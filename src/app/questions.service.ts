//define, what'll be used later on
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Quiz, Question, Choice } from './quiz.model';

// @Injectable decorator (function that augments a piece of code)
// tells Angular that this service will be available everywhere
@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  // contains namespace and type;
  //shortcut for: constructor(http: HttpClient){this.http = http;}
  constructor(private http: HttpClient) {}

  public getQuestions(fileName: any) {
    return this.http.get(`./assets/${fileName}.json`).pipe(
      map((result: any) => {
        return result.map((r: { label: string; choices: Choice[]; }) => new Question(r.label, r.choices));
      })
    );
  }
}
