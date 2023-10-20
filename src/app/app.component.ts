import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import { slideInAnimation } from './core/app.animation';
import { PaymentState } from './state/payment.state';
import * as fromPayment from './state/payment.reducer';
import { ToastrService } from './core/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  componentActive = true;

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private store: Store<{ payment: PaymentState }>,
    private toastrService: ToastrService
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvents(routerEvent);
    });
  }
  ngOnInit() {
    this.store
      .pipe(
        select(fromPayment.getError),
        takeWhile(() => this.componentActive)
      )
      .subscribe((error) => {
        if (error) {
          console.log(error);

          this.toastrService.error('Payment error, Please try again later');
        }
      });
  }

  getChild(route: ActivatedRoute) {
    if (route.firstChild) {
      return this.getChild(route.firstChild);
    } else {
      return route;
    }
  }

  checkRouterEvents(routerEvent: Event) {
    if (routerEvent instanceof NavigationEnd) {
      this.router.events.subscribe(() => {
        const rt = this.getChild(this.route);
        rt.data.subscribe((data) => {
          this.titleService.setTitle(`Payment | ${data.title}`);
        });
      });
    }
  }
}
