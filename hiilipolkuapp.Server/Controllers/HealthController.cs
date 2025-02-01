using Microsoft.AspNetCore.Mvc;

namespace hiilipolkuapp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [Route("ping")]
        [HttpGet()]
        public string GetPong()
        {
            return "pong";

        }
    }
}
