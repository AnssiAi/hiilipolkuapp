using Microsoft.AspNetCore.Mvc;

namespace hiilipolkuapp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        [HttpGet]
        public string GetProducts()
        {
            return "Tuotteet";

        }
    }
}
