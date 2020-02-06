using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Job
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public int? Salary { get; set; }

        [Required]
        public string JobPostUrl { get; set; }

        [Required]
        public DateTime Date { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser User { get; set; }
        public int JobStatusId { get; set; }
        public JobStatus JobStatus { get; set; }
    }
}
