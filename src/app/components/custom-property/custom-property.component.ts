import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-custom-property',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './custom-property.component.html',
  styleUrl: './custom-property.component.scss',
})
export class CustomPropertyComponent {
  formBuilder = inject(FormBuilder);

  @Input() parentForm!: FormGroup;

  get customProperties(): FormArray {
    const customPropertiesControl = this.parentForm.get('customProperties');
    if (customPropertiesControl instanceof FormArray) {
      return customPropertiesControl;
    }
    throw new Error('customProperties is not a FormArray');
  }

  addCustomProperty() {
    const customProp = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      isNew: [true],
    });
    this.customProperties.push(customProp);
  }

  removeCustomProperty(index: number) {
    this.customProperties.removeAt(index);
  }
}
