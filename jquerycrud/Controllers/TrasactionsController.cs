using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using jquerycrud.Models;
namespace jquerycrud.Controllers
{
    public class TrasactionsController : ApiController
    {
        TransactionsDAL obj = new TransactionsDAL();
        [HttpGet]
        public IEnumerable<Transactions> GetAll()
        {
            return obj.GetAll();
        }

    }
}
