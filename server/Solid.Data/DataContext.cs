using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<EmployeePosition> EmployeePositions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=sqlProj");
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<EmployeePosition>()
        //        .HasKey(ep => new { ep.EmployeeId, ep.PositionId });

        //    modelBuilder.Entity<EmployeePosition>()
        //        .HasOne(ep => ep.Employee)
        //        .WithMany(e => e.EmployeePositions)
        //        .HasForeignKey(ep => ep.EmployeeId);

        //    modelBuilder.Entity<EmployeePosition>()
        //        .HasOne(ep => ep.Position)
        //        .WithMany(p => p.EmployeePositions)
        //        .HasForeignKey(ep => ep.PositionId);
        //}
    }
}
