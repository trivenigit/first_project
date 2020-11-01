using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using jquerycrud.Models;

namespace jquerycrud.Controllers
{
   
    public class EmployeeController : ApiController
    {
        EmployeeDAL obj = new EmployeeDAL();
        [AcceptVerbs("GET", "POST")]
        public string insert(string Name, string Mobile, string Salary)
        {
            return obj.insert(Name, Mobile, Salary);
        }
        [AcceptVerbs("GET","POST")]
         public string Update(string Name, string Mobile, string Salary, string Id)
        {
            return obj.Update(Name, Mobile, Salary, Id);
        }
         [HttpGet]
         public IEnumerable<Employee> GetAll()
         {
             return obj.GetAll();
         }
         [HttpGet]
         public IEnumerable<Employee> GetById(string Id)
         {
             return obj.GetById(Id);
         }
        [HttpGet]
           public IEnumerable<Employee> Delete(string Id)
         {
             return obj.Delete(Id);
         }
    }
}
