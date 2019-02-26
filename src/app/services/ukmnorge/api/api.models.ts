export class ApiRequest {

	private resolve = null;
	private data = null;

	constructor(
		private type,
		private id,
		private url,
		private api,
		private placeholder,
	) {
		let supportedTypes = ['collection', 'object'];
		if (supportedTypes.indexOf(type) < 0) {
			throw Error('Unsupported ApiRequest type ' + type + '. Should be one of: ' + supportedTypes.join(', '));
		}
	}

	public getType() {
		return this.type;
	}
	public getId() {
		return (this.getType() == 'collection' ? 'list' : '') + this.id;
	}

	public getUrl() {
		return this.url;
	}

	public getApi() {
		return this.api;
	}

	public getPlaceholder() {
		return this.placeholder;
	}

	public setResolve(resolve) {
		this.resolve = resolve;
	}
	public getResolve() {
		return this.resolve;
	}

	public setData(data) {
		this.data = data;
	}
	public getData() {
		return this.data;
	}
}


export abstract class BasicPlaceholder {
	public id: number;
	
	public isPlaceholder() {
		return this.id == 0;
	}
}