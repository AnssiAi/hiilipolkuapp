using hiilipolkuapp.Server.Classes;
using Microsoft.AspNetCore.Mvc;

namespace hiilipolkuapp.Server.Services
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProducts();
        Task<ProductDetailDto> GetProductById(int id);
        Task<ProductDto> AddProduct(NewProductDto product);
        Task DeleteProductById(int id);
        Task<ProductDto> UpdateProduct(ProductDto product);

    }
}
