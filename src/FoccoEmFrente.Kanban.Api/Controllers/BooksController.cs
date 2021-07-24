using FoccoEmFrente.Kanban.Api.Controllers.Attributes;
using FoccoEmFrente.Kanban.Application.Entities;
using FoccoEmFrente.Kanban.Application.Repositories;
using FoccoEmFrente.Kanban.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ValidateModelState]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly UserManager<IdentityUser> _userManager;

        public BooksController(IBookService bookService, UserManager<IdentityUser> userManager)
        {
            _bookService = bookService;
            _userManager = userManager;
        }

        protected Guid UserId => Guid.Parse(_userManager.GetUserId(User));

        [HttpGet]
        public async Task<IActionResult> ListarAsync()
        {
            var books = await _bookService.GetAllAsync(UserId);
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> SelecionarAsync(Guid id)
        {
            var books = await _bookService.GetByIdAsync(id, UserId);
            if (books == null)
                return NotFound();

            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> Inserir(Book book)
        {
            book.UserId = UserId;
            var newBook = await _bookService.AddAsync(book);
            return Ok(newBook);
        }

        [HttpPut]
        public async Task<IActionResult> Alterar(Book book)
        {
            var dbBook = await _bookService.UpdateAsync(book);
            return Ok(dbBook);
        }

        [HttpDelete]
        public async Task<IActionResult> Excluir(Book book)
        {
            book.UserId = UserId;
            var oldBook = await _bookService.RemoveAsync(book);
            return Ok(oldBook);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirById(Guid id)
        {
            var oldBook = await _bookService.RemoveAsync(id, UserId);
            return Ok(oldBook);
        }

    }
}
