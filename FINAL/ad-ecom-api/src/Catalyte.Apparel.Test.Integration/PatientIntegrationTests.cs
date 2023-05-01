using Catalyte.Apparel.Data.Models;
using Catalyte.Apparel.Test.Integration.Utilities;
using Catalyte.Apparel.TestBase.Helpers;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Catalyte.Apparel.Test.Integration
{
    [Collection("Sequential")]
    public class PatientIntegrationTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public PatientIntegrationTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            });
        }

        [Fact]
        public async Task GetPatients_Returns200()
        {
            var response = await _client.GetAsync("/patients");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetPatientById_GivenValidId_Returns200()
        {
            var response = await _client.GetAsync("/patients/1");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetPatientById_GivenInvalidId_Returns404()
        {
            var response = await _client.GetAsync("/patients/600");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task CreatePatient_Returns201()
        {
            Patient testPatient = PatientHelper.GenerateValidPatient();

            string json = JsonConvert.SerializeObject(testPatient);
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/patients", httpContent);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task CreateInvalidPatient_Returns400()
        {
            for (int i = 0; i < 20; i++)
            {
                Patient testPatient = PatientHelper.GenerateInvalidPatients(i);

                string json = JsonConvert.SerializeObject(testPatient);
                HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PostAsync("/patients", httpContent);
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
        }

        [Fact]
        public async Task CreateInvalidPatient_Returns409()
        {
            for (int i = 21; i < 22; i++)
            {
                Patient testPatient = PatientHelper.GenerateInvalidPatients(i);

                string json = JsonConvert.SerializeObject(testPatient);
                HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PostAsync("/patients", httpContent);
                Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
            }
        }

        [Fact]
        public async Task UpdatePatient_Returns400()
        {
            for (int i = 0; i < 20; i++)
            {
                Patient testPatient = PatientHelper.GenerateInvalidPatients(i);

                string json = JsonConvert.SerializeObject(testPatient);
                HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PutAsync("/patients/2", httpContent);
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
        }

        [Fact]
        public async Task DeletePatient_PatientNotFound_Returns404()
        {
            var response = await _client.DeleteAsync("/patients/500");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task DeletePatient_PatientDeleted_Returns204()
        {
            var responseDelete = await _client.DeleteAsync("/patients/11");
            Assert.Equal(HttpStatusCode.NoContent, responseDelete.StatusCode);
        }
    }
}