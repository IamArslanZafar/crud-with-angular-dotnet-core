using crud_product_api.Controllers;
using crud_product_api.Data;
using crud_product_api.Model;
using crud_product_api.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace crud_product_api.Unit_Test
{
    public class ProductApiTests
    {
        [Fact]
        public async Task GetProductList_ReturnsOk()
        {
            // Arrange
            var expectedProducts = new List<ProductDTO>();
            var productData = new ProductData();
            

            var mockProductData = new Mock<IProductData>(); // Mock for IProductData

            mockProductData.Setup(repo => repo.ReadProductsFromFileAsync())
                           .ReturnsAsync(expectedProducts);
            if(expectedProducts.Count == 0)
            {
                expectedProducts = await productData.ReadProductsFromFileAsync();
            }

            // Pass the mock of IProductData as a constructor argument to ProductRepository
            var mockProductRepository = new Mock<ProductRepository>(productData);

            // Pass the mock of ProductRepository to the controller
            var controller = new ProductController(mockProductRepository.Object);

            // Act
            var result = await controller.GetProductList();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualResponse = Assert.IsType<ResponseObject>(okResult.Value);
            Assert.True(actualResponse.IsValid);
            Assert.Equal("Success", actualResponse.Message == null ? "success" : actualResponse.Message);

            var actualProducts = Assert.IsType<List<ProductDTO>>(actualResponse.Data);
            Assert.Equal(expectedProducts.Count ==0 ? 4 : expectedProducts.Count, actualProducts.Count);

            for (int i = 0; i < expectedProducts.Count; i++)
            {
                Assert.Equal(expectedProducts[i].Name, actualProducts[i].Name);
                Assert.Equal(expectedProducts[i].Description, actualProducts[i].Description);
                Assert.Equal(expectedProducts[i].Category, actualProducts[i].Category);
                Assert.Equal(expectedProducts[i].Manufacturer, actualProducts[i].Manufacturer);
            }
        }
    }
}
