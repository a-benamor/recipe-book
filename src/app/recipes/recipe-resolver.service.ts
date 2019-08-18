import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {Observable} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    if ( this.recipeService.getRecipes().length === 0 ) {
     return this.dataStorageService.getRecipes();
    } else {
      return this.recipeService.getRecipes();
    }
  }
}
