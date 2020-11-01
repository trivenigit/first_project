using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace jquerycrud.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult EmployeeList()
        {
            return View();
        }
        public ActionResult Employee()
        {
            return View();
        }
        public ActionResult TransactionDeatils()
        {
            return View();
        }
    }
}
