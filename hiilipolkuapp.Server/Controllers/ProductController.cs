using hiilipolkuapp.Server.Classes;
using hiilipolkuapp.Server.Model;
using hiilipolkuapp.Server.Queries;
using hiilipolkuapp.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hiilipolkuapp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetProducts()
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
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
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
    }
}
