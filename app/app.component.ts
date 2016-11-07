import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <app-banner></app-banner>
    <nav>
      <a routerLink='/dashboard' routerLinkActive='active'>Dashboard</a>
      <a routerLink='/heroes' routerLinkActive='active'>Heroes</a>
      <a routerLink='/form' routerLinkActive='active'>Form</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {
}
