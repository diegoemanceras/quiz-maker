import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { CreateQuizComponent } from './quiz/components/create-quiz/create-quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsComponent } from './shared/components/questions/questions.component';
import { ResultComponent } from './result/result.component';
import { ScoreComponent } from './result/components/score/score.component';
import { ColoredScoreDirective } from './shared/directives/colored-score.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    CreateQuizComponent,
    QuestionsComponent,
    ResultComponent,
    ScoreComponent,
    ColoredScoreDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
