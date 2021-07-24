using FoccoEmFrente.Kanban.Application.Context;
using FoccoEmFrente.Kanban.Application.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoccoEmFrente.Kanban.Application.Repositories
{
    public class BookRepository : IBookRepository
    {
        protected readonly KanbanContext DbContext;
        protected readonly DbSet<Book> DbSet;

        public IUnitOfWork UnitOfWork => DbContext;

        public BookRepository(KanbanContext context)
        {
            DbContext = context;
            DbSet = DbContext.Set<Book>();
        }

        public async Task<IEnumerable<Book>> GetAllAsync(Guid userId)
        {
            return await DbSet
                .Where(books => books.UserId == userId)
                .ToListAsync();
        }

        public async Task<Book> GetByIdAsync(Guid id, Guid userId)
        {
            return await DbSet
                .Where(books => books.UserId == userId && books.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> ExistAsync(Guid id, Guid userId)
        {
            return await DbSet
                .Where(books => books.UserId == userId && books.Id == id)
                .AnyAsync();
        }

        public Book Add(Book book)
        {
            var entry = DbSet.Add(book);
            return entry.Entity;
        }

        public Book Update(Book book)
        {
            var entry = DbSet.Update(book);
            return entry.Entity;
        }

        public Book Remove(Book book)
        {
            var entry = DbSet.Remove(book);
            return entry.Entity;
        }

        public void Dispose()
        {
            DbContext.Dispose();
        }

    }
}
