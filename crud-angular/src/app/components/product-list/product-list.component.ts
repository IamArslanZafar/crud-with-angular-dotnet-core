import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
  export class ProductListComponent {
  router = inject(Router);
  productList: IProduct[] = [];
  httpService = inject(HttpService);
  toaster = inject(ToastrService);
  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'manufacturer',
    'category',
    'action'
  ];
  
  ngOnInit() {
    this.getProductFromServer();
  }
  getProductFromServer() {
    if (this.httpService.getAllProduct() instanceof Observable) {
      // `getAllProduct()` returns an Observable, so we can subscribe to it
      this.httpService.getAllProduct().subscribe({
        next: (result) => {
          if (result && result.isValid) {
            this.productList = result.data;
          } else {
            this.toaster.error(result.message || 'Error occurred while fetching products.');
          }
          // console.log(this.productList);
        },
        error: (error) => {
          //this.toaster.error(error);
          console.error("Observable"+error); // Log the error for debugging
        }
      });
    } else {
      console.log('getAllProduct() does not return an Observable');
    }
  }
  

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/product/' + id);
  }
  delete(id: number) {
    this.httpService.deleteProduct(id).subscribe(() => {
      console.log('deleted');
      // this.ProductList=this.ProductList.filter(x=>x.id!=id);
      this.getProductFromServer();
      this.toaster.success('Record deleted sucessfully');
    });
  }
}
