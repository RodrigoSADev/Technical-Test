import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  actRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  product: IProduct = {} as IProduct;

  ngOnInit() {
    const productId = this.actRoute.snapshot.paramMap.get('id')!;
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }
}
