import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false ;
  id: number;
  recipeForm: FormGroup;
  @ViewChild('imageContent', { static: false }) imageContentForEdit;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params.id ;
        this.editMode = params.id != null ;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    console.log('edit mode ' + this.editMode);
    if (this.editMode) {
      const recipeLoaded = this.recipeService.getRecipe(this.id);
      recipeName = recipeLoaded.name;
      recipeImageUrl = recipeLoaded.imagePath;
      recipeDescription = recipeLoaded.description;
      if (recipeLoaded.ingredients != null) {
        for (let ingredient of recipeLoaded.ingredients ) {
          recipeIngredients.push(
            new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount, [Validators.required]),
            }
            )
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'recipe-name': new FormControl(recipeName, [Validators.required]),
      'image-url': new FormControl(recipeImageUrl),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'recipe-ingredients': recipeIngredients,
    });
  }

  onSubmitRecipe() {
    console.log(this.recipeForm);
   /* let recipeIngredients: Ingredient[] = [];
    if (this.recipeForm.value['recipe-ingredients'] != null) {
      for ( const ingredientControl of (this.recipeForm.value['recipe-ingredients'] as Ingredient[])) {
        recipeIngredients.push(ingredientControl);
      }
    }*/
    const newRecipe = new Recipe(this.recipeForm.get('recipe-name').value, this.recipeForm.get('description').value,
      this.recipeForm.get('image-url').value, this.recipeForm.value['recipe-ingredients']);
    if (!this.editMode) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    this.recipeForm.reset();
    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  getControls(): AbstractControl[] {
    return (this.recipeForm.get('recipe-ingredients') as FormArray).controls;
  }

  onAddIngredient() {
      (this.recipeForm.get('recipe-ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl(),
      })
    );
    console.log(this.recipeForm);
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('recipe-ingredients') as FormArray).removeAt(index);
    console.log(this.recipeForm);
  }

}
