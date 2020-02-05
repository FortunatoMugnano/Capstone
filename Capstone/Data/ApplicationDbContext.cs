using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Capstone.Models.Data;

namespace Capstone.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Job> Job { get; set; }
        public DbSet<IndustryType> IndustryType { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<JobStatus> JobStatus { get; set; }
        public DbSet<CompanyType> CompanyType { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

           
        
            builder.Entity<CompanyType>()
                .HasOne(bc => bc.Company)
                .WithMany(b => b.CompanyTypes)
                .HasForeignKey(bc => bc.CompanyId);
            builder.Entity<CompanyType>()
                .HasOne(bc => bc.IndustryType)
                .WithMany(c => c.CompanyTypes)
                .HasForeignKey(bc => bc.IndustryTypeId);

            //Create A new User
            ApplicationUser newUser = new ApplicationUser
            {
                FirstName = "admin",
                LastName = "admin",
                UserName = "admin@admin.com",
                NormalizedUserName = "ADMIN@ADMIN.COM",
                Email = "admin@admin.com",
                NormalizedEmail = "ADMIN@ADMIN.COM",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = "7f434309-a4d9-48e9-9ebb-8803db794577",
                Id = "00000000-ffff-ffff-ffff-ffffffffffff"
            };
            var passwordHash = new PasswordHasher<ApplicationUser>();
            newUser.PasswordHash = passwordHash.HashPassword(newUser, "Admin8*");
            builder.Entity<ApplicationUser>().HasData(newUser);

            //Create JobStatus

            JobStatus jobStatus1 = new JobStatus
            {
                Id = 1,
                Status = "DreamJob"
            };
            builder.Entity<JobStatus>().HasData(jobStatus1);

            JobStatus jobStatus2 = new JobStatus
            {
                Id = 2,
                Status = "Applied"
            };
            builder.Entity<JobStatus>().HasData(jobStatus2);

            JobStatus jobStatus3 = new JobStatus
            {
                Id = 3,
                Status = "Interview"
            };
            builder.Entity<JobStatus>().HasData(jobStatus3);

            JobStatus jobStatus4 = new JobStatus
            {
                Id = 4,
                Status = "Rejected"
            };
            builder.Entity<JobStatus>().HasData(jobStatus4);

            JobStatus jobStatus5 = new JobStatus
            {
                Id = 5,
                Status = "Offer"
            };
            builder.Entity<JobStatus>().HasData(jobStatus5);


            //Create Industry Types 
            IndustryType industryType1 = new IndustryType
            {
                Id = 1,
                Industry = "Construction"
            };
            builder.Entity<IndustryType>().HasData(industryType1);

            IndustryType industryType2 = new IndustryType
            {
                Id = 2,
                Industry = "Hospitality"
            };
            builder.Entity<IndustryType>().HasData(industryType2);

            IndustryType industryType3 = new IndustryType
            {
                Id = 3,
                Industry = "Entertainment"
            };
            builder.Entity<IndustryType>().HasData(industryType3);

            IndustryType industryType4 = new IndustryType
            {
                Id = 4,
                Industry = "Manufacturing"
            };
            builder.Entity<IndustryType>().HasData(industryType4);

            IndustryType industryType5 = new IndustryType
            {
                Id = 5,
                Industry = "I.T."
            };
            builder.Entity<IndustryType>().HasData(industryType5);

            IndustryType industryType6 = new IndustryType
            {
                Id = 6,
                Industry = "Electronic"
            };
            builder.Entity<IndustryType>().HasData(industryType6);

            IndustryType industryType7 = new IndustryType
            {
                Id = 7,
                Industry = "Transport"
            };
            builder.Entity<IndustryType>().HasData(industryType7);

            IndustryType industryType8 = new IndustryType
            {
                Id = 8,
                Industry = "Pharmaceutical"
            };
            builder.Entity<IndustryType>().HasData(industryType8);

            IndustryType industryType9 = new IndustryType
            {
                Id = 9,
                Industry = "Energy"
            };
            builder.Entity<IndustryType>().HasData(industryType9);

            IndustryType industryType10 = new IndustryType
            {
                Id = 10,
                Industry = "Telecommunication"
            };
            builder.Entity<IndustryType>().HasData(industryType10);

            IndustryType industryType11 = new IndustryType
            {
                Id = 11,
                Industry = "Retail"
            };
            builder.Entity<IndustryType>().HasData(industryType11);

            IndustryType industryType12 = new IndustryType
            {
                Id = 12,
                Industry = "Healt Care"
            };
            builder.Entity<IndustryType>().HasData(industryType12);

          

            //Create Companies
            Company company1 = new Company
            {
                Id = 1,
                ApplicationUserId = newUser.Id,
                Name = "Google",
                Website = "www.google.com",
                Country = "United States",
                Address = "1600 Amphitheatre Parkway",
                City = "Mountain View",
                ZipCode = 94043,
                Founded = new DateTime(1998, 09, 04),
                
            };
            builder.Entity<Company>().HasData(company1);

            Company company2 = new Company
            {
                Id = 2,
                ApplicationUserId = newUser.Id,
                Name = "HCA",
                Website = "www.hcahealtcare.com",
                Country = "United States",
                Address = "One Park Plaza",
                City = "Nashville",
                ZipCode = 37203,
                Founded = new DateTime(1967, 06, 07),
                
            };
            builder.Entity<Company>().HasData(company2);

            Company company3 = new Company
            {
                Id = 3,
                ApplicationUserId = newUser.Id,
                Name = "Amazon",
                Website = "www.amazon.com",
                Country = "United States",
                Address = "410 Terry Ave N",
                City = "Seattle",
                ZipCode = 98109,
                Founded = new DateTime(1995, 07, 05),
                
            };
            builder.Entity<Company>().HasData(company3);

            //Many to many relationship 
            builder.Entity<CompanyType>().HasData(new CompanyType
            {
                Id = 1,
                CompanyId = company1.Id,
                IndustryTypeId = industryType5.Id
            });
            builder.Entity<CompanyType>().HasData(new CompanyType
            {
                Id = 2,
                CompanyId = company2.Id,
                IndustryTypeId = industryType12.Id
            });
            builder.Entity<CompanyType>().HasData(new CompanyType
            {
                Id = 3,
                CompanyId = company2.Id,
                IndustryTypeId = industryType5.Id
            });
            builder.Entity<CompanyType>().HasData(new CompanyType
            {
                Id = 4,
                CompanyId = company3.Id,
                IndustryTypeId = industryType5.Id
            });
            builder.Entity<CompanyType>().HasData(new CompanyType
            {
                Id = 5,
                CompanyId = company3.Id,
                IndustryTypeId = industryType3.Id
            });
            builder.Entity<CompanyType>().HasData(new CompanyType
            {
                Id = 6,
                CompanyId = company3.Id,
                IndustryTypeId = industryType10.Id
            });




            //Create Comments
            Comment comment1 = new Comment
            {
                Id = 1,
                Text = "Some text for comments test",
                ApplicationUserId = newUser.Id,
                CompanyId = company1.Id
            };
            builder.Entity<Comment>().HasData(comment1);

            Comment comment2 = new Comment
            {
                Id = 2,
                Text = "Some text for comments test",
                ApplicationUserId = newUser.Id,
                CompanyId = company2.Id
            };
            builder.Entity<Comment>().HasData(comment2);

            Comment comment3 = new Comment
            {
                Id = 3,
                Text = "Some text for comments test",
                ApplicationUserId = newUser.Id,
                CompanyId = company3.Id
            };
            builder.Entity<Comment>().HasData(comment3);


            //Create DreamJob

            Job job1 = new Job
            {
                Id = 1,
                Title = ".Net Software Dev",
                Description = "Be a good web developer",
                JobPostUrl = "www.google.it/career",
                Date = DateTime.Now,
                CompanyId = company1.Id,
                ApplicationUserId = newUser.Id,
                JobStatusId = jobStatus1.Id
            };
            builder.Entity<Job>().HasData(job1);

            Job job2 = new Job
            {
                Id = 2,
                Title = "Full-Stack software engigneer",
                Description = "Be a good software developer",
                JobPostUrl = "www.HCA.it/career",
                Date = DateTime.Now,
                CompanyId = company2.Id,
                ApplicationUserId = newUser.Id,
                JobStatusId = jobStatus1.Id
            };
            builder.Entity<Job>().HasData(job2);

            Job job3 = new Job
            {
                Id = 3,
                Title = "React Junior Dev",
                Description = "Be a good React developer",
                JobPostUrl = "www.amazon.it/career",
                Date = DateTime.Now,
                CompanyId = company3.Id,
                ApplicationUserId = newUser.Id,
                JobStatusId = jobStatus1.Id
            };
            builder.Entity<Job>().HasData(job3);


        }
    }
}
