using Capstone.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.ViewModels
{
    public class CompanyResponseViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public DateTime? Founded { get; set; }

        public string Website { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int ZipCode { get; set; }
        public string Address { get; set; }

        public List<IndustryType> IndustryTypes { get; set; }
    }
}
