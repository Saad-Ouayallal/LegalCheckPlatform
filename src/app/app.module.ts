import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { CardSelectionComponent } from './card-selection/card-selection.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { InputFormComponent } from './input-form/input-form.component';
import { CommonModule } from '@angular/common';
import { CoordinateComponent } from './coordinate/coordinate.component';


const appRoutes: Routes = [
  { path: '', component: CardSelectionComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CardSelectionComponent,
    QuestionFormComponent,
    InputFormComponent,
    CoordinateComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatGridListModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
