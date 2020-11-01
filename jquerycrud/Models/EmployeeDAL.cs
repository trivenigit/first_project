using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace jquerycrud.Models
{
    public class EmployeeDAL
    {

        List<Employee> obj = new List<Employee>();
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Connstr"].ToString());
        public string insert(string Name, string Mobile, string Salary)
        {
           // SqlConnection con = new SqlConnection(@"Data Source=TBGINDP002\SQLEXPRESS;Initial Catalog=sample;Persist Security Info=True;User ID=sa;Password=tbgsql@123");
            SqlCommand cmd = new SqlCommand("insert into tblEmployee(Name,Mobile,Salary)values('" + Name + "','" + Mobile + "','" + Salary + "')", con);
            con.Open();
            cmd.ExecuteNonQuery();
            return "success";
        }
        public string Update(string Name, string Mobile, string Salary, string Id)
        {
           // SqlConnection con = new SqlConnection(@"Data Source=TBGINDP002\SQLEXPRESS;Initial Catalog=sample;Persist Security Info=True;User ID=sa;Password=tbgsql@123");
            SqlCommand cmd = new SqlCommand("Update tblEmployee set Name='" + Name + "',Mobile='" + Mobile + "',Salary='" + Salary + "'where Id='" + Id + "'", con);
            con.Open();
            cmd.ExecuteNonQuery();
            return "success";
        }

        public IEnumerable<Employee> GetAll()
        {
          //  SqlConnection con = new SqlConnection(@"Data Source=TBGINDP002\SQLEXPRESS;Initial Catalog=sample;Persist Security Info=True;User ID=sa;Password=tbgsql@123");

            try
            {
                SqlCommand cmd = new SqlCommand("select *from tblEmployee", con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    obj.Add(new Employee
                    {
                        Id = dr["Id"].ToString(),
                        Name = dr["Name"].ToString(),
                        Mobile = dr["Mobile"].ToString(),
                        Salary = dr["Salary"].ToString()

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
        public IEnumerable<Employee> GetById(string Id)
        {
          //  SqlConnection con = new SqlConnection(@"Data Source=TBGINDP002\SQLEXPRESS;Initial Catalog=sample;Persist Security Info=True;User ID=sa;Password=tbgsql@123");

            try
            {
                SqlCommand cmd = new SqlCommand("select * from tblEmployee where Id='" + Id + "'", con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    obj.Add(new Employee
                    {
                        Id = dr["Id"].ToString(),

                        Name = dr["Name"].ToString(),
                        Mobile = dr["Mobile"].ToString(),
                        Salary = dr["Salary"].ToString()

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
        public IEnumerable<Employee> Delete(string Id)
        {
           // SqlConnection con = new SqlConnection(@"Data Source=TBGINDP002\SQLEXPRESS;Initial Catalog=sample;Persist Security Info=True;User ID=sa;Password=tbgsql@123");

            try
            {
                SqlCommand cmd = new SqlCommand("Delete from tblEmployee where Id='" + Id + "'", con);
                con.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    obj.Add(new Employee
                    {
                        Id = dr["Id"].ToString(),

                        Name = dr["Name"].ToString(),
                        Mobile = dr["Mobile"].ToString(),
                        Salary = dr["Salary"].ToString()

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
    public class Employee
    {
        public string Id { get; set; }

        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Salary { get; set; }

    }
}