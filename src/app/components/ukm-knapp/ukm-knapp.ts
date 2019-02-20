import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ukm-knapp',
  templateUrl: './ukm-knapp.html',
  styleUrls: ['./ukm-knapp.scss'],
})
export class UkmKnappComponent implements OnInit {

  text: string;

  constructor() {
    console.log('Hello UkmKnappComponent Component');
  }

  public ngOnInit() {
    this.text = 'Hello World';
  }

}