import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavModule } from './nav/src';

@NgModule({
  imports: [
    NavModule,
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: 'home',
          loadChildren: () =>
            import('./home/src').then((module) => module.HomeModule),
        },
        {
          path: 'about',
          loadChildren: () =>
            import('./about/src').then((module) => module.AboutModule),
        },
        {
          path: 'scratch',
          loadChildren: () =>
            import('./scratch/src').then((module) => module.ScratchModule),
        },
        { path: '', pathMatch: 'full', redirectTo: 'home' },
        { path: '**', redirectTo: 'home' },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
  ],
  declarations: [],
  exports: [NavModule],
})
export class ProfileSiteLibModule {}
