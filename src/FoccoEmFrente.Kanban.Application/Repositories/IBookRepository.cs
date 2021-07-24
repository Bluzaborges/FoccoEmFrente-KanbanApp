using FoccoEmFrente.Kanban.Application.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Repositories
{
    public interface IBookRepository : IRepository<Book>
    {
        Task<IEnumerable<Book>> GetAllAsync(Guid userId);
        Task<Book> GetByIdAsync(Guid id, Guid userId);
        Task<bool> ExistAsync(Guid id, Guid userId);

        Book Add(Book book);
        Book Update(Book book);
        Book Remove(Book book);
    }
}
