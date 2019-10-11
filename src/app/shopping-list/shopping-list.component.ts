import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
// @ts-ignore
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromShoppingListReducer from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}> ;
  ingredientChangeSubject: Subscription;


  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromShoppingListReducer.ApplicationStateType>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredientChangeSubject =  this.shoppingListService.ingredientChanged.subscribe((ingredientsData: Ingredient[]) => {
      // this.ingredients = ingredientsData;
    });*/
  }

  ngOnDestroy(): void {
    this.ingredientChangeSubject.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }


}
