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
    public class ActivitiesController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IActivityServices _activityServices;

        public ActivitiesController(IActivityServices activityServices, UserManager<IdentityUser> userManager)
        {
            _activityServices = activityServices;
            _userManager = userManager;
        }

        protected Guid UserId => Guid.Parse(_userManager.GetUserId(User));

        [HttpGet]
        public async Task<IActionResult> ListarAsync()
        {
            var atividades = await _activityServices.GetAllAsync(UserId);
            return Ok(atividades);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> SelecionarAsync(Guid id)
        {
            var atividades = await _activityServices.GetByIdAsync(id, UserId);
            if (atividades == null)
                return NotFound();

            return Ok(atividades);
        }

        [HttpPost]
        public async Task<IActionResult> Inserir(Activity activity)
        {
            activity.UserId = UserId;
            var newActivity = await _activityServices.AddAsync(activity);
            return Ok(newActivity);
        }

        [HttpPut]
        public async Task<IActionResult> Alterar(Activity activity)
        {
            activity.UserId = UserId;
            var dbActivity = await _activityServices.UpdateAsync(activity);
            return Ok(dbActivity);
        }

        [HttpDelete]
        public async Task<IActionResult> Excluir(Activity activity)
        {
            activity.UserId = UserId;
            var oldActivity = await _activityServices.RemoveAsync(activity);
            return Ok(oldActivity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirById(Guid id)
        {
            var oldActivity = await _activityServices.RemoveAsync(id, UserId);
            return Ok(oldActivity);
        }

        [HttpPut("{id}/todo")]
        public async Task<IActionResult> AtualizarStatusParaTodo(Guid id)
        {
            var activity = await _activityServices.UpdateToTodoAsync(id, UserId);
            return Ok(activity);
        }

        [HttpPut("{id}/doing")]
        public async Task<IActionResult> AtualizarStatusParaDoing(Guid id)
        {
            var activity = await _activityServices.UpdateToDoingAsync(id, UserId);
            return Ok(activity);
        }

        [HttpPut("{id}/done")]
        public async Task<IActionResult> AtualizarStatusParaDone(Guid id)
        {
            var activity = await _activityServices.UpdateToDoneAsync(id, UserId);
            return Ok(activity);
        }

    }
}
