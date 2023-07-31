import { Component } from '@angular/core';
import { QuestionsService } from '../shared/services/questions.service';
import { OpenTriviaQuestion } from '../shared/models/open-trivia-question';
import { Router } from '@angular/router';
import { ResultsService } from '../shared/services/results.service';
import { CreateTrivia } from '../shared/models/create-trivia';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent {
  questionsList: OpenTriviaQuestion[] = [];

  constructor(
    private questionsService: QuestionsService,
    private router: Router,
    private resultsService: ResultsService
  ) {}

  /**
   * Receive the user creation parameters and get the quiz from the API. 
   * Clears and recreates the answer list.
   * 
   * @param {CreateTrivia} event Object containing the category and difficulty selected by the user.
   */
  public onCreateHandler(event: CreateTrivia): void {
    this.questionsList = [];

    this.questionsService
      .getQuestions(event.category, event.difficulty)
      .subscribe((res: OpenTriviaQuestion[]) => {
        this.questionsList = res;
        this.createAnswersList();
      });
  }

  /**
   * Action when the selected responses are sent. 
   * Save the quiz and the user's answers to a service and navigate to the results screen.
   * 
   * @param {string[]} selectedAnswers List of user-selected answers
   */
  public onSubmitQuizHandler(selectedAnswers: string[]) {
    this.resultsService.setQuiz(Array.from(this.questionsList));
    this.resultsService.setUserAnswers(Array.from(selectedAnswers));
    this.router.navigate(['results']);
  }

  /**
   * Creates the list with all the incorrect answers and the correct answer and shuffles them
   * 
   * @private
   */
  private createAnswersList(): void {
    this.questionsList.forEach((question: OpenTriviaQuestion) => {
      question.all_answers = [];
      // Add incorrect answers to the list
      question.incorrect_answers.forEach((incorrectAnswer: string) => {
        question.all_answers.push(incorrectAnswer);
      });
      // Add correct answers to the list
      question.all_answers.push(question.correct_answer);
      // Shuffle the list
      this.shuffle(question.all_answers);
    });
  }

  /**
   * Shuffle a list of strings with the Fisher-Yates method
   * 
   * @private
   * @param {string[]} array Generic string list
   * @return {*} 
   */
  private shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}
