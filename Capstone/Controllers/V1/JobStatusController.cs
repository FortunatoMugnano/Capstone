using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Capstone.Data;
using Capstone.Models.Data;

namespace Capstone.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobStatusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobStatusController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/JobStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobStatus>>> GetJobStatus()
        {
            return await _context.JobStatus.ToListAsync();
        }

        // GET: api/JobStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobStatus>> GetJobStatus(int id)
        {
            var jobStatus = await _context.JobStatus.FindAsync(id);

            if (jobStatus == null)
            {
                return NotFound();
            }

            return jobStatus;
        }

        // PUT: api/JobStatus/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobStatus(int id, JobStatus jobStatus)
        {
            if (id != jobStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobStatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/JobStatus
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<JobStatus>> PostJobStatus(JobStatus jobStatus)
        {
            _context.JobStatus.Add(jobStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobStatus", new { id = jobStatus.Id }, jobStatus);
        }

        // DELETE: api/JobStatus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JobStatus>> DeleteJobStatus(int id)
        {
            var jobStatus = await _context.JobStatus.FindAsync(id);
            if (jobStatus == null)
            {
                return NotFound();
            }

            _context.JobStatus.Remove(jobStatus);
            await _context.SaveChangesAsync();

            return jobStatus;
        }

        private bool JobStatusExists(int id)
        {
            return _context.JobStatus.Any(e => e.Id == id);
        }
    }
}
