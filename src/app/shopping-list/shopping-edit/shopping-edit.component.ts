import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
// @ts-ignore
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('addIngredientForm', { static: true }) addIngredientForm: NgForm;
  itemSubscription: Subscription;
  editMode = false;
  loadedIngredient: Ingredient;

  constructor(private store: Store<fromAppReducer.ApplicationStateType>) { }

  ngOnInit() {
    this.itemSubscription = this.store.select('shoppingList').subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.loadedIngredient = stateData.editedIngredient;
          this.addIngredientForm.setValue({
            name: this.loadedIngredient.name,
            amount: this.loadedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
    });
  }
  onSubmit() {
    console.log(this.addIngredientForm);
    const ingredientInput = new Ingredient(this.addIngredientForm.value.name, Number(this.addIngredientForm.value.amount));
    if (!this.editMode) {
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(ingredientInput));
    } else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredientAction(ingredientInput));
    }
    this.editMode = false;
    this.addIngredientForm.reset();
  }

  onResetForm() {
    this.addIngredientForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditingAction());
  }

  onDeleteItem() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction());
    this.onResetForm();
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditingAction());
  }

}
