using hiilipolkuapp.Server.Classes;
using hiilipolkuapp.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace hiilipolkuapp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly IProductService _productService;

        public AdminController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("product")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            try
            {
                var products = await _productService.GetAllProducts();
                return Ok(products);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
        [HttpGet("product/{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            try
            {
                var product = await _productService.GetProductById(id);
                return Ok(product);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
        [HttpPost("product")]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            try
            {
                var dbProduct = await _productService.AddProduct(product);

                return Ok(dbProduct);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);

            }
        }
        [HttpPut("product")]
        public async Task<ActionResult<Product>> UpdateProduct(Product product)
        {
            try
            {
                var dbProduct = await _productService.UpdateProduct(product);
                if (dbProduct is null)
                {
                    return BadRequest("product not found");
                }


                return Ok(dbProduct);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("product/{id}")]
        public async Task<ActionResult<string>> DeleteProductById(int id)
        {
            try
            {
                await _productService.DeleteProductById(id);

                return Ok("Deleted");

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);

            }
        }

    }
}
