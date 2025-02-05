using hiilipolkuapp.Server.Classes;
using Microsoft.AspNetCore.Mvc;

namespace hiilipolkuapp.Server.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<Product> AddProduct(Product product);
        Task DeleteProductById(int id);
        Task<Product> UpdateProduct(Product product);

    }
}
