using hiilipolkuapp.Server.Classes;
using hiilipolkuapp.Server.Model;
using hiilipolkuapp.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace hiilipolkuapp.Server.Queries
{
    public class ProductService : IProductService
    {
        private readonly AppDatabaseContext _databaseContext;

        public ProductService(AppDatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            using (_databaseContext)
            {
                return await _databaseContext.ProductTable.ToListAsync();
            }
        }
        public async Task<Product> GetProductById(int id)
        {
            var product = await _databaseContext.ProductTable.FindAsync(id);
            if (product is null)
            {
                throw new Exception("Product not found");
            }
            return product;
        }

        public async Task<Product> AddProduct(Product product)
        {
            _databaseContext.ProductTable.Add(product);
            await _databaseContext.SaveChangesAsync();

            return product;
        }

        public async Task DeleteProductById(int id)
        {
            var product = await _databaseContext.ProductTable.FindAsync(id);
            if (product is null)
            {
                throw new Exception("Product not found");
            }
            _databaseContext.ProductTable.Remove(product);
            await _databaseContext.SaveChangesAsync();
        }


        public async Task<Product> UpdateProduct(Product product)
        {
            var dbProduct = await _databaseContext.ProductTable.FindAsync(product.ProductId);
            if (dbProduct is null)
            {
                throw new Exception("Product not found");
            }
            dbProduct.ProductName = product.ProductName;
            dbProduct.Brand = product.Brand;

            await _databaseContext.SaveChangesAsync();

            return dbProduct;
        }
    }
}
