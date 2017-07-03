import {DifficultyEnum} from "../_enums/DifficultyEnum";
import {Injectable} from "@angular/core";
import {CategoryDocument} from "../_enums/CategoryDocument";
/**
 * Class used to convert category document.
 */
@Injectable()
export class CategoryDocumentConverter {

	private CategoryDocumentConverter = new Map<CategoryDocument, string>();

	constructor() {
		this.CategoryDocumentConverter.set(CategoryDocument.Profile, 'Profile');
	}

	public convertThis(category: CategoryDocument): string {
		return this.CategoryDocumentConverter.get(category);
	}
}
