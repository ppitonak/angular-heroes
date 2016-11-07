import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

let comp: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let de: DebugElement;
let el: HTMLElement;
let heroService: HeroService;
let testHero: Hero = new Hero(15, 'Superman', 'Can fly');
let heroServiceStub = {
  getHero: (id: Number) => { return Promise.resolve(testHero); }
};
let routeStub = {
  params: [{ 'id': 1 }]
};

describe('HeroDetailComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent], // declare the test component
      providers: [{ provide: ActivatedRoute, useValue: routeStub }, { provide: HeroService, useValue: heroServiceStub },
      { provide: Location, useValue: null }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    comp = fixture.componentInstance; // BannerComponent test instance
  });

  it('should create a component', () => {
    expect(comp).toBeDefined();
  });

  it('should not display hero\'s name before the component is initialized', () => {
    let de = fixture.debugElement.query(By.css('h2'));
    expect(de).toBeNull();
  });

  it('should display hero\'s name after the component is initialized (using fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(el.textContent).toContain('Superman details!');
  }));

  it('should display hero\'s name after the component is initialized (using async)', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let el = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(el.textContent).toContain('Superman details!');
    });
  }));

  it('should display hero\'s name after the component is initialized (using jasmine.done)', (done) => {
    heroService = fixture.debugElement.injector.get(HeroService);
    let spy = spyOn(heroService, 'getHero').and.callThrough();
    fixture.detectChanges();

    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      let el = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(el.textContent).toContain('Superman details!');
      done();
    })
  });

});
