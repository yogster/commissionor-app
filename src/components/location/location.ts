import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LocationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'location',
  templateUrl: 'location.html'
})
export class LocationComponent {

  @Input("locationNumber") locationNumber: number;
  @Output("onDelete") onDelete = new EventEmitter();

  static createFormGroup(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      site: ['', Validators.required],
      room: ['', Validators.required],
      door: ['', Validators.required]
    })
  }

  private deleteLocation() {
    this.onDelete.emit(this.locationNumber);
  }
}
