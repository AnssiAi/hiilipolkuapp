using System.ComponentModel.DataAnnotations;

namespace hiilipolkuapp.Server.Classes
{
    public enum RouteType
    {
        SHIP, PLANE, TRUCK
    }
    public class ProductRoute
    {
        [Key]
        public int RouteId { get; set; }
        public RouteType? RouteType { get; set; }
        public int CoKm { get; set; }
    }

}
