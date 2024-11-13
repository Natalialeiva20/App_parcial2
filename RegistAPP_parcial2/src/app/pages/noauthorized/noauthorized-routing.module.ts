import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoauthorizedPage } from './noauthorized.page';

const routes: Routes = [
  {
    path: '',
    component: NoauthorizedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoauthorizedPageRoutingModule {}
