using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Movement
{
    [Key]
    public int Id { get; set; }
    public string Move { get; set; }
    public string Kill { get; set; }
}
