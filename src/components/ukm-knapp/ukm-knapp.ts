import { Component } from '@angular/core';

/**
 * Generated class for the UkmKnappComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ukm-knapp',
  templateUrl: 'ukm-knapp.html'
})
export class UkmKnappComponent {

  text: string;

  constructor() {
    console.log('Hello UkmKnappComponent Component');
    this.text = 'Hello World';
  }

}
