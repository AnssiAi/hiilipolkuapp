namespace hiilipolkuapp.Server.Options
{
    public class AppRateLimitOptions
    {
        public const string AppRateLimit = "AppRateLimit";
        public int PermitLimit { get; set; } = 10;
        public int Window { get; set; } = 10;
        public int QueueLimit { get; set; } = 2;
    }
}
