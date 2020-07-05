import { Component, Inject, NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent {
  control = new FormControl();

  constructor(@Inject('fooData') data: any) {
    console.log(data);
  }
}

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [FooComponent]
})
class FooModule {}
