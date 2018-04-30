import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTaskPage } from './edit-task';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EditTaskPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(EditTaskPage),
  ],
})
export class EditTaskPageModule {}
