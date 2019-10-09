import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm, NgModel} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('addIngredientForm', { static: true }) addIngredientForm: NgForm;
  itemSubscription: Subscription;
  editMode = false;
  editItemIndex: number;
  loadedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.itemSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.loadedIngredient = this.shoppingListService.getIngredient(index);
        this.addIngredientForm.setValue({
          name: this.loadedIngredient.name,
          amount: this.loadedIngredient.amount
        });
      }
    );
  }
  onSubmit() {
    console.log(this.addIngredientForm);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(new Ingredient(this.addIngredientForm.value.name,
        Number(this.addIngredientForm.value.amount)));
    } else {
      this.shoppingListService.updateIngredient(this.editItemIndex,
        new Ingredient(this.addIngredientForm.value.name, Number(this.addIngredientForm.value.amount)));
    }
    this.editMode = false;
    this.addIngredientForm.reset();
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  onResetForm() {
    this.addIngredientForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onResetForm();
  }


}
