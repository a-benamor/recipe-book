import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../auth/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector : 'app-header',
  templateUrl: './header.component.html',
  styles: [`a {cursor: pointer}`]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private isAuthenticated = false;
  private userSignedInfo: UserModel;
  constructor( private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    console.log('HeaderComponent on init');
   this.userSubscription = this.authService.user.subscribe((user: UserModel) => {
      this.isAuthenticated = (user) ? true : false ;
    });
  }

  onStoreRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.getRecipes().subscribe() ;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
