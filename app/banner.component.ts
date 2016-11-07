import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{title}}</h1>',
  styles: [`
    h1 {
      font-size: 1.2em;
      color: #999;
      margin-bottom: 0;
    }
  `]
})
export class BannerComponent {
  title = 'Tour of Heroes';
}
