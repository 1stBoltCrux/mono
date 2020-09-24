import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScratchComponent } from './scratch/scratch.component';
import { RouterModule } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { LineGraphComponent } from './line-graph/line-graph.component'

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    { path: '', pathMatch: 'full', component: ScratchComponent }
  ])],
  declarations: [ScratchComponent, GraphComponent, LineGraphComponent],
})
export class ScratchModule {}
