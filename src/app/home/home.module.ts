import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { LockPage } from './lock-page/lock.page';
import { UnlockPage } from './unlock-page/unlock.page';
import { GenerateKeyPage } from './generate-key-page/generate-key.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, FooterComponent, LockPage, UnlockPage, GenerateKeyPage]
})
export class HomePageModule {}
