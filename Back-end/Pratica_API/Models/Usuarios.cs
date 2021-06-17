using System.ComponentModel.DataAnnotations;
namespace Pratica_API.Models
{
    public class Usuarios
    {
        [Key]
        public string nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}