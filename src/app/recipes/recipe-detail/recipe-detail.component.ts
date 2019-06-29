import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

   recipeDetail: Recipe;

  constructor(private recipeService: RecipeService) {
    this.recipeService.getRecipeSelected().subscribe((recipeData) => this.recipeDetail = recipeData);
  }

  ngOnInit() {}

  onClickToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipeDetail.ingredients);
  }

}
