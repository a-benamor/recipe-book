import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
// @ts-ignore
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromShoppingListReducer from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}> ;
  ingredientChangeSubject: Subscription;


  constructor(private store: Store<fromShoppingListReducer.ApplicationStateType>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    this.ingredientChangeSubject.unsubscribe();
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEditingAction(index));
  }

}
