using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class MovesController(DataContext _context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movement>>> GetMovements()
    {
        var  data = await _context.Movements.ToListAsync();
        return Ok(data);
    }
}
