import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  foo!: Promise<any>;
  fooInjector!: Injector;

  constructor(private injector: Injector) {}

  loadFoo(): void {
    if (!this.foo) {
      this.fooInjector = Injector.create({
        providers: [
          {
            provide: 'fooData',
            useValue: { id: 1 }
          }
        ],
        parent: this.injector
      });

      this.foo = import(`./foo/foo.component`).then(
        ({ FooComponent }) => FooComponent
      );
    }
  }
}
