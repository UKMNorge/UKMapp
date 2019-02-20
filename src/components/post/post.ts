import { Component, Input } from '@angular/core';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { PostContent } from '../../providers/wordpress/postcontent';
/**
 * Generated class for the PostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 @Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent{
  private _pid = null;

  @Input()
  set pid(pid) {
    this._pid = (pid) || -1;
    console.error(pid, typeof(pid));
    
  }
  
  get pid(): Number { return this._pid}

  public post = null;
  public loading = true;

  constructor(
    private wordpressProvider: WordpressProvider
  ) {
  }
  ngOnInit() {

    console.log('Hello PostComponent Component');
    let self = this;
    console.log(self._pid, typeof(self._pid));
    console.log(self.post, typeof(self.post));
    
    self.wordpressProvider.getPostContentProvider().get(parseInt(self._pid)).then(
      (content:PostContent) => 
      {
          console.group('POST.ts');
          console.log('PostContent got data')
          console.error('Hello content',  content );
          console.groupEnd();
          self.post = content;
          self.loading = false;
      }
    );
  }
}


