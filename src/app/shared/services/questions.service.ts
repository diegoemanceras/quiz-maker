import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OpenTriviaResponse } from '../models/open-trivia-response';
import { OpenTriviaQuestion } from '../models/open-trivia-question';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questionsUrl = 'https://opentdb.com/api.php?amount=5';

  constructor(private httpClient: HttpClient) {}

  getQuestions(
    categoryId: string,
    difficulty: string
  ): Observable<OpenTriviaQuestion[]> {
    return this.httpClient
      .get<OpenTriviaResponse>(
        this.questionsUrl +
          '&category=' +
          categoryId +
          '&difficulty=' +
          difficulty +
          '&type=multiple'
      )
      .pipe(map((x) => x.results));
  }
}
