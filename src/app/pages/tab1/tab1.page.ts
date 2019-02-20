import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	public data = null;
	public alle_hendelser = null;
	public alle_innslag = null;
	public alle_kontakter = null;
	public hendelsen = null;
	public innslaget = null;
	public posts = null;
	public post = null;
	public postDetails = null;
	public infopages = null;
	public monstringer = null;

	constructor(
		private monstringService: MonstringService
	) { }

	ngOnInit() {
		console.log('ngOnInit');
		let self = this;
		this.monstringService.setId(5493, 'https://ukm.no/testfylke/');
		this.monstringService.getData().subscribe(
			(data) => {
				console.log('PAGECONTROLLER GOT MONSTRING DATA', data);
				self.data = data;
			}
		);

		// Hent alle mønstringer
		this.monstringService.getMonstringer().subscribe(
			data => {
				self.monstringer = data;
			}
		);

		// Hent en post sitt content
		this.monstringService.getServ('posts').getInfo().subscribe(
			data => {
				self.infopages = data;
			}
		);

		// Hent en post sitt content
		this.monstringService.getServ('posts').getDetaljer(43).subscribe(
			data => {
				self.postDetails = data;
			}
		);

		// Hent en post
		this.monstringService.getServ('posts').get(43).subscribe(
			data => {
				self.post = data;
			}
		)

		// Hent liste av posts
		this.monstringService.getServ('posts').getFrontlist().subscribe(
			data => {
				self.posts = data;
			}
		);

		// Hent info om ett innslag
		this.monstringService.getServ('innslag').getDetaljer("160415").subscribe(
			data => {
				self.innslaget = data;
			}
		);

		// Hent info om en hendelse
		this.monstringService.getServ('innslag').getHendelse("12908").subscribe(
			(data) => {
				self.hendelsen = data;
			}
		);

		// Hent alle kontakter for mønstringen
		this.monstringService.getServ('kontakter').getMonstring().subscribe(
			(data) => {
				self.alle_kontakter = data;
			}
		);

		// Hent alle innslag i en hendelse
		this.monstringService.getServ('hendelser').getMonstringProgram().subscribe(
			(data) => {
				self.alle_hendelser = data;
			}
		);

		// Hent alle innslag på mønstringen
		this.monstringService.getServ('innslag').getMonstringInnslag().subscribe(
			(data) => {
				self.alle_innslag = data;
			}
		);

	}
}
