using FoccoEmFrente.Kanban.Application.Entities;
using FoccoEmFrente.Kanban.Application.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Services
{
    public class BookService : IBookService
    {

        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<Book>> GetAllAsync(Guid userId)
        {
            return await _bookRepository.GetAllAsync(userId);
        }

        public async Task<Book> GetByIdAsync(Guid id, Guid userId)
        {
            return await _bookRepository.GetByIdAsync(id, userId);
        }

        public async Task<bool> ExistAsync(Guid id, Guid userId)
        {
            return await _bookRepository.ExistAsync(id, userId);
        }

        public async Task<Book> AddAsync(Book book)
        {
            var newBook = _bookRepository.Add(book);
            await _bookRepository.UnitOfWork.CommitAsync();
            return newBook;
        }

        public async Task<Book> UpdateAsync(Book book)
        {
            var bookExists = await ExistAsync(book.Id, book.UserId);
            if (!bookExists)
                throw new Exception("Livro não pôde ser encontrado.");

            var updateBook = _bookRepository.Update(book);
            await _bookRepository.UnitOfWork.CommitAsync();
            return updateBook;
        }

        public async Task<Book> RemoveAsync(Book book)
        {
            var bookExists = await ExistAsync(book.Id, book.UserId);
            if (!bookExists)
                throw new Exception("Livro não pôde ser encontrado.");

            var oldBook = _bookRepository.Remove(book);
            await _bookRepository.UnitOfWork.CommitAsync();
            return oldBook;
        }

        public async Task<Book> RemoveAsync(Guid id, Guid userId)
        {
            var bookToBeRemoved = await GetByIdAsync(id, userId);
            if (bookToBeRemoved == null)
                throw new Exception("Livro não pôde ser encontrado.");

            var oldBook = _bookRepository.Remove(bookToBeRemoved);
            await _bookRepository.UnitOfWork.CommitAsync();
            return oldBook;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
