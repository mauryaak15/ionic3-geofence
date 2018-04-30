import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacesListPage } from './places-list';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    PlacesListPage
  ],
  imports: [
    IonicPageModule.forChild(PlacesListPage),
    PipesModule
  ],
})
export class PlacesListPageModule {}
