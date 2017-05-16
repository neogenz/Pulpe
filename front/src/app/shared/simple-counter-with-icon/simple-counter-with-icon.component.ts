import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pulpe-simple-counter-with-icon',
  templateUrl: './simple-counter-with-icon.component.html',
  styleUrls: ['./simple-counter-with-icon.component.css']
})
export class SimpleCounterWithIconComponent implements OnInit {

  @Input() label:string;
  @Input() value:string;
  @Input() icoClass:string;
  @Input() icoBackgroundColor:string;

  constructor() { }

  ngOnInit() {
  }

}
