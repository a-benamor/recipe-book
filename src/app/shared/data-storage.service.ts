import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put('https://ng-recipe-app-5ee93.firebaseio.com/recipes.json', recipes).subscribe(
       (response) => {
         console.log(response);
       }
     );
  }

  getRecipes() {
    return this.httpClient.get< Recipe[] >('https://ng-recipe-app-5ee93.firebaseio.com/recipes.json')
       .pipe(map(
             (response: Recipe[]) => {
               console.log('the origine fetch recipes response');
               console.log(response) ;
              /* let recipesWithIngredients: Recipe[] = [] ;
               for (let recipe of response) {
                 if (recipe.ingredients == null) {
                   recipe.ingredients = [] ;
                   recipesWithIngredients.push(recipe) ;
                 } else {
                   recipesWithIngredients.push(recipe);
                 }
               }
                return recipesWithIngredients ;*/
              return response.map(
                (recipe) => {
                    console.log( {...recipe} );
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} ;
                }
              );
             }) , tap(
           (response) => {
             this.recipeService.updateRecipes(response) ;
           }
           )
       );
  }
}
