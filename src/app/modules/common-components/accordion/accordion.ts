import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'accordion',
	templateUrl: './accordion.html',
	styleUrls: ['./accordion.scss'],
})
export class AccordionComponent implements OnInit {

	private _visibleText = null;
	private _isShowing = false;

	constructor() {
		console.log('Hello AccordionComponent');
	}

	public ngOnInit() {
	}

	@Input('title') title: String;

	@Input()
	set visibleText(visibleText) {
		this._visibleText = (visibleText) || -1;

	}
	@Input()
	set isShowing(isShowing) {
		this._isShowing = (isShowing) || false;
	}





	get visibleText(): Number { return this._visibleText }
	get isShowing(): boolean { return this._isShowing }

	toggleContent() {
		if (this.isShowing) {
			this.isShowing = false;
		} else {
			this.isShowing = true;
		}
	}
}
