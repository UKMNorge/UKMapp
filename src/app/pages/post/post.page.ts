import { Component } from '@angular/core';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WpPost, WpPostDetaljer } from 'src/app/services/ukmnorge/wordpress/post.models';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-page-post',
	templateUrl: 'post.page.html',
	styleUrls: []//'post.page.scss']
})
export class PostPage {
	public post_id = null;
	public post = null;
	public title = null;
	public content = null;
	public loaded = false;
	public base_url;

	constructor(
		private activeService: ActiveService,
		private monstringService: MonstringService,
		private domSanitizer: DomSanitizer,
		private inAppBrowser: InAppBrowser,
		private activatedRoute: ActivatedRoute
	) {
		this.base_url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.activeService.getPath().toString());
		let self = this;
		this.activatedRoute.paramMap.subscribe(
			(queryParams: ParamMap) => {
				self.post_id = queryParams.get('post_id');
			}
		);
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
            console.log(event.target.href);

            if (event.target.href.substring(0, 5) != 'https' || event.target.href.substring(0, 4) != 'http') {
                console.log("Fant uegnet url");

                this.inAppBrowser.create(event.target.href, "_system");
                return false;
            } else {
                this.inAppBrowser.create(event.target.href, "_system");
                return false;
            }
        }
	}
}