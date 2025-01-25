import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IResponseProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProfileEditorComponent } from '../profile-editor/profile-editor.component';

@Component({
  selector: 'app-add-product',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    ProfileEditorComponent,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  formBuilder = inject(FormBuilder);
  productService = inject(ProductService);

  addForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    cost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    sku: ['', [Validators.required]],
    profile: this.formBuilder.group({
      type: ['furniture'],
      available: [true],
      backlog: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      customProperties: this.formBuilder.array([]),
    }),
  });

  onAddProduct() {
    if (this.addForm.valid) {
      const product = this.addForm.value as {
        name: string;
        description: string;
        cost: string;
        profile: {
          type: string;
          available: boolean;
          backlog: any;
          customProperties: { key: string; value: string }[];
        };
      } as unknown as IResponseProduct;
      this.productService.addProduct(product).subscribe({
        next: () => {
          this.addForm.reset();
          this.customProperties.clear();
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    }
  }

  get customProperties(): FormArray {
    return this.addForm.get('profile.customProperties') as FormArray;
  }

  get profileForm(): FormGroup {
    const profile = this.addForm.get('profile');
    if (!profile || !(profile instanceof FormGroup)) {
      throw new Error('Profile form is not a FormGroup');
    }
    return profile;
  }
}
