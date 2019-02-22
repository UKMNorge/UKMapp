import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ukm-knapp',
  templateUrl: './knapp.html',
  styleUrls: ['./knapp.scss'],
})
export class UkmKnappComponent implements OnInit {
  @Input('title') title
  @Input('description') description

  constructor() {}
  public ngOnInit() {}
}