import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/_shared/services/authentication.service'
import { AlertService } from 'src/app/_shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.style/auth.style.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  hide: boolean = true;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/calendar'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/calendar';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
      this.authenticationService.login(this.loginForm.value)
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
