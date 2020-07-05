import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  foo!: Promise<any>;

  loadFoo(): void {
    if (!this.foo) {
      this.foo = import(`./foo/foo.component`).then(
        ({ FooComponent }) => FooComponent
      );
    }
  }
}
