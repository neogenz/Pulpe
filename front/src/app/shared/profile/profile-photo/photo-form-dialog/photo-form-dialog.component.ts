import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from "rxjs/Observable";
import {Document} from "../../../../_model/Document";
import {DocumentService} from "../../../../_services/document.service";
import {AuthenticationService} from "../../../../_services/authentication/authentication.service";
import {AuthenticationProfile} from "../../../../_model/AuthenticationProfile";
import {CategoryDocument} from "../../../../_enums/CategoryDocument";
import {CategoryDocumentConverter} from "../../../CategoryDocumentConverter";

const BASE_64 = 'data:image/jpg;base64, ';

@Component({
	selector: 'pulpe-photo-form-dialog',
	templateUrl: './photo-form-dialog.component.html',
	styleUrls: ['./photo-form-dialog.component.scss']
})
export class PhotoFormDialogComponent extends DialogComponent<IForm, Document> implements IForm, OnInit {
	request: Observable<Document> = new Observable();
	authenticationProfile: AuthenticationProfile;
	document: Document;
	dataPicture: string;

	constructor(dialogService: DialogService,
							private slimLoadingBarService: SlimLoadingBarService,
							private toastrService: ToastrService,
							private sanitizer: DomSanitizer,
							private documentService: DocumentService,
							private auth: AuthenticationService,
							private categoryDocumentConverter: CategoryDocumentConverter) {
		super(dialogService);
	}

	ngOnInit() {
		if (!this.document) {
			this.dataPicture = '../../../../assets/profile/profile.png';
			this.sanitizer.bypassSecurityTrustUrl(this.dataPicture);
		} else {
			this.dataPicture = this.document.data;
		}
		this.authenticationProfile = this.auth.getAuthenticationProfileInLocalStorage();
	}

	handleFileSelect(evt) {
		const files = evt.target.files;
		const file = files[0];
		if (files && file) {
			if (this.canUpload(file)) {
				const reader = new FileReader();
				reader.onload = _handleReaderLoaded.bind(this);
				reader.readAsBinaryString(file);
			}
		}
	}

	confirm() {
		const document = Document.of()
			.id(this.document._id)
			.format(this.document.format)
			.data(this.dataPicture)
			.category(this.categoryDocumentConverter.convertThis(CategoryDocument.Profile))
			.build();
		debugger;
		if (this.authenticationProfile.isCoach) {
			document.coachId = this.authenticationProfile.id;
		} else {
			document.memberId = this.authenticationProfile.id;
		}

		this.slimLoadingBarService.start();
		this.request = this.documentService.save(document);
		this.request
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((document) => {
					this.result = document;
					this.close();
					this.toastrService.success('Votre photo a bien été mis à jour.', 'Succès');
				},
				(errorMsg) => {
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}

	canUpload(file) {
		const sizeMB = (file.size / 1024 / 1024);
		if (sizeMB > 1) {
			this.toastrService.error('Votre fichier ne doit pas dépasser 1 MO', 'Erreur');
			return false;
		}
		return true;
	}
}

export interface IForm {
	document: Document;
}

function _handleReaderLoaded(readerEvt) {
	const binaryString = readerEvt.target.result;
	const base64File = btoa(binaryString);
	this.dataPicture = BASE_64 + base64File;
}
