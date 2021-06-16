using Microsoft.EntityFrameworkCore;
using Pratica_API.Models;

namespace Pratica_API.Data
{
    public class PraticaContext : DbContext
    {
        public PraticaContext(DbContextOptions<PraticaContext> options): base (options)
        {
        }
        public DbSet<Animais> Animais {get; set;}
        public DbSet<Usuarios> Usuarios {get; set;}
    }
}