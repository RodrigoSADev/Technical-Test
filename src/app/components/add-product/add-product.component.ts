import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  // FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

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
      backlog: [null],
      customProperties: this.formBuilder.array([]),
    }),
  });

  get customProperties(): FormArray {
    return this.addForm.get('profile.customProperties') as FormArray;
  }

  addCustomProperty() {
    const customProp = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.customProperties.push(customProp);
  }

  removeCustomProperty(index: number) {
    this.customProperties.removeAt(index);
  }

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
      } as unknown as IProduct;
      this.productService.addProduct(product).subscribe({
        next: (response) => {
          this.addForm.reset();
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    }
  }
}
