import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { Category } from '../../../shared/models/category';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html'
})
export class CreateQuizComponent implements OnInit {

  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  public refCategories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.initCategories();
  }

  /**
   * Action when clicking the "Create" button. 
   * Emit the user's selection to the parent component 
   * that is responsible for managing the Quiz.
   * 
   * @param {string} category User selected category
   * @param {string} difficulty User selected difficulty
   */
  onCreateClick(category: string, difficulty: string) {
    this.onCreate.emit({category: category, difficulty: difficulty});
  }

  /**
   * Retrieve the category reference to be displayed in the drop-down list
   *
   * @private
   */
  private initCategories(): void {
    this.categoriesService.getCategories().subscribe(res => {
      this.refCategories = res;
    })
  }

}
