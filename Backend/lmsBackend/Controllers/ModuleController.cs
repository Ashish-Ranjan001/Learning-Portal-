//using AutoMapper;
//using lmsBackend.Dtos.ModuleDtos;
//using lmsBackend.Models;
//using lmsBackend.Repository.ModuleRepo;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;

//namespace lmsBackend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ModuleController : ControllerBase
//    {
//        private readonly IModule _repository;
//        private readonly IMapper _mapper;

//        public ModuleController(IModule repository, IMapper mapper)
//        {
//            _repository = repository;
//            _mapper = mapper;
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAll()
//        {
//            var modules = await _repository.GetAllAsync();
//            return Ok(new
//            {
//                data = modules,
//                msg = "all module fetched sucessfully"
//            });
//        }

//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetById(string id)
//        {
//            var module = await _repository.GetByIdAsync(id);
//            if (module == null) return NotFound();
//            return Ok(new
//            {
//                data = module,
//                msg = "module fetched by id is successfull"
//            }
//            );
//        }

//        [HttpPost]
//        public async Task<IActionResult> Add([FromForm] CreateModuleDtos moduleDto)
//        {
//            await _repository.AddAsync(moduleDto);
//            return Ok(new
//            {
//                message = "Module added successfully"
//            });
//        }

//        [HttpPut("{id}")]
//        public async Task<IActionResult> Update(string id, [FromForm] CreateModuleDtos moduleDto)
//        {
//            await _repository.UpdateAsync(id, moduleDto);
//            return Ok(new
//            {
//                msg = "Module updated successfully"
//            }
//            );
//        }   
//}


using AutoMapper;
using lmsBackend.Dtos.ModuleDtos;
using lmsBackend.Models;
using lmsBackend.Repository.ModuleRepo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace lmsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        private readonly IModule _repository;
        private readonly IMapper _mapper;

        public ModuleController(IModule repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var modules = await _repository.GetAllAsync();
            return Ok(new
            {
                data = modules,
                msg = "all module fetched sucessfully"
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var module = await _repository.GetByIdAsync(id);
            if (module == null) return NotFound();
            return Ok(new
            {
                data = module,
                msg = "module fetched by id is successfull"
            });
        }

        [HttpGet("course/{courseId}")]
        public async Task<IActionResult> GetAllByCourseId(string courseId)
        {
            var modules = await _repository.GetAllByCourseIdAsync(courseId);
            return Ok(new
            {
                data = modules,
                msg = "modules fetched by course id successfully"
            });
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] CreateModuleDtos moduleDto)
        {
            await _repository.AddAsync(moduleDto);
            return Ok(new
            {
                message = "Module added successfully"
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromForm] CreateModuleDtos moduleDto)
        {
            await _repository.UpdateAsync(id, moduleDto);
            return Ok(new
            {
                msg = "Module updated successfully"
            });
        }

        [HttpGet("video/{moduleId}")]
        public async Task<IActionResult> GetVideoModuleById(string moduleId)
        {
            var videoModule = await _repository.GetVideoModuleByIdAsync(moduleId);
            if (videoModule == null)
            {
                return NotFound(new
                {
                    msg = "Module not found"
                });
            }

            return Ok(new
            {
                data = videoModule,
                msg = "Video module fetched successfully"
            });
        }
    }
}