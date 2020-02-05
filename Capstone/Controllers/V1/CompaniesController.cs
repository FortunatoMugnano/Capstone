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
using Microsoft.AspNetCore.Authorization;
using Capstone.Helpers;
using Capstone.Models.ViewModels;

namespace Capstone.Controllers.V1
{
    [ApiController]
    [Authorize]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        

        public CompaniesController(ApplicationDbContext context)
        {
            _context = context;
          
        }

        // GET: Companies
        [HttpGet(Api.Company.GetAll)]
        public async Task<IActionResult> GetAllCompanies([FromQuery]string q)
        {
            if (!string.IsNullOrWhiteSpace(q))
            {
                var userId = HttpContext.GetUserId();
                var applicationDbContext = _context.Company.Include(c => c.User)
                    .Include(c => c.Comments)
                    .Include(c => c.CompanyTypes)
                            .ThenInclude(bg => bg.IndustryType)
                    .Where(c => c.CompanyType.IndustryType.Industry == "I.T.")
                    .Select((company) => new
                    {

                        company.Id,
                        company.Founded,
                        company.Country,
                        company.Name,
                        company.ZipCode,
                        company.Website,
                        company.Address,
                        company.City,
                        //company.CompanyTypes,
                        //company.Comments

                    });

                var companies = await applicationDbContext.ToListAsync();
                return Ok(companies);


            }

            else
            {
                var userId = HttpContext.GetUserId();
                var applicationDbContext = _context.Company.Include(c => c.User)
                    .Include(c => c.Comments)
                    .Include(c => c.CompanyTypes)
                            .ThenInclude(bg => bg.IndustryType)
                    .Select((company) => new
                    {

                        company.Id,
                        company.Founded,
                        company.Country,
                        company.Name,
                        company.ZipCode,
                        company.Website,
                        company.Address,
                        company.City,
                        company.CompanyTypes,
                        company.Comments

                    });
                return Ok(await applicationDbContext.ToListAsync());
            }
            
            
        }

        // GET: Companies/Details/5
        [HttpGet(Api.Company.Get)]
        public async Task<IActionResult> GetOneCompany(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userId = HttpContext.GetUserId();
            var company = await _context.Company
                .Include(c => c.User)
                .Include(c => c.CompanyTypes)
                        .ThenInclude(bg => bg.IndustryType)
                .Select((company) => new
                {
                    
                    company.Id,
                    company.Founded,
                    company.Country,
                    company.Name,
                    company.ZipCode,
                    company.Website,
                    company.Address,
                    company.City,
                    company.CompanyTypes,
                    company.Comments
                })
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
    
        public async Task<IActionResult> CreateCompany([Bind("Id,Name,Website,Country,City,ZipCode,Address,Founded,ApplicationUserId,IndustryTypeIds")] CompanyViewModel companyViewModel)
        {
            var userId = HttpContext.GetUserId();
            companyViewModel.ApplicationUserId = userId;
            if (ModelState.IsValid)
            {
                var companyDataModel = new Company
                {
                    Name = companyViewModel.Name,
                    Website = companyViewModel.Website,
                    Country = companyViewModel.Country,
                    City = companyViewModel.City,
                    ZipCode = companyViewModel.ZipCode,
                    Address = companyViewModel.Address,
                    Founded = companyViewModel.Founded,
                    ApplicationUserId = userId
                };
                _context.Add(companyDataModel);
                await _context.SaveChangesAsync();

                companyDataModel.CompanyTypes = companyViewModel.IndustryTypeIds.Select(companyTypeId => new CompanyType
                {
                    CompanyId = companyDataModel.Id,
                    IndustryTypeId = companyTypeId
                }).ToList();

                await _context.SaveChangesAsync();
            }
            
            return Ok(companyViewModel);
        }

      

        // POST: Companies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut(Api.Company.Edit)]
        public async Task<IActionResult> EditCompany(int id, [Bind("Id,Name,Website,Country,City,ZipCode,Address,Founded,ApplicationUserId,IndustryTypeIds")] CompanyViewModel companyViewModel)
        {
            if (id != companyViewModel.Id)
            {
                return NotFound();
            }

            var userId = HttpContext.GetUserId();
            companyViewModel.ApplicationUserId = userId;
            if (ModelState.IsValid)
            {
                var companyDataModel = await _context.Company
                    .Include(c => c.CompanyTypes)
                    .FirstOrDefaultAsync(c => c.Id == id);

                companyDataModel.Id = companyViewModel.Id;
                companyDataModel.Name = companyViewModel.Name;
                companyDataModel.Website = companyViewModel.Website;
                companyDataModel.Country = companyViewModel.Country;
                companyDataModel.City = companyViewModel.City;
                companyDataModel.ZipCode = companyViewModel.ZipCode;
                companyDataModel.Address = companyViewModel.Address;
                companyDataModel.Founded = companyViewModel.Founded;
                companyDataModel.ApplicationUserId = userId;
                companyDataModel.CompanyTypes = companyViewModel.IndustryTypeIds.Select(companyTypeId => new CompanyType
                {
                    CompanyId = companyDataModel.Id,
                    IndustryTypeId = companyTypeId
                }).ToList();

                try
                {
                    _context.Update(companyDataModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CompanyExists(companyViewModel.Id))
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
           
            return Ok(companyViewModel);
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
