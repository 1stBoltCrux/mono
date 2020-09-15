import { Component, OnInit } from '@angular/core';
import { AppFacade } from 'apps/profile-site/src/app/+state/app.facade';

@Component({
  selector: 'mono-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.scss']
})
export class ScratchComponent implements OnInit {
  noaaData$ = this.facade.noaaData$;

  constructor(private facade: AppFacade ) { }

  ngOnInit(): void {
    this.facade.fetchNoaaData();
  }

}
