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
  recipeId: number;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
     this.recipeId =  +this.activatedRoute.snapshot.params.id;
    this.recipeDetail = this.recipeService.getRecipe(this.recipeId) ;

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipeDetail = this.recipeService.getRecipe(+params.id) ;
      }
    );
  }

  onClickToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipeDetail.ingredients);
    this.router.navigate(['/shopping-list']);
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }

}
