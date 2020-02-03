using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
