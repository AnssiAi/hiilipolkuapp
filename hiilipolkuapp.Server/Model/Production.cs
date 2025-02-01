using System.ComponentModel.DataAnnotations;

namespace hiilipolkuapp.Server.Classes
{
    public enum ProductionType
    {
        FACTORY, FARM
    }
    public class Production
    {
        [Key]
        public int ProductionId { get; set; }
        public ProductionType? ProductionType { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int CoG {  get; set; }
    }

}
