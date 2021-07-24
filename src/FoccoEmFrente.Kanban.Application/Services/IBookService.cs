using FoccoEmFrente.Kanban.Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Services
{
    public interface IBookService : IDisposable
    {
        Task<IEnumerable<Book>> GetAllAsync(Guid userId);
        Task<Book> GetByIdAsync(Guid id, Guid userId);
        Task<bool> ExistAsync(Guid id, Guid userId);
        Task<Book> AddAsync(Book book);
        Task<Book> UpdateAsync(Book book);
        Task<Book> RemoveAsync(Book book);
        Task<Book> RemoveAsync(Guid id, Guid userId);
    }
}
