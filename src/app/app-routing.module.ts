import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'results',
    component: ResultComponent,
  },
  { path: '',   redirectTo: '/quiz', pathMatch: 'full' },
  { path: '**', redirectTo: '/quiz', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
