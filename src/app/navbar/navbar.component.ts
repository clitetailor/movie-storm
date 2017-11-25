import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit {

  private userId = -1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.checkUserId();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkUserId();
      }
    });
  }

  private checkUserId() {
    this.authService.checkUserId()
      .then((userId: number | undefined) => {
        this.ngZone.run(() => {
          this.userId = userId;
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  private logout() {
    this.authService.logout()
      .then((userId: number | undefined) => {
        this.userId = userId;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
