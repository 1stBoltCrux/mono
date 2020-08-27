import { Component, OnInit } from '@angular/core';
import { AppFacade } from 'apps/profile-site/src/app/+state/app.facade';

@Component({
  selector: 'profile-site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects$ = this.facade.projects$;

  constructor(private facade: AppFacade ) { }

  ngOnInit(): void {
  }

}
