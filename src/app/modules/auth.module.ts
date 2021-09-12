import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from '../components/auth/auth.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
    { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule] 
})
export class AuthModule { }
