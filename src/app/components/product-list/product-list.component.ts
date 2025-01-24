import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-product-list',
  imports: [MatTableModule, MatButtonModule, AddProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);
  dialog = inject(MatDialog);

  products = this.productService.products;
  hasError: boolean = false;
  showModal: boolean = false;
  displayedColumns: string[] = ['index', 'sku', 'name', 'price', 'actions'];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      error: (error) => {
        this.hasError = true;
        console.error('Error fetching products:', error);
      },
    });
    // this.productService.getProducts().subscribe({
    //   next: (response) => {
    //     this.products = response;
    //   },
    //   error: (error) => {
    //     this.hasError = true;
    //     console.error('Error fetching products:', error);
    //   },
    // });
  }

  onView(product: IProduct) {
    this.router.navigate(['/product', product.id]);
  }

  onEdit(product: IProduct) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '800px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.updateProduct(result).subscribe();
      }
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.products = this.products.map((p) =>
    //       p.id === product.id ? result : p
    //     );
    //   }
    // });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(id).subscribe();
      }
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.productService.deleteProduct(id).subscribe({
    //       next: () => {
    //         this.products = this.products.filter(
    //           (product) => product.id !== id
    //         );
    //       },
    //       error: (error) => {
    //         console.error('Error deleting product:', error);
    //       },
    //     });
    //   }
    // });
  }
}
