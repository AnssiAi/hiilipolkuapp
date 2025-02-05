using Microsoft.AspNetCore.Mvc;

namespace hiilipolkuapp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        [HttpGet]
        public string Index()
        {
            return "Admin";
        }

    }
}
