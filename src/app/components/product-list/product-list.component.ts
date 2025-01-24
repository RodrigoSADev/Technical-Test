import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product-list',
  imports: [MatTableModule, MatButtonModule, AddProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);
  products: IProduct[] = [];
  showModal: boolean = false;
  displayedColumns: string[] = ['index', 'sku', 'name', 'price', 'actions'];

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  onView(product: IProduct) {
    this.router.navigate(['/product', product.id]);
  }
}
