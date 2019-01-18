import { Component, Input } from '@angular/core';

/**
 * Generated class for the MorphIconComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'morph-icon',
  templateUrl: 'morph-icon.html'
})
export class MorphIconComponent {

  @Input('startIcon') startIcon
  @Input('stopIcon') stopIcon

  morphClick( element ) {
		let icon1 = element.target.parentNode.children[0];
		let icon2 = element.target.parentNode.children[1];

		[icon1, icon2].forEach( function( icon ) {
			if( icon.className.indexOf('hidden') == -1 ) {
				icon.className = icon.className.replace('visible', '').replace('  ','') + ' hidden'
			} else {
				icon.className = icon.className.replace('hidden', '').replace('  ','') + ' visible'
			}
		});
	}
}
