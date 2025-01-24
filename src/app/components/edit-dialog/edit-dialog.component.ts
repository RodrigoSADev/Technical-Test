import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IResponseProduct } from '../../interfaces/product.interface';
import { CustomPropertyComponent } from '../custom-property/custom-property.component';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatFormFieldModule,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CommonModule,
    CustomPropertyComponent,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  editForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IResponseProduct) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [this.data.id],
      sku: [{ value: this.data.sku, disabled: true }],
      name: [this.data.name, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      cost: [
        this.data.cost,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      profile: this.formBuilder.group({
        type: [this.data.profile.type],
        available: [this.data.profile.available],
        backlog: [this.data.profile.backlog],
        customProperties: this.formBuilder.array(
          this.data.profile.customProperties
            ? this.data.profile.customProperties.map((prop) =>
                this.formBuilder.group({
                  key: [prop.key, Validators.required],
                  value: [prop.value, Validators.required],
                })
              )
            : []
        ),
      }),
    });
  }

  get customProperties(): FormArray {
    return this.editForm.get('profile.customProperties') as FormArray;
  }

  get profileForm(): FormGroup {
    const profile = this.editForm.get('profile');
    if (!profile || !(profile instanceof FormGroup)) {
      throw new Error('Profile form is not a FormGroup');
    }
    return profile;
  }
}
