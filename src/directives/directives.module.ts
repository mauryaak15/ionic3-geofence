import { NgModule } from '@angular/core';
import { FocuserDirective } from './focuser/focuser';
@NgModule({
	declarations: [FocuserDirective,
    FocuserDirective],
	imports: [],
	exports: [FocuserDirective,
    FocuserDirective]
})
export class DirectivesModule {}
