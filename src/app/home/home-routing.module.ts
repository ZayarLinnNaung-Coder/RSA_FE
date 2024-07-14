import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UnlockPage } from './unlock-page/unlock.page';
import { GenerateKeyPage } from './generate-key-page/generate-key.page';
import { LockPage } from './lock-page/lock.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lock',
    pathMatch: 'full'
  },
  {
    path: 'lock',
    component: LockPage,
  },
  {
    path: 'unlock',
    component: UnlockPage,
  },
  {
    path: 'generate-key',
    component: GenerateKeyPage,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
