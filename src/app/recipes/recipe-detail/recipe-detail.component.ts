import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as fromRecipesReducer from '../store/recipes.reducer';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

   recipeDetail: Recipe;
  recipeId: number;
  recipesSubscription: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<fromAppReducer.ApplicationStateType>) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      map(params => {
        this.recipeId = +params.id;
        return +params.id;
      }),
      switchMap(() => {
        return this.store.select('recipes');
      }),
      map((recipesState: fromRecipesReducer.RecipesStateType) => {
        return recipesState.recipes.find((currentRecipe, index) => {
          return index === this.recipeId;
        });
      }),
    ).subscribe(recipe => {
      console.log(recipe);
      this.recipeDetail = recipe;
    });
  }

  onClickToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredientsAction(this.recipeDetail.ingredients));
    this.router.navigate(['/shopping-list']);
  }

  onDeleteRecipe() {
    // this.recipeService.removeRecipe(this.recipeId);
    this.store.dispatch(new RecipesActions.DeleteRecipeAction(this.recipeId));
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    if (this.recipesSubscription) {
      this.recipesSubscription.unsubscribe();
    }
  }

}
