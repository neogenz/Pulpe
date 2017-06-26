import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';

@Component({
	selector: 'pulpe-header-list',
	templateUrl: 'header-list.component.html',
	styleUrls: ['header-list.component.scss']
})
export class HeaderListComponent implements OnInit {
	@Output() filterArgs = new EventEmitter<string>();
	@Input() nbElements: number;
	@Input() title: string;
	@Input() icon: string;
	@Input() placeHolderTitle: string;
	searchInput: string;

	constructor() {
	}

	ngOnInit() {
	}

	change() {
		this.filterArgs.emit(this.searchInput);
	}
}
