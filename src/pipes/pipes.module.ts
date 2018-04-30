import { NgModule } from '@angular/core';
import { TruncatePipe } from './truncate/truncate';
import { FilterTaskPipe } from './filter-task/filter-task';
@NgModule({
	declarations: [TruncatePipe,
    FilterTaskPipe],
	imports: [],
	exports: [TruncatePipe,
    FilterTaskPipe]
})
export class PipesModule {}
