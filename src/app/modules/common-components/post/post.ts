import { Component, OnInit, Input } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WpPost, WpPostDetaljer } from '../../../services/ukmnorge/wordpress/post.models';

@Component({
	selector: 'post',
	templateUrl: './post.html',
	styleUrls: ['./post.scss'],
})
export class PostComponent implements OnInit {
	public post = null;
	public title = null;
	public content = null;
	public loaded = false;
	public base_url;

	@Input('post_id') post_id: Number;

	constructor(
		private activeService: ActiveService,
		private monstringService: MonstringService,
		private domSanitizer: DomSanitizer,
		private inAppBrowser: InAppBrowser
	) {
		this.base_url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.activeService.getPath().toString());
	}

	ngOnInit() {
		let self = this;
		this.monstringService.getPosts().get(this.post_id).subscribe(
			(post: WpPost) => {
				self.title = post.title;
				self.post = post;
				self.loaded = true;
			}
		);
		this.monstringService.getPosts().getDetaljer( this.post_id ).subscribe(
			(postData: WpPostDetaljer) => {
				self.content = postData.content;
			}
		)
	}

	handleClick(event) {
        if (event.target.tagName == "A") {
            //console.log(event.target.href);

            if (event.target.href.substring(0, 5) != 'https' || event.target.href.substring(0, 4) != 'http') {
                //console.log("Fant uegnet url");

                this.inAppBrowser.create(event.target.href, "_system");
                return false;
            } else {
                this.inAppBrowser.create(event.target.href, "_system");
                return false;
            }
        }
    }
}


