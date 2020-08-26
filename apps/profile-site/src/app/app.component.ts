import { Component, OnInit } from '@angular/core';
import { AppFacade } from './+state/app.facade';

@Component({
  selector: 'mono-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.facade.loadApp();
  }

  constructor(private facade: AppFacade) {}
}
