import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsService } from 'src/app/shared/services/results.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html'
})
export class ScoreComponent implements OnInit {

  public score = 0;
  public total = 0;

  constructor(private resultsService: ResultsService, private router: Router) {

  }

  ngOnInit(): void {
    this.total = this.getTotalNUmber();
    this.score = this.calculateScore();
  }

  
  /**
   * Action by clicking on "Create a new quiz". Navigate to the initial quiz creation page.s
   */
  public onCreateNewClick(): void {
    this.router.navigate(['quiz']);
  }

  /**
   * Calculate the score
   *
   * @private
   * @return {*}  {number} score value
   */
  private calculateScore(): number {
    let score = 0;
    const userAnswers = this.resultsService.getUserAnswers();
    this.resultsService.getQuiz().forEach((question, index) => {
      if(question.correct_answer === userAnswers[index]) {
        score++;
      }
    });

    return score;
  }

  /**
   * Returns the total number of questions in the quiz.
   *
   * @private
   * @return {*}  {number} total number of questions
   */
  private getTotalNUmber(): number {
    return this.resultsService.getUserAnswers().length;
  }

}
