import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReaderLocation } from '../../providers/commissionor/reader-location';

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

  @Input() form: FormGroup;
  @Input() locationNumber: number;
  @Output() onDelete = new EventEmitter<number>();

  static createFormGroup(formBuilder: FormBuilder, location: ReaderLocation): FormGroup {
    return formBuilder.group({
      site: [location ? location.site : '', Validators.required],
      room: [location ? location.room : '', Validators.required],
      door: [location ? location.door : '', Validators.required]
    })
  }

  private deleteLocation() {
    this.onDelete.emit(this.locationNumber);
  }
}
