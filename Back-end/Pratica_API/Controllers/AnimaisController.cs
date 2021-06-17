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

    public class AnimaisController : Controller
    {
        private readonly PraticaContext _context;

        public AnimaisController(PraticaContext context)
        {
            // construtor
            _context = context;
        }
        
        [HttpGet]
        public ActionResult<List<Animais>> GetAll() 
        {
            return _context.Animais.ToList();
        }
        
        [HttpGet("{AnimalId}")]
        public ActionResult<List<Animais>> Get(int AnimalId)
        {
            try
            {
                var result = _context.Animais.Find(AnimalId);

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
        public async Task<ActionResult> post(Animais model)
        {
            try
            {
                _context.Animais.Add(model);

                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/animais/{model.Id}",model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }

            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }
        
        [HttpDelete("{AnimalId}")]
        public async Task<ActionResult> delete(int AnimalId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var animal = await _context.Animais.FindAsync(AnimalId);

                if (animal == null)
                {
                    //método do EF

                    return NotFound();
                }
                
                _context.Remove(animal);
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
    
        [HttpPut("{AnimalId}")]
        public async Task<IActionResult> put(int AnimalId, Animais dadosAnimaisAlt)
        {
            try {
                //verifica se existe aluno a ser alterado
                var result = await _context.Animais.FindAsync(AnimalId);

                if (AnimalId != result.Id)
                {
                    return BadRequest();
                }

                result.Nome = dadosAnimaisAlt.Nome;
                result.Raca = dadosAnimaisAlt.Raca;
                result.Descricao = dadosAnimaisAlt.Descricao;
                result.urlFoto = dadosAnimaisAlt.urlFoto;
                result.nomeDono = dadosAnimaisAlt.nomeDono;
 

                await _context.SaveChangesAsync();
                return Created($"/api/usuarios/{dadosAnimaisAlt.Id}", dadosAnimaisAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
    }
}
