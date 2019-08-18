import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector : 'app-header',
  templateUrl: './header.component.html',
  styles: [`a {cursor: pointer}`]
})
export class HeaderComponent implements OnInit {

  constructor( private dataStorageService: DataStorageService ) {}

  ngOnInit(): void {}

  onStoreRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.getRecipes().subscribe() ;
  }

}
