import { Injectable } from '@angular/core';
import { OpenTriviaQuestion } from '../models/open-trivia-question';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private quiz: OpenTriviaQuestion[] = [];
  private userAnswers: string[] = [];

  constructor() { }

  public setQuiz(questions: OpenTriviaQuestion[]): void {
    this.quiz = questions;
  }

  public getQuiz(): OpenTriviaQuestion[] {
    return this.quiz;
  }

  public setUserAnswers(answers: string[]): void {
    this.userAnswers = answers;
  }

  public getUserAnswers(): string[] {
    return this.userAnswers;
  }
}
