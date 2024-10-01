using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Match
{
    [Key]
    public int Id { get; set; }
    public DateTime TimeStamp { get; set; }
    public string Player1 { get; set; }
    public string Player2 { get; set; }
    public string Winner { get; set; }
}
