import {
  Component,
  Injector,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  OnDestroy
} from '@angular/core';
import { BarComponent } from './bar/bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  foo!: Promise<any>;
  fooInjector!: Injector;

  @ViewChild('vcr', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  barRef!: ComponentRef<BarComponent> | null;

  bar: any;
  inputs = {
    title: 'Hello'
  };
  outputs = {
    titleChanges: (v: any) => {
      console.log(v);
    }
  };

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    this.barRef = null;
  }

  updateInputs(): void {
    this.inputs = {
      title: 'Changed'
    };
  }

  loadFoo(): void {
    if (!this.foo) {
      this.fooInjector = Injector.create({
        providers: [
          {
            provide: 'fooData',
            useValue: { id: 1, title: 'emoji' }
          }
        ],
        parent: this.injector
      });

      this.foo = import(
        /* webpackChunkName: 'foo' */ `./foo/foo.component`
      ).then(({ FooComponent }) => FooComponent);
    }
  }

  async loadBar(): Promise<any> {
    if (!this.barRef) {
      const { BarComponent } = await import(
        /* webpackPrefetch: true */ `./bar/bar.component`
      );
      const factory = this.resolver.resolveComponentFactory(BarComponent);
      this.barRef = this.vcr.createComponent(factory);
      this.barRef.instance.title = 'Changed';
      // Don't forget to unsubscribe
      this.barRef.instance.titleChanges.subscribe(console.log);
    }
  }

  t(): void {
    this.bar = import(`./bar/bar.component`).then(
      ({ BarComponent }) => BarComponent
    );
  }
}
