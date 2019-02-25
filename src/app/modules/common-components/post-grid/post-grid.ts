import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WpPost, WpPostDetaljer } from '../../../services/ukmnorge/wordpress/post.models';

@Component({
	selector: 'post-grid',
	templateUrl: './post-grid.html',
	styleUrls: ['./post-grid.scss'],
})
export class PostGridComponent implements OnInit {

	@Input('posts') posts;
	@Output() onVisNyhet: EventEmitter<any> = new EventEmitter();

    iWasClicked( id ): void {
		console.log('INTERNAL: VIS NYHET'+ id );
        this.onVisNyhet.emit([id]);
	}
	
	ngOnInit(){}
	constructor() {}
}