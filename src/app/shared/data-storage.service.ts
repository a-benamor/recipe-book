import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../auth/user.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private authenticatedUserInfo: UserModel;
  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const PUT_URL = environment.fireBaseDataBaseBaseUrlPath + 'recipes.json';
    this.httpClient.put(PUT_URL, recipes).subscribe(
       (response) => {
         console.log(response);
       }
     );
  }

  getRecipes() {
   const GET_URL = environment.fireBaseDataBaseBaseUrlPath + 'recipes.json';
    // we return an observable
    return this.httpClient.get< Recipe[] >(GET_URL)
      .pipe(map(
        (response: Recipe[]) => {
          return response.map(
            (recipe) => {
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
