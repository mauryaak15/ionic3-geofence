import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskListPage } from './task-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TaskListPage
  ],
  imports: [
    IonicPageModule.forChild(TaskListPage),
    PipesModule
  ],
})
export class TaskListPageModule {}
