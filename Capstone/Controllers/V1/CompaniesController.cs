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
using Capstone.Routes.V1;

namespace Capstone.Controllers.V1
{
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        

        public CompaniesController(ApplicationDbContext context)
        {
            _context = context;
          
        }

        // GET: Companies
        [HttpGet(Api.Company.GetAll)]
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Company.Include(c => c.User);
            return Ok(await applicationDbContext.ToListAsync());
        }

        // GET: Companies/Details/5
        [HttpGet(Api.Company.Get)]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var company = await _context.Company
                .Include(c => c.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

       

        // POST: Companies/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost(Api.Company.Post)]
    
        public async Task<IActionResult> Create([Bind("Id,Name,Website,Country,City,ZipCode,Address,Founded,ApplicationUserId")] Company company)
        {
            if (ModelState.IsValid)
            {
                _context.Add(company);
                await _context.SaveChangesAsync();
                
            }
            
            return Ok(company);
        }

      

        // POST: Companies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut(Api.Company.Edit)]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Website,Country,City,ZipCode,Address,Founded,ApplicationUserId")] Company company)
        {
            if (id != company.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(company);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompanyExists(company.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
           
            return Ok(company);
        }

       

        // POST: Companies/Delete/5
        [HttpDelete(Api.Company.Delete)]
        
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var company = await _context.Company.FindAsync(id);
            _context.Company.Remove(company);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        

        private bool CompanyExists(int id)
        {
            return _context.Company.Any(e => e.Id == id);
        }
        
    }
}
