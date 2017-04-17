import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pulpe-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  @Input() title:string;

  constructor() {
  }

  ngOnInit() {
  }

}
