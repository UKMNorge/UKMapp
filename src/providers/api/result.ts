export class ApiProviderResult {
    private url:string;
    private id:string|number;
    private data:any = null;
  
    constructor( _id:string|number, _url: string ) {
      this.id = _id;
      this.url = _url;
    }
  
    public getId() {
        return this.id;
    }
    public getData() {
      return this.data;
    }
    public setData( data ) {
      this.data = data;
    }
    public getUrl() {
      return this.url;
    }
  }