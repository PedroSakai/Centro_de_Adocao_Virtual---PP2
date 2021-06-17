using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pratica_API.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Pratica_API.Services;
using Pratica_API.Data;

namespace Pratica_API.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly PraticaContext _context;

        public HomeController(PraticaContext context)
        {
            // construtor
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] Usuarios usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _context.Usuarios
                .Where(u => u.nome == usuario.nome && u.Senha == usuario.Senha)
                .FirstOrDefault();
            
            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });
            
            var token = TokenService.GenerateToken(user);
            user.Senha = "";
            
            return new
            {
                user = user,
                token = token
            };
        }
    }
}