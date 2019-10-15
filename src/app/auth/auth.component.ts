import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import * as fromAuthReducer from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm', { static: false }) authForm: NgForm;
  isLoginMode = true;
  onLoading = false;
  error: string = null;
  constructor(private authService: AuthService,
              private router: Router, private store: Store<fromAppReducer.ApplicationStateType>) { }

  ngOnInit() {
    console.log('on init auth component')
    this.store.select('auth').subscribe(
      (authState: fromAuthReducer.AuthStateType ) => {
          console.log(authState);
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
    let obser: Observable<AuthResponseData>;
    const emailUser = this.authForm.value.email;
    const passwordUser = this.authForm.value.password;

    this.onLoading = true;
    if (this.isLoginMode) {
      // obser = this.authService.signIn(emailUser, passwordUser);
      this.store.dispatch(new AuthActions.LoginStartAction({
        email: emailUser,
        password: passwordUser,
      }));
    } else {
      obser = this.authService.signup(emailUser, passwordUser);
    }

   /* obser.subscribe(
      (response) => {
        this.onLoading = false;
        this.router.navigate(['/recipes']);
      }, (errorData) => {
        this.error = errorData;
        this.onLoading = false;
      }
    )*/
    this.authForm.reset();

  }

  onCloseModal() {
    this.error = null;
  }

}
