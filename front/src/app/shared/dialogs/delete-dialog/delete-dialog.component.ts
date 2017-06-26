import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ToastrService} from "ngx-toastr";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
	selector: 'pulpe-delete-dialog',
	templateUrl: 'delete-dialog.component.html',
	styleUrls: ['delete-dialog.component.scss']
})
export class DeleteDialogComponent extends DialogComponent<IDeletable, Object> implements IDeletable, OnInit {
	id: string;
	title: string;
	description: string;

	constructor(dialogService: DialogService, private slimLoadingBarService: SlimLoadingBarService, private toastrService: ToastrService) {
		super(dialogService);
	}

	ngOnInit() {
	}

	delete() {

	}
}

export interface IDeletable {
	id: any;
	title: any;
	description: any;
}