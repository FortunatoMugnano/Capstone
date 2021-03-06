﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Website { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int ZipCode { get; set; }
        public string Address { get; set; }
        public DateTime Founded { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser User { get; set; }
        public List<Comment> Comments { get; set; }
        public List<CompanyType> CompanyTypes { get; set; }
      

    }
}
