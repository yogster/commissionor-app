import { NgModule } from '@angular/core';
import { LocationComponent } from './location/location';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [LocationComponent],
	imports: [ IonicModule ],
	exports: [LocationComponent]
})
export class ComponentsModule {}
