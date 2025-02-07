using hiilipolkuapp.Server.Classes;
using hiilipolkuapp.Server.Model;
using hiilipolkuapp.Server.Services;
using Mapster;
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

        public async Task<List<ProductDto>> GetAllProducts()
        {
            using (_databaseContext)
            {
                var dbProducts = await _databaseContext.ProductTable.ToListAsync();
                var dtoProducts = dbProducts.Select(p => p.Adapt<ProductDto>()).ToList();

                return dtoProducts;
            }
        }
        public async Task<ProductDto> GetProductById(int id)
        {
            using (_databaseContext)
            {
                var dbProduct = await _databaseContext.ProductTable.FindAsync(id);

                if (dbProduct is null)
                {
                    throw new Exception("Product not found");
                }
                var dtoProduct = dbProduct.Adapt<ProductDto>();
                return dtoProduct;

            }
        }

        public async Task<ProductDto> AddProduct(NewProductDto dtoProduct)
        {
            var product = dtoProduct.Adapt<Product>();
            using (_databaseContext)
            {
                _databaseContext.ProductTable.Add(product);
                await _databaseContext.SaveChangesAsync();
                var newDtoProduct = product.Adapt<ProductDto>();

                return newDtoProduct;

            }
        }

        public async Task DeleteProductById(int id)
        {
            using (_databaseContext)
            {
                var product = await _databaseContext.ProductTable.FindAsync(id);
                if (product is null)
                {
                    throw new Exception("Product not found");
                }
                _databaseContext.ProductTable.Remove(product);
                await _databaseContext.SaveChangesAsync();

            }
        }


        public async Task<ProductDto> UpdateProduct(ProductDto product)
        {
            using (_databaseContext)
            {
                var dbProduct = await _databaseContext.ProductTable.FindAsync(product.ProductId);
                if (dbProduct is null)
                {
                    throw new Exception("Product not found");
                }
                dbProduct.ProductName = product.ProductName;
                dbProduct.Brand = product.Brand;

                await _databaseContext.SaveChangesAsync();
                var newDtoProduct = dbProduct.Adapt<ProductDto>();

                return newDtoProduct;
            }
        }

    }
}
