import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.styl']
})
export class LoginPageComponent implements OnInit {

  private username: String;
  private password: String;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  private login() {
    this.authService.login(
      this.username,
      this.password
    )
      .catch(err => {
        console.error(err);
      });
  }
}
