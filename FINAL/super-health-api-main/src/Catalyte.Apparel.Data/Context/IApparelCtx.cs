﻿using Catalyte.Apparel.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Catalyte.Apparel.Data.Context
{
    /// <summary>
    /// This interface provides an abstraction layer for the apparel database context.
    /// </summary>
    public interface IApparelCtx
    {
        public DbSet<Patient> Patients { get; set; }

        public DbSet<Encounter> Encounters { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
    }

}
