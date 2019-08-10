import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  id: number
  name: string;
  description: string;
  /* path to the image internet */
  imagePath: string;
  ingredients: Ingredient[];
  constructor( name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

}
