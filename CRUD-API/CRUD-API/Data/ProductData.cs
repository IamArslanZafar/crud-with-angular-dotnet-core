using crud_product_api.Model;
using System.Text.Json;

namespace crud_product_api.Data
{
    public class ProductData : IProductData
    {
        private string _jsonFilePath;

        public ProductData()
        {
            string fileName = "products.JSON";
            // Get the base directory of the application
            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;

            // Combine the base directory with the file name to create the full path
            _jsonFilePath = Path.Combine(baseDirectory, fileName);

            // Check if the JSON file exists, and create it if it doesn't
            if (!File.Exists(_jsonFilePath))
            {
                // Create a new empty JSON file
                using (FileStream fs = File.Create(_jsonFilePath))
                {
                    // Leave it empty for now
                }
            }
        }

        public async Task<List<ProductDTO>> ReadProductsFromFileAsync()
        {
            try
            {
                // Read JSON data from the file
                using FileStream openStream = File.OpenRead(_jsonFilePath);
                return await JsonSerializer.DeserializeAsync<List<ProductDTO>>(openStream);

            }
            catch (Exception ex)
            {
                return new List<ProductDTO>();
            }
        }

        public async Task WriteProductsToFileAsync(List<ProductDTO> products)
        {
            try
            {
                // Serialize the list of products and write it back to the JSON file
                using FileStream createStream = File.Create(_jsonFilePath);
                await JsonSerializer.SerializeAsync(createStream, products);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
      
    }
}



public interface IProductData
{
    Task<List<ProductDTO>> ReadProductsFromFileAsync();
    Task WriteProductsToFileAsync(List<ProductDTO> products);
}