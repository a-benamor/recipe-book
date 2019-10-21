import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../auth/user.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';
import {Recipe} from '../recipes/recipe.model';
import * as fromRecipesReducer from '../recipes/store/recipes.reducer';

@Component({
  selector : 'app-header',
  templateUrl: './header.component.html',
  styles: [`a {cursor: pointer}`]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private _isAuthenticated = false;
  private userSignedInfo: UserModel;
  constructor( private authService: AuthService,
               private store: Store<fromAppReducer.ApplicationStateType>) {}

  ngOnInit(): void {
   this.userSubscription = this.store.select('auth').pipe(
     map(authState => {
       return authState.user;
     })).subscribe(
     (user: UserModel) => {
       this._isAuthenticated = (user) ? true : false ;
     });
  }

  onStoreRecipes() {
    let recipes: Recipe[];
    this.store.select('recipes').subscribe((recipesState: fromRecipesReducer.RecipesStateType) => {
      recipes = recipesState.recipes;
    });
    this.store.dispatch(new RecipesActions.StoreRecipesAction());

  }

  onFetchRecipes() {
    this.store.dispatch(new RecipesActions.FetchRecipesAction());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.LogoutAction());
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
