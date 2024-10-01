
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{    
    public DataContext(DbContextOptions<DataContext> options) : base(options){}
    public DbSet<Match> Matches { get; set; }
    public DbSet<Movement> Movements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movement>().HasData(
            new Movement{ Id=1, Move = "Paper",Kill="Rock" });
        modelBuilder.Entity<Movement>().HasData(
            new Movement{ Id=2, Move = "Rock",Kill="Scissors" });
        modelBuilder.Entity<Movement>().HasData(
            new Movement{ Id=3, Move = "Scissors",Kill="Paper" });
    }
}
