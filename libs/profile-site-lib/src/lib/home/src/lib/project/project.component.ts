import { Component, Input } from '@angular/core';
import { Project } from 'apps/profile-site/src/app/+state/app.models';

@Component({
  selector: 'profile-site-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  panelOpenState = true;
  @Input() project: Project;
}
