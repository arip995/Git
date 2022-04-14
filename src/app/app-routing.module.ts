import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path           : '',
    pathMatch      : 'full',
    redirectTo     : '/github/profile',
  },
  {
    path             : 'github/profile',
    pathMatch        : 'full',
    component        : ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
