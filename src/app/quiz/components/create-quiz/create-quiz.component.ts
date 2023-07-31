import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Category } from '../../../shared/models/category';
import { CreateTrivia } from 'src/app/shared/models/create-trivia';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
})
export class CreateQuizComponent implements OnInit {
  @Output() create: EventEmitter<CreateTrivia> = new EventEmitter();

  public refCategories: Category[] = [];
  public refDifficulties: string[] = ["easy", "medium", "hard"];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.initCategories();
  }

  /**
   * Action when clicking the "Create" button.
   * Emit the user's selection to the parent component
   * that is responsible for managing the Quiz.
   *
   * @param {number} category User selected category
   * @param {string} difficulty User selected difficulty
   */
  public createClick(category: string, difficulty: string) {
    this.create.emit({ category: category, difficulty: difficulty });
  }

  /**
   * Retrieve the category reference to be displayed in the drop-down list
   *
   * @private
   */
  private initCategories(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.refCategories = res;
    });
  }
}
