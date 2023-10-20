import { Component } from '@angular/core';

@Component({
  template: ` <h1 class="errorMessage">404'd</h1> `,
  styles: [
    `
      .errorMessage {
        margin-top: 150px;
        font-size: 17rem;
        text-align: center;
        height: 70vh;
      }
    `,
  ],
})
export class Error404Component {
  constructor() {}
}
