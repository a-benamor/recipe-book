import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import * as fromAuthReducer from './store/auth.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild('authForm', { static: false }) authForm: NgForm;
  isLoginMode = true;
  onLoading = false;
  error: string = null;
  storeSubscription: Subscription;
  constructor(private store: Store<fromAppReducer.ApplicationStateType>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('auth').subscribe(
      (authState: fromAuthReducer.AuthStateType ) => {
          this.onLoading = authState.loading;
          this.error = authState.authError;
      }
    );
    if (this.error) {
      console.log(this.error);
    }
  }

  onSwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuthData() {
    if (!this.authForm.valid) {
      return;
    }
    const emailUser = this.authForm.value.email;
    const passwordUser = this.authForm.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStartAction({
        email: emailUser,
        password: passwordUser,
      }));
    } else {
      this.store.dispatch(new AuthActions.SignupStartAction({
        email: emailUser,
        password: passwordUser,
      }));
    }
    this.authForm.reset();
  }

  onCloseModal() {
    this.store.dispatch(new AuthActions.ClearErrorAction());
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

}
