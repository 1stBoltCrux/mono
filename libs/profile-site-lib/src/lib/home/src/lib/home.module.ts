import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    { path: '', pathMatch: 'full', component: HomeComponent }
  ])],
  declarations: [HomeComponent, ProjectComponent],
})
export class HomeModule {}
