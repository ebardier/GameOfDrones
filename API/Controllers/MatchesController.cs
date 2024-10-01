using System;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class MatchesController(DataContext _context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Match>>> GetMatches()
    {
        var  data = await _context.Matches.ToListAsync();
        return Ok(data);
    }

    [HttpPost]
    public async Task<IActionResult> SetMatch([FromBody]MatchDTO matchDTO)
    {
        if(matchDTO==null)
            return BadRequest();        

        Match match = new Match(){
            Player1=matchDTO.Player1,
            Player2=matchDTO.Player2,
            Winner=matchDTO.Winner,
            TimeStamp=DateTime.Now
        };

        _context.Matches.Add(match);

        await _context.SaveChangesAsync();

        return Ok(match);        
    }

    [HttpGet("history")]
    public async Task<ActionResult<IEnumerable<HistoryDto>>> GetHistory()
    {
        var groups = await _context.Matches.GroupBy(m => m.Winner)
                         .Select(n => new HistoryDto()
                          {
                               Player = n.Key,
                               Won = n.Count()
                          })
                         .OrderBy(n => n.Player).ToListAsync();

        return Ok(groups);
    }
}
