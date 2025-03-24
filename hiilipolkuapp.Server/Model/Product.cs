using System.ComponentModel.DataAnnotations;

namespace hiilipolkuapp.Server.Classes
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; } = default!;
        public string Brand { get; set; } = default!;

        public Production? Production { get; set; }
    }

}
