import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Recipe test', 'This is only a test',
      'https://en.wikipedia.org/wiki/Spaghetti_with_meatballs#/media/File:Spaghetti_and_meatballs_1.jpg'),
    new Recipe('second element', 'second element description', '')
  ];

  constructor() { }

  ngOnInit() {
  }

}
