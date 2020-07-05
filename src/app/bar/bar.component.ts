import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, OnDestroy {
  title = 'Default';
  titleChanges = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
