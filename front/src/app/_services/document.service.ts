import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Document} from "../_model/Document";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../environments/environment'
import {AuthHttp} from "angular2-jwt";
import {CategoryDocument} from "../_enums/CategoryDocument";
import {CategoryDocumentConverter} from "../shared/CategoryDocumentConverter";

@Injectable()
export class DocumentService extends ObservableHelper {

	constructor(private http: AuthHttp,
							private localStorageService: LocalStorageService,
							private categoryDocumentConverter: CategoryDocumentConverter) {
		super();
	}

	public findDocumentCoachBy(categoryDocument: CategoryDocument): Observable<Document> {
		let category: string;
		category = this.categoryDocumentConverter.convertThis(categoryDocument).toLowerCase();
		return this.http.get(`${environment.baseUrl()}/documents/coachs/category/${category}`)
			.map(response => {
				const data: any = this.extractDataOf(response);
				if (data.document) {
					return Document.of()
						.id(data.document._id)
						.data(data.document.data)
						.format(data.document.format)
						.memberId(data.document.member)
						.coachId(data.document.coach)
						.build();
				}
			}).catch(this.handleError);
	}

	public findDocumentMemberBy(categoryDocument: CategoryDocument): Observable<Document> {
		let category: string;
		category = this.categoryDocumentConverter.convertThis(categoryDocument).toLowerCase();
		return this.http.get(`${environment.baseUrl()}/documents/members/category/profile`)
			.map(response => {
				const data: any = this.extractDataOf(response);
				if (data.document) {
					return Document.of()
						.id(data.document._id)
						.data(data.document.data)
						.format(data.document.format)
						.memberId(data.document.member)
						.coachId(data.document.coach)
						.build();
				}
			}).catch(this.handleError);
	}

	public save(document: Document): Observable<Document> {
		return this.http.put(`${environment.baseUrl()}/documents`, {
			document: document
		}).map(response => {
			const data: any = this.extractDataOf(response);
			return Document.of()
				.id(data.document._id)
				.data(data.document.data)
				.format(data.document.format)
				.memberId(data.document.member)
				.coachId(data.document.coach)
				.build();
		}).catch(this.handleError);
	}
}