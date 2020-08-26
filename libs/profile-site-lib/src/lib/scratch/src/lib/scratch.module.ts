import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScratchComponent } from './scratch/scratch.component';
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    { path: '', pathMatch: 'full', component: ScratchComponent }
  ])],
  declarations: [ScratchComponent],
})
export class ScratchModule {}
