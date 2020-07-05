import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  Type,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[lazyComp]'
})
export class LazyCompDirective implements OnDestroy {
  private _inputs: any;
  private _outputs: any;
  private subscription = new Subscription();

  @Input('lazyComp') set comp(type: any) {
    // TODO: Support components replacement
    if (type) {
      const factory = this.resolver.resolveComponentFactory(type);
      this.compRef = this.vcr.createComponent(factory);
      this.refreshInputs(this._inputs);
      Object.keys(this._outputs).forEach((output) => {
        this.subscription.add(
          (this.compRef.instance[output] as EventEmitter<any>).subscribe(
            this._outputs[output]
          )
        );
      });
    }
  }

  @Input() set inputs(data: any) {
    if (this.compRef) {
      this.refreshInputs(data);
      this.compRef.hostView.detectChanges();
    } else {
      this._inputs = data;
    }
  }

  @Input() set outputs(data: any) {
    this._outputs = data;
  }

  private compRef!: ComponentRef<any>;

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  private refreshInputs(inputs: any) {
    Object.keys(inputs).forEach(
      (inputName) => (this.compRef.instance[inputName] = inputs[inputName])
    );
  }

  ngOnDestroy(): void {
    this.compRef && this.compRef.destroy();
    (this.compRef as any) = null;
    this.subscription.unsubscribe();
  }
}
