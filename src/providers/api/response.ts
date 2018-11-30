export class ApiProviderResponse {
    private url:string;
    private success:boolean = false;
    private cached:boolean = false;
    private data:any = null;
  
    constructor( _url: string, _success:boolean, _cached:boolean, _data ) {
      this.success = _success;
      this.cached = _cached;
      this.data = _data;
      this.url = _url;
    }
  
    public getUrl() {
        return this.url;
    }
    public getData() {
      return this.data;
    }
    public isCached() {
      return this.cached;
    }
    public isSuccess() {
      return this.success;
    }
  }