using crud_product_api.Model;

namespace crud_product_api.Services
{
    public interface IProduct
    {
        Task<ResponseObject> AddProductAsync(ProductDTO product);
        Task<ResponseObject> GetAllProductsAsync();
        Task<ResponseObject> GetProductByIdAsync(int id);
        Task<ResponseObject> UpdateProductAsync(int id, ProductDTO model);
        Task<ResponseObject> DeleteProductAsync(int id);
    }
}
