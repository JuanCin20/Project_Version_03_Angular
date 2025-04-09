import { Routes } from '@angular/router';
import { UserComponentComponent } from './user-component/user-component.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', component: UserComponentComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}