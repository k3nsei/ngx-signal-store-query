import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { App } from './app';

describe('GIVEN AppComponent', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTanStackQuery(
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 0,
              },
            },
          }),
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  describe('WHEN component was initialized', () => {
    it('THEN component instance should be truthy', () => {
      expect(component).toBeTruthy();
    });

    it('THEN component should be rendered', () => {
      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});
