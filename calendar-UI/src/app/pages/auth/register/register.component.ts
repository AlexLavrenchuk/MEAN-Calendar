import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from 'src/app/_shared/services/alert.service';
import { AuthenticationService } from 'src/app/_shared/services/authentication.service';

export interface type {
  name: string;
  value: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../auth.style/auth.style.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  hide = true;
  hideReplay = true;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
    ) { }

  validatorPasswordReplay(first: string, second: string) {
    return (group: FormGroup) => {
      if (group.controls[first].value !== group.controls[second].value) {
        return group.controls[second].setErrors({notEquivalent: true});
      } else {
        return group.controls[second].setErrors(null);
      }
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordReplay: ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: this.validatorPasswordReplay('password', 'passwordReplay')});

    // get return url from route parameters or default to '/calendar'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/calendar';
  }

  private onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
      this.authenticationService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Success");
            this.loginNewUser()
          },
          error => {
            console.log(error)
            this.alertService.error(error.error.massage);
            this.loading = false;
          });
  }

  private loginNewUser() {
    this.authenticationService.login(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Success");
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error.error.massage);
          this.loading = false;
        });
  }
}