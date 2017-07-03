import {Component, Input, OnInit} from '@angular/core';
import {Coach} from "../../../_model/Coach";
import {Member} from "../../../_model/Member";
import {Document} from "../../../_model/Document";
import {DialogService} from "ng2-bootstrap-modal";
import {PhotoFormDialogComponent} from "./photo-form-dialog/photo-form-dialog.component";
import {DomSanitizer} from "@angular/platform-browser";
import {ProfileService} from "../../../member/profile/profile.service";
import {DocumentService} from "../../../_services/document.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs/Observable";
import {AuthenticationService} from "../../../_services/authentication/authentication.service";
import {AuthenticationProfile} from "../../../_model/AuthenticationProfile";
import {CategoryDocument} from "../../../_enums/CategoryDocument";

const DEFAULT_PHOTO = '../../../../assets/profile/profile.png';

@Component({
	selector: 'pulpe-profile-photo',
	templateUrl: 'profile-photo.component.html',
	styleUrls: ['profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {
	documentRequest: Observable<Document> = new Observable();
	authenticationProfile: AuthenticationProfile;
	@Input() member: Member;
	@Input() coach: Coach;
	document: Document;

	constructor(private dialogService: DialogService,
							private sanitizer: DomSanitizer,
							private documentService: DocumentService,
							private auth: AuthenticationService) {
	}

	ngOnInit() {
		if (!this.document) {
			this.document = Document.of()
				.data(DEFAULT_PHOTO)
				.build();
		}
		this.getPictureProfile();
	}

	getPictureProfile() {
		this.authenticationProfile = this.auth.getAuthenticationProfileInLocalStorage();
		if (this.authenticationProfile.isCoach) {
			this.documentRequest = this.documentService.findDocumentCoachBy(CategoryDocument.Profile);
		} else {
			this.documentRequest = this.documentService.findDocumentMemberBy(CategoryDocument.Profile);
		}
		this.documentRequest
			.finally(() => {
			})
			.subscribe((document) => {
					if (document) {
						this.document = document;
					}
				}
			);
	}

	openPhotoDialog() {
		this.dialogService.addDialog(PhotoFormDialogComponent, {
			document: this.document
		}, {backdropColor: 'rgba(0,0,0,0.5)'})
			.subscribe((document) => {
				if (document) {
					this.document = document;
				}
			});
	}
}
