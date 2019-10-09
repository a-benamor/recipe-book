import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm', { static: false }) authForm: NgForm;
  isLoginMode = true;
  onLoading = false;
  error : string = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuthData() {
    console.log(this.authForm.value);
    if (!this.authForm.valid) {
      return;
    }
    let obser : Observable<AuthResponseData>;
    const emailUser = this.authForm.value.email;
    const passwordUser = this.authForm.value.password;

    this.onLoading = true;
    if (this.isLoginMode) {
      obser = this.authService.signIn(emailUser, passwordUser);
    } else {
      obser = this.authService.signup(emailUser, passwordUser);
    }

    obser.subscribe(
      (response) => {
        this.onLoading = false;
        this.router.navigate(['/recipes']);
      }, (errorData) => {
        this.error = errorData;
        this.onLoading = false;
      }
    )
    this.authForm.reset();

  }

  onCloseModal() {
    this.error = null;
  }

}
