using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(); 
        services.AddDbContext<DataContext>(options =>
                        options.UseSqlServer(config.GetConnectionString("ConnectionString")));                   
        services.AddCors();

        return services;
    }
}