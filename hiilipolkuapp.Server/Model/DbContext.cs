using hiilipolkuapp.Server.Classes;
using Microsoft.EntityFrameworkCore;

namespace hiilipolkuapp.Server.Model
{
    public class AppDatabaseContext : DbContext
    {

        public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) : base(options)
        {
        }

        public DbSet<Product> ProductTable { get; set; }
        public DbSet<Production> ProductionTable { get; set; }
        public DbSet<ProductRoute> ProductRouteTable { get; set; }

        //Override to use custom table names.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("product_table");
            modelBuilder.Entity<Production>().ToTable("production_table");
            modelBuilder.Entity<ProductRoute>().ToTable("product_route_table");
        }


    }
}
