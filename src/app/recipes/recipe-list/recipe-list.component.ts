import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []
  recipeStateSubscription: Subscription;

  constructor(private store: Store<fromAppReducer.ApplicationStateType>) { }

  ngOnInit() {
    this.recipeStateSubscription = this.store.select('recipes').subscribe((recipesState) => {
      this.recipes = recipesState.recipes;
    });
  }
  ngOnDestroy(): void {
    if (this.recipeStateSubscription) {
      this.recipeStateSubscription.unsubscribe();
    }
  }
}
