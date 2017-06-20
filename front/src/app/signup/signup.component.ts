import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Router} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OnError} from "../_helpers/IUIErrorHandlerHelper";
import {document} from "@angular/platform-browser/src/facade/browser";


@Component({
  selector: 'pulpe-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnError, OnDestroy {
  authenticationRequest: Observable<AuthenticationProfile> = new Observable();
  subscribing: boolean = false;
  signupForm: FormGroup;
  passwordForm: FormGroup;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  isCoachCtrl: FormControl;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;

  isInError: boolean;
  errorMsg: string;

  constructor(private fb: FormBuilder, private localStorage: LocalStorageService, private authenticationService: AuthenticationService, private slimLoadingBarService: SlimLoadingBarService, private router: Router) {
    this.buildForm(fb);
  }

  ngOnInit() {
    document.body.className = "landing-page";
  }

  ngOnDestroy() {
    document.body.className = "";
  }

  private buildForm(fb: FormBuilder) {
    this.firstNameCtrl = fb.control('', Validators.required);
    this.lastNameCtrl = fb.control('', Validators.required);
    this.emailCtrl = fb.control('', Validators.required);
    this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(6)]);
    this.confirmPasswordCtrl = fb.control('', [Validators.required, Validators.minLength(6)]);
    this.isCoachCtrl = fb.control('');
    this.passwordForm = fb.group(
      {password: this.passwordCtrl, confirmPassword: this.confirmPasswordCtrl},
      {validator: SignupComponent.passwordMatch}
    );

    this.signupForm = fb.group({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      email: this.emailCtrl,
      passwordForm: this.passwordForm,
      isCoach: this.isCoachCtrl
    })
  }

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : {matchingError: true};
  }

  public signup(): void {
    this.subscribing = true;
    this.authenticationRequest = this.authenticationService.signup(
      this.firstNameCtrl.value,
      this.lastNameCtrl.value,
      this.emailCtrl.value,
      this.passwordCtrl.value,
      this.isCoachCtrl.value === 'coach' ? true : false
    );
    this.slimLoadingBarService.start();
    this.authenticationRequest
      .finally(() => {
        this.subscribing = false;
        this.slimLoadingBarService.complete();
      })
      .subscribe((authProfile) => {
          this.localStorage.set('profile', JSON.stringify(authProfile));
          if (authProfile.isCoach) {
            this.router.navigateByUrl('/profil/coach/complete');
          } else {
            this.router.navigateByUrl('/profil/member/complete');
          }
        },
        (errorMsg) => {
          this.displayErrorMsg(errorMsg);
        }
      );
  }

  displayErrorMsg(errorMsg: string) {
    this.errorMsg = errorMsg;
    this.isInError = true;
  }

  hideErrorMsg() {
    this.errorMsg = '';
    this.isInError = false;
  }
}
