using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Capstone.Data;
using Capstone.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Capstone.Routes.V1;
using Capstone.Helpers;

namespace Capstone.Controllers.V1
{
    [ApiController]
    [Authorize]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        

        public JobsController(ApplicationDbContext context)
        {
            _context = context;
            
        }

        // GET: Jobs

        [AllowAnonymous]
        [HttpGet(Api.Jobs.GetAll)]
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Job.Include(j => j.Company)
                .Include(j => j.JobStatus)
                .Include(j => j.User);
            return Ok(await applicationDbContext.ToListAsync());
        }

        // GET: Jobs/Details/5
        [AllowAnonymous]
        [HttpGet(Api.Jobs.Get)]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var job = await _context.Job
                .Include(j => j.Company)
                .Include(j => j.JobStatus)
                .Include(j => j.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (job == null)
            {
                return NotFound();
            }

            return Ok(job);
        }


        /*
        [HttpPost(Api.Jobs.Post)]
        public async Task<ActionResult<Job>> PostJob(Job job)
        {
            var userId = HttpContext.GetUserId();
            job.ApplicationUserId = userId;
            _context.Job.Add(job);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Index", new { id = job.Id }, job);
        }
        */
        
        // POST: Jobs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        
        [HttpPost(Api.Jobs.Post)]
        
        public async Task<IActionResult> Create([Bind("Id,Title,Description,Salary,JobPostUrl,Date,CompanyId,ApplicationUserId,JobStatusId")] Job job)
        {
            var userId = HttpContext.GetUserId();
            job.ApplicationUserId = userId;

            if (ModelState.IsValid)
            {
                _context.Add(job);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(job);
        }
        



        
       
        

        
        

        // POST: Jobs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
      
        [HttpPut(Api.Jobs.Edit)]
       public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Salary,JobPostUrl,Date,CompanyId,ApplicationUserId,JobStatusId")] Job job)
       {
           if (id != job.Id)
           {
               return NotFound();
           }

            var userId = HttpContext.GetUserId();
            job.ApplicationUserId = userId;
            if (ModelState.IsValid)
           {

                
                try
               {
                    _context.Update(job);
                   await _context.SaveChangesAsync();
               }
               catch (DbUpdateConcurrencyException)
               {
                   if (!JobExists(job.Id))
                   {
                       return NotFound();
                   }
                   else
                   {
                       throw;
                   }
               }
              
           }
           return Ok(job);
       }
       

        // POST: Jobs/Delete/5
        [AllowAnonymous]
        [HttpDelete(Api.Jobs.Delete)]
       
       public async Task<IActionResult> DeleteConfirmed(int id)
       {
           var job = await _context.Job.FindAsync(id);
           _context.Job.Remove(job);
           await _context.SaveChangesAsync();
           return RedirectToAction(nameof(Index));
       }
       

        private bool JobExists(int id)
        {
            return _context.Job.Any(e => e.Id == id);
        }

       
    }
}
