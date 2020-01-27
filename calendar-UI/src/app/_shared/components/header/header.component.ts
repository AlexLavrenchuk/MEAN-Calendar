import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_shared/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  
  private logoutUser(): void {
    this.authenticationService.logout()
    this.router.navigate(['/auth']);
  }
}
