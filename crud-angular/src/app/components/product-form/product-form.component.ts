import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IProduct } from '../../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  // Inject FormBuilder, HttpService, Router, ActivatedRoute, and ToastrService
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  // Define the productForm using FormBuilder
  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    manufacturer: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  productId!: number;
  isEdit = false;

  ngOnInit() {
    // Get the productId from the route params
    this.productId = this.route.snapshot.params['id'];

    // Check if editing an existing product
    if (this.productId) {
      this.isEdit = true;
      // Fetch the product data from the backend
      this.httpService.getProduct(this.productId).subscribe((result) => {
        // Update the form with fetched product data
        if (result.isValid) {
          this.productForm.patchValue(result.data);
        } else {
          this.toaster.error(result.message);
        }
      });
    }
  }

  // Method to save the product
  save() {
    // Check if form is invalid
    if (this.productForm.invalid) {
      // Display error messages for each invalid control
      Object.keys(this.productForm.controls).forEach((key) => {
        const control = this.productForm.get(key);
        if (control?.invalid) {
          if (control.hasError('required')) {
            this.toaster.error(`${key} is required.`);
          } else if (control.hasError('min')) {
            this.toaster.error(`${key} must be greater than zero.`);
          } else if (control.hasError('pattern')) {
            this.toaster.error(
              `${key} must be a valid number with up to two decimal places.`
            );
          }
        }
      });
      return;
    }

    // Create a Product object from form data
    const product: IProduct = {
      id: this.productId,
      name: this.productForm.value.name!,
      description: this.productForm.value.description!,
      price: this.productForm.value.price!,
      manufacturer: this.productForm.value.manufacturer!,
      category: this.productForm.value.category!,
    };

    // Check if editing an existing product
    if (this.isEdit) {
      // Update the product
      this.httpService.updateProduct(this.productId, product).subscribe(
        (result) => {
          // Handle success or error response
          if (result.isValid) {
            this.toaster.success('Record updated successfully.');
            this.router.navigateByUrl('/product-list');
          } else {
            this.toaster.error(result.message);
          }
        },
        (error) => {
          console.error('Error updating product:', error);
          this.toaster.error('Error occurred while updating product.');
        }
      );
    } else {
      // Create a new product
      this.httpService.createProduct(product).subscribe(
        (result) => {
          // Handle success or error response
          if (result.isValid) {
            this.toaster.success('Record added successfully.');
            this.router.navigateByUrl('/product-list');
          } else {
            this.toaster.error(result.message);
          }
        },
        (error) => {
          console.error('Error creating product:', error);
          this.toaster.error('Error occurred while adding product.');
        }
      );
    }
  }
}
