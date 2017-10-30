import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.styl']
})
export class LoginPageComponent implements OnInit {

  private username: String;
  private password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.checkAuth();
    if (this.authService.username) {
      this.router.navigate(['home']);
    }
  }

  private login() {
    this.authService.login(
      this.username,
      this.password
    )
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
