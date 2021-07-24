using FoccoEmFrente.Kanban.Application.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace FoccoEmFrente.Kanban.Application.Entities
{
    public class Book : Entity, IAggregateRoot
    {
        public string Title { get; set; }

        public int Edition { get; set; }

        public string Autor { get; set; }

        public BookStatus Status { get; set; }

        public Guid UserId { get; set; }
    }
}
