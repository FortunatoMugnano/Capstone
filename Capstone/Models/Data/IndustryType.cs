﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class IndustryType
    {
        public int Id { get; set; }

        [Required]
        public string Industry { get; set; }

        public List<CompanyType> CompanyTypes { get; set; }
    }
}
