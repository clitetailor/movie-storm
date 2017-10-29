import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.styl']
})
export class SignupPageComponent implements OnInit {

  private _validAges = Array.from({ length: 150 }, (v, k) => k);
  private username: String = '';
  private password: String = '';
  private confirmPassword: String = '';
  private gender: String = 'male';
  private age: Number = 5;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signup() {
    console.log(
      this.username,
      this.password,
      this.confirmPassword,
      this.gender,
      this.age
    );
  }

}
