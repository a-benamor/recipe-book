import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAppReducer from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromAppReducer.ApplicationStateType>,
              @Inject(PLATFORM_ID) private palteformId) {}

  ngOnInit(): void {
    console.log('ngOnInit Begins');
    if (isPlatformBrowser(this.palteformId)) {
      console.log('Inside if: only browser side execution');
      this.store.dispatch(new AuthActions.AutoLoginAction());
    }
    console.log('ngOnInit End');
  }
}
