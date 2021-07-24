using FoccoEmFrente.Kanban.Api.Controllers.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace FoccoEmFrente.Kanban.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ValidateModelState]
    [Authorize]
    public class TesteController : ControllerBase
    {
        private static IDictionary<int, string> DADOS = new Dictionary<int, string>
        {
            [1] = "Meu primeiro item"
        };

        // ~/api/teste
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(DADOS.Values);
        }

        // ~/api/teste/id
        [HttpGet("{id}")]
        public IActionResult Selecionar(int id)
        {
            return Ok(DADOS[id]);
        }

        // ~/api/teste
        [HttpPost]
        public IActionResult Inserir(int id, string descricao)
        {
            DADOS[id] = descricao;
            return Ok();
        }

        [HttpPut]
        public IActionResult Alterar(int id, string descricao)
        {
            DADOS[id] = descricao;
            return Ok();
        }

        [HttpDelete]
        public IActionResult Excluir(int id)
        {
            DADOS.Remove(id);
            return Ok();
        }
    }
}
