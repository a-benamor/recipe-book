import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

   recipeDetail: Recipe;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const recipeId =  +this.activatedRoute.snapshot.params.id;
    this.recipeDetail = this.recipeService.getRecipeById(recipeId) ;

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipeDetail = this.recipeService.getRecipeById(+params.id) ;
      }
    );
  }

  onClickToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipeDetail.ingredients);
    this.router.navigate(['/shopping-list']);
  }

}
