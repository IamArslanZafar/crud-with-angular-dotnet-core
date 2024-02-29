using crud_product_api.Model;
using crud_product_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace crud_product_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct _productRepository;

        public ProductController(IProduct productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct([FromBody] ProductDTO model)
        {
            var product = await _productRepository.AddProductAsync(model);
            return Ok(product);
        }

        [HttpGet]
        public async Task<ActionResult> GetProductList()
        {
            var productList =await _productRepository.GetAllProductsAsync();
            return Ok(productList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProductById([FromRoute] int id)
        {
            var Product = await _productRepository.GetProductByIdAsync(id);
            return Ok(Product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct([FromRoute] int id, [FromBody] ProductDTO model)
        {
            var Product = await _productRepository.UpdateProductAsync(id, model);
            return Ok(Product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct([FromRoute] int id)
        {
            var Product =  await _productRepository.DeleteProductAsync(id);
            return Ok(Product);
        }
    }
}
