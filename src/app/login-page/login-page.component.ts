import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.styl']
})
export class LoginPageComponent implements OnInit {

  private username: String;
  private password: String;

  constructor() { }

  ngOnInit() {
  }

  private login() {
    console.log(
      this.username,
      this.password
    );
  }
}
