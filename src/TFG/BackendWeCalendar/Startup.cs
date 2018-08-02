using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessWeCalendar;
using DalWeCalendar;
using FluentScheduler;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;

namespace BackendWeCalendar
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddTransient<ISrvUser, SrvUser>();
            services.AddTransient<IDalUsers, DalUsers>();
            services.AddTransient<ISrvEvents, SrvEvent>();
            services.AddTransient<IDalEventos, DalEventos>();
            services.AddTransient<ISrvNota, SrvNota>();
            services.AddTransient<IDalNota, DalNota>();
            services.AddTransient<ISrvChat, SrvChat>();
            services.AddTransient<IDalChat, DalChat>();

            services.AddTransient<Notificaciones>();
            services.AddMvc();
            services.AddCors();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins(new string[] { "http://wecalendar.azurewebsites.net", "http://localhost:44444"}));
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /*public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }*/

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            JobManager.Initialize(new Notificaciones());

            app.UseMvc();

            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Shows UseCors with named policy.
            app.UseCors("AllowSpecificOrigin");
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }


    }
}
