import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.styl']
})
export class LoginPageComponent implements OnInit {

  private identity;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.checkUserId()
      .then((userId) => {
        if (
          (userId || userId === 0)
          && userId !== -1
        ) {
          this.router.navigate(['home']);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private login() {
    if (
      !Number.isNaN(this.identity)
      && Number.isInteger( Number(this.identity) )
    ) {
      this.authService.setUserId(this.identity);
      this.router.navigate(['home']);
    } else {
      console.error('Login Failed!');
    }
  }
}
