using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
namespace jquerycrud.Models
{
    public class TransactionsDAL
    {
        public IEnumerable<Transactions> GetAll()
        {
            //  SqlConnection con = new SqlConnection(@"Data Source=TBGINDP002\SQLEXPRESS;Initial Catalog=sample;Persist Security Info=True;User ID=sa;Password=tbgsql@123");
            List<Transactions> obj = new List<Transactions>();
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Connstr"].ToString());
            try
            {
                SqlCommand cmd = new SqlCommand("select *from tblTransactionDetails", con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    obj.Add(new Transactions
                    {
                        Pk = dr["Pk"].ToString(),
                        CrusherDcNumber = dr["CrusherDcNumber"].ToString(),
                        TareWeight = dr["TareWeight"].ToString(),
                        GrossWeight = dr["GrossWeight"].ToString()

                    });
                }
                return obj;
            }
            catch (Exception ex)
            {
                
            }
            finally
            {
                con.Close();
            }
            return obj;
        }
    }
    public class Transactions
    {
        public string Pk { get; set; }

        public string CrusherDcNumber { get; set; }
        public string TareWeight { get; set; }
        public string GrossWeight { get; set; }
        public string Quantity { get; set; }

    }
}