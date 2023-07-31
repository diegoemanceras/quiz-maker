import { Component, OnInit } from '@angular/core';
import { OpenTriviaQuestion } from '../shared/models/open-trivia-question';
import { ResultsService } from '../shared/services/results.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {

  public quiz: OpenTriviaQuestion[] = [];
  private userAnswers: string[] = [];

  constructor(private router: Router, private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.initResults();
  }

  /**
   * Retrieves quiz questions and answers from the service user. 
   * If they do not exist, it redirects you to the quiz home page.
   */
  initResults(): void {
    this.quiz = this.resultsService.getQuiz();
    this.userAnswers = this.resultsService.getUserAnswers();

    if(this.quiz.length <1 || this.userAnswers.length < 1) {
      this.router.navigate(['quiz']);
    }
  }
}
