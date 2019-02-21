import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ukm-knapp',
  templateUrl: './knapp.html',
  styleUrls: ['./knapp.scss'],
})
export class UkmKnappComponent implements OnInit {

  text: string;

  @Input('title') title
  @Input('description') description

  constructor() {
    console.log('Hello UkmKnappComponent Component');
  }

  public ngOnInit() {
    this.text = 'Hello World';
  }

}