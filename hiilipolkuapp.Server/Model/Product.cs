using System.ComponentModel.DataAnnotations;

namespace hiilipolkuapp.Server.Classes
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Brand { get; set; }
        public Production Production { get; set; }

    }

}
