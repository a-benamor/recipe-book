import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') ingredientNameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') ingredientAmountInput: ElementRef<HTMLInputElement>;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }
  onAddIngredients() {
    // console.log(this.ingredientNameInput.nativeElement.value);
    this.shoppingListService.addIngredient(new Ingredient(this.ingredientNameInput.nativeElement.value,
      Number(this.ingredientAmountInput.nativeElement.value) ));
  }
}
