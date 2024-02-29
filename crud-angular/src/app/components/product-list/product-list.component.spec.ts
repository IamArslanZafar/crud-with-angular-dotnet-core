import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { HttpService } from '../../http.service';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IProduct } from '../../interfaces/product';
import { IResponseObject } from '../../interfaces/responseObject';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let toasterServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getAllProduct', 'deleteProduct']);
    const toasterSpy = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpService, useValue: httpSpy },
        { provide: ToastrService, useValue: toasterSpy }
      ]
    }).compileComponents();

    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    toasterServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProductFromServer on ngOnInit', () => {
    spyOn(component, 'getProductFromServer');
    component.ngOnInit();
    expect(component.getProductFromServer).toHaveBeenCalled();

  });


  it('should fetch Products from server', (() => {
    // Mock data to be returned from the HTTP call
    const mockProductList :IProduct[] = [];
    debugger
    const IResponseObject: IResponseObject = {
      isValid: true,
      message: '', // Add an empty message or any appropriate message
      data: mockProductList
    };  // Set up the spy to return the mock data when getAllProduct is called
    httpServiceSpy.getAllProduct.and.returnValue(of(IResponseObject));
    // Call the function that we want to test
    component.getProductFromServer();
    // Since the HTTP call is asynchronous, we need to wait for it to complete
    fixture.whenStable().then(() => {
      // After the HTTP call is complete, productList should be assigned with the mock data
      expect(component.productList).toEqual(mockProductList);
    });

    // Trigger change detection to update the component
    fixture.detectChanges();
  }));
  
  // Add more test cases for edit and delete methods
});