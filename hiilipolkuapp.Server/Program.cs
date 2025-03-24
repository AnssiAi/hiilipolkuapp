
using hiilipolkuapp.Server.Model;
using hiilipolkuapp.Server.Options;
using hiilipolkuapp.Server.Queries;
using hiilipolkuapp.Server.Services;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.RateLimiting;

namespace hiilipolkuapp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.Configure<AppRateLimitOptions>(builder.Configuration.GetSection(AppRateLimitOptions.AppRateLimit));

            var appOptions = new AppRateLimitOptions();
            builder.Configuration.GetSection(AppRateLimitOptions.AppRateLimit).Bind(appOptions);
            var fixedPolicy = "fixed";

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddRateLimiter(_ =>
            {
                _.AddFixedWindowLimiter(policyName: fixedPolicy, options =>
                {
                    options.PermitLimit = appOptions.PermitLimit;
                    options.Window = TimeSpan.FromMinutes(appOptions.Window);
                    options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                    options.QueueLimit = appOptions.QueueLimit;
                });
            });
            builder.Services.AddDbContext<AppDatabaseContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("DatabaseConnection"));
            });
            builder.Services.AddScoped<IProductService, ProductService>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles(); // call before auth

            app.UseAuthorization();

            app.UseRateLimiter();

            app.MapControllers().RequireRateLimiting("fixed");

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
