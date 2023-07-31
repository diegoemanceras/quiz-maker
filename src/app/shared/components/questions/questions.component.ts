import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpenTriviaQuestion } from '../../models/open-trivia-question';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Input() mode: 'quiz' | 'result' = 'quiz';
  @Input() questions: OpenTriviaQuestion[] = [];
  @Output() submitQuiz: EventEmitter<string[]> = new EventEmitter();

  public areAllAnswered = false;
  public selectedAnswers: string[] = [];

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.initAnswersList();
  }

  /**
   * Action when selecting a response. Adds the answer to the list 
   * of answers (in its position) and checks if all questions have been answered.
   *
   * @param {number} pos question number
   * @param {string} answer answer's value
   */
  public onClickAnswer(pos: number, answer: string) {
      this.selectedAnswers[pos] = answer;
      this.areAllAnswered = this.checkAllAnswered();
  }

  /**
   * Action when sending the answers. Sends the user's answers to the 
   * parent component in charge of managing the quiz.
   */
  public onClickSubmitQuiz(): void {
    this.submitQuiz.emit(this.selectedAnswers);
  }

  /**
   * Change CSS class of button for selected, correct and incorrect answers
   *
   * @param {number} questionIndex Question number (position)
   * @param {number} answerIndex Answer number (position)
   * @return {*} Key-value with the name of the CSS class and true if applicable or false if not.
   * @memberof QuestionsComponent
   */
    public setAnswerClasses(questionIndex: number, answerIndex: number) {
      let answerClasses: Record<string, boolean> = {};
  
      answerClasses =  {
        'selected': this.mode==='quiz' && this.selectedAnswers[questionIndex] === this.questions[questionIndex].all_answers[answerIndex],
        'incorrect': this.mode==='result' && this.selectedAnswers[questionIndex] === this.questions[questionIndex].all_answers[answerIndex], 
        'correct': this.mode==='result' && this.questions[questionIndex].correct_answer === this.questions[questionIndex].all_answers[answerIndex]
      };
  
      return answerClasses;
    }

  /**
   * Starts the list of answers with empty strings for the quiz mode. 
   * Or load the user's answer list for the "result" mode.
   */
    private initAnswersList(): void {
      if(this.mode === 'quiz') {
        this.questions.forEach(() => this.selectedAnswers.push(''));
      } else {
        this.selectedAnswers = this.resultsService.getUserAnswers();
      }
    }
  

  /**
   * Check if all questions have been answered
   *
   * @return {*}  {boolean} true if all questions are answered; 
   *                        false if there are any unanswered questions.
   */
  private checkAllAnswered(): boolean {
    let allChecked = true;
    this.selectedAnswers.forEach(answer => {
      if(answer === '') allChecked = false;
    })

    return allChecked;
  }
}
