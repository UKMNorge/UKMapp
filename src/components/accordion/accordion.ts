import { Component, Input } from '@angular/core';

/**
 * Generated class for the AccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent {

  private _visibleText = null;
  private _isShowing = false;

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

  constructor() { }

  toggleContent() {
    if (this.isShowing) {
      this.isShowing = false;
    } else {
      this.isShowing = true;
    }
  }
}
