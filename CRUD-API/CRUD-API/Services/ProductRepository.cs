using crud_product_api.Data;
using crud_product_api.Model;

namespace crud_product_api.Services
{
    public class ProductRepository : IProduct
    {
        private IProductData _productData;
        public ProductRepository(IProductData ProductData)
        {
            _productData = ProductData;
        }

        #region Add Product
        public async Task<ResponseObject> AddProductAsync(ProductDTO product)
        {
            ResponseObject responseObject = new ResponseObject();
            try
            {
                // Deserialize existing products from the JSON file
                List<ProductDTO> products = await _productData.ReadProductsFromFileAsync();
                product.Id = Helper.GenerateUniqueId();
                // Add the new product
                products.Add(product);
                // Serialize the updated list of products and write it back to the JSON file
                await _productData.WriteProductsToFileAsync(products);
                responseObject.IsValid = true;
                responseObject.Message = "Success";
                responseObject.Data = product;
            }
            catch(Exception ex)
            {
                responseObject.IsValid = false;
                responseObject.Message = "Failure";
                responseObject.Message = String.IsNullOrEmpty(ex.Message) ? (String.IsNullOrEmpty(ex.InnerException.Message) ? "" : ex.InnerException.Message) : ex.Message;
            }
            return responseObject;
        }
        #endregion

        #region Get All lProducts
        public async Task<ResponseObject> GetAllProductsAsync()
        {
            ResponseObject responseObject = new ResponseObject();
            try
            {
                // Deserialize all products from the JSON file
                List<ProductDTO> productList = await _productData.ReadProductsFromFileAsync();
                responseObject.Data = productList;
                responseObject.IsValid = true;
                responseObject.Message = "Success";
            }
            catch (Exception ex)
            {
                responseObject.IsValid = false;
                responseObject.Message = "Failure";
                responseObject.Message = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message;
            }
            return responseObject;
        }
        #endregion

        #region Get Product By Id
        public async Task<ResponseObject> GetProductByIdAsync(int id)
        {
            ResponseObject responseObject = new ResponseObject();
            try
            {
                // Deserialize all products from the JSON file
                List<ProductDTO> products = await _productData.ReadProductsFromFileAsync();

                // Find the product by its ID
                ProductDTO product = products.Find(p => p.Id == id);
                if (product != null)
                {
                    responseObject.Data = product;
                    responseObject.IsValid = true;
                    responseObject.Message = "Success";
                }
                else
                {
                    responseObject.IsValid = false;
                    responseObject.Message = "Failure";
                    responseObject.Message = $"Product with ID {id} not found.";
                }
            }
            catch (Exception ex)
            {
                responseObject.IsValid = false;
                responseObject.Message = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message;
            }
            return responseObject;
        }
        #endregion

        #region Update Product
        public async Task<ResponseObject> UpdateProductAsync(int id, ProductDTO model)
        {
            ResponseObject responseObject = new ResponseObject();
            try
            {
                // Deserialize existing products from the JSON file
                List<ProductDTO> products = await _productData.ReadProductsFromFileAsync();

                // Find and update the product by its ID
                int index = products.FindIndex(p => p.Id == id);
                if (index != -1)
                {
                    products[index] = model;
                    await _productData.WriteProductsToFileAsync(products);
                    responseObject.IsValid = true;
                    responseObject.Message = "Success";
                    responseObject.Data = model;
                }
                else
                {
                    responseObject.IsValid = false;
                    responseObject.Message = "Failure";
                    responseObject.Message = $"Product with ID {id} not found.";
                }
            }
            catch (Exception ex)
            {
                responseObject.IsValid = false;
                responseObject.Message = "Failure";
                responseObject.Message = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message;
            }
            return responseObject;
        }
        #endregion

        #region Delete Product
        public async Task<ResponseObject> DeleteProductAsync(int id)
        {
            ResponseObject responseObject = new ResponseObject();
            try
            {
                // Deserialize existing products from the JSON file
                List<ProductDTO> products = await _productData.ReadProductsFromFileAsync();

                // Find and remove the product by its ID
                int initialCount = products.Count;
                products.RemoveAll(p => p.Id == id);

                if (products.Count < initialCount)
                {
                    await _productData.WriteProductsToFileAsync(products);
                    responseObject.IsValid = true;
                    responseObject.Message = "Success";
                    responseObject.Message = $"Product with ID {id} deleted successfully.";
                }
                else
                {
                    responseObject.IsValid = false;
                    responseObject.Message = "Failure";
                    responseObject.Message = $"Product with ID {id} not found.";
                }
            }
            catch (Exception ex)
            {
                responseObject.IsValid = false;
                responseObject.Message = "Failure";
                responseObject.Message = string.IsNullOrEmpty(ex.Message) ? ex.InnerException.Message : ex.Message;
            }
            return responseObject;
        }
        #endregion
    }
}
