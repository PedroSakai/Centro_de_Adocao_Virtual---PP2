using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Pratica_API.Data;
using Pratica_API.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace Pratica_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsuariosController : Controller
    {
        private readonly PraticaContext _context;

        public UsuariosController(PraticaContext context)
        {
            // construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Usuarios>> GetAll() 
        {
            return _context.Usuarios.ToList();
        }
        
        [HttpGet("{UsuarioId}")]
        public ActionResult<List<Usuarios>> Get(int UsuarioId)
        {
            try
            {
                var result = _context.Usuarios.Find(UsuarioId);

                if (result == null)
                {
                    return NotFound();
                }
                
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
      
        [HttpPost]
        public async Task<ActionResult> post(Usuarios model)
        {
            try
            {
                _context.Usuarios.Add(model);

                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/usuarios/{model.Id}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }

            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }
        
        [HttpDelete("{UsuarioId}")]
        public async Task<ActionResult> delete(int UsuarioId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var usuario = await _context.Usuarios.FindAsync(UsuarioId);

                if (usuario == null)
                {
                    //método do EF

                    return NotFound();
                }
                
                _context.Remove(usuario);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falhano acesso ao banco de dados.");
            }

            // retorna BadRequest se não conseguiu deletar
            return BadRequest();
        }
    
        [HttpPut("{UsuarioId}")]
        public async Task<IActionResult> put(int UsuarioId, Usuarios dadosUsuariosAlt)
        {
            try {
                //verifica se existe aluno a ser alterado
                var result = await _context.Usuarios.FindAsync(UsuarioId);

                if (UsuarioId != result.Id)
                {
                    return BadRequest();
                }

                result.Nome = dadosUsuariosAlt.Nome;
                result.Email = dadosUsuariosAlt.Email;
                result.Senha = dadosUsuariosAlt.Senha;
 

                await _context.SaveChangesAsync();
                return Created($"/api/usuarios/{dadosUsuariosAlt.Id}", dadosUsuariosAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    }
}