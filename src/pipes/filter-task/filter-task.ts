import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../model/task/task.model';

/**
 * Generated class for the FilterTaskPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterTask',
})
export class FilterTaskPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(tasks: Task[], flag: number) {
    if(flag == -1) {
      return tasks;
    }else {
      return tasks.filter((task) => task.isComplete == flag);
    }
  }
}
