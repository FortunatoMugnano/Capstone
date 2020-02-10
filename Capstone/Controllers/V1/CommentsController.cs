using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Capstone.Data;
using Capstone.Models.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Capstone.Routes.V1;
using Capstone.Helpers;

namespace Capstone.Controllers.V1
{
    [ApiController]
    [Authorize]
    
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
      

        public CommentsController(ApplicationDbContext context)
        {
            _context = context;
           
        }


        // GET: Comments
        [HttpGet(Api.Comments.GetAll)]
        public async Task<IActionResult> Index()
        {

            var applicationDbContext = _context.Comment.Include(c => c.Company).Include(c => c.User)
                .Select((comment) => new Comment {
                Text = comment.Text, 
                Company =comment.Company,
                CompanyId = comment.CompanyId,
                Id = comment.Id,
                User =comment.User
              
            });
              
            return Ok(applicationDbContext);
        }

        // GET: Comments/Details/5

        [HttpGet(Api.Comments.Get)]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var comment = await _context.Comment
                .Include(c => c.Company)
                .Include(c => c.User)
               .Select((comment) => new Comment
               {
                   Text = comment.Text,
                   Company = comment.Company,
                   CompanyId = comment.CompanyId,
                   Id = comment.Id,
                   User = comment.User

               })
                .FirstOrDefaultAsync(m => m.Id == id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        
       

        // POST: Comments/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost(Api.Comments.Post)]
        
        public async Task<IActionResult> Create([Bind("Id,Text,ApplicationUserId,CompanyId")] Comment comment)
        {
            var userId = HttpContext.GetUserId();
            comment.ApplicationUserId = userId;
            if (ModelState.IsValid)
            {
                _context.Add(comment);
                await _context.SaveChangesAsync();
                
            }
           
            return Ok(comment);
        }

        
        // POST: Comments/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut(Api.Comments.Edit)]
    
        public async Task<IActionResult> Edit(int id, [Bind("Id,Text,ApplicationUserId,CompanyId")] Comment comment)
        {
            if (id != comment.Id)
            {
                return NotFound();
            }

            var userId = HttpContext.GetUserId();
            comment.ApplicationUserId = userId;
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(comment);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CommentExists(comment.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                
            }
           
            return Ok(comment);
        }

        

        // POST: Comments/Delete/5
        [HttpDelete(Api.Comments.Delete)]
       
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var comment = await _context.Comment.FindAsync(id);
            _context.Comment.Remove(comment);
            await _context.SaveChangesAsync();
            return Ok(comment);
        }
        

        private bool CommentExists(int id)
        {
            return _context.Comment.Any(e => e.Id == id);
        }

        
    }
}
