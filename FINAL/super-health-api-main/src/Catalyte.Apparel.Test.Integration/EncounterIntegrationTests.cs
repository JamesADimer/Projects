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
    public class EncounterIntegrationTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public EncounterIntegrationTests(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false
            });
        }

        [Fact]
        public async Task GetEncountersByPatientId_Returns200()
        {
            var response = await _client.GetAsync("/patients/1/encounters");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetEncountersByPatientId_Returns404()
        {
            var response = await _client.GetAsync("/patients/100/encounters");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetEncounterById_GivenValidEncounterId_Returns200()
        {
            var response = await _client.GetAsync("/patients/1/encounters/21");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetEncounterById_GivenInvalidEncounterId_Returns404()
        {
            var response = await _client.GetAsync("/patients/1/encounters/100");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task CreateEncounter_Returns201()
        {

            Encounter testEncounter = EncounterHelper.GenerateValidEncounter();

            string json = JsonConvert.SerializeObject(testEncounter);
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/patients/1/encounters", httpContent);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task CreateInvalidEncounter_Returns400()
        {
            for (int i = 0; i < 16; i++)
            {
                Encounter testEncounter = EncounterHelper.GenerateInvalidEncounters(i);

                string json = JsonConvert.SerializeObject(testEncounter);
                HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PostAsync("/patients/1/encounters", httpContent);
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
        }

        [Fact]
        public async Task CreateInvalidEncounter_Returns404()
        {
            Encounter testEncounter = EncounterHelper.GenerateInvalidEncounters(17);

            string json = JsonConvert.SerializeObject(testEncounter);
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/patients/1/encounters", httpContent);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task CreateInvalidEncounter_Returns409()
        {
            Encounter testEncounter = EncounterHelper.GenerateValidEncounter();

            string json = JsonConvert.SerializeObject(testEncounter);
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/patients/2/encounters", httpContent);
            Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
        }

        [Fact]
        public async Task UpdateEncounter_Returns200()
        {
            Encounter testEncounter = EncounterHelper.GenerateValidEncounter();

            string json = JsonConvert.SerializeObject(testEncounter);
            HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PutAsync("/patients/1/encounters/21", httpContent);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task UpdateEncounter_Returns400()
        {
            for (int i = 0; i < 16; i++)
            {
                Encounter testEncounter = EncounterHelper.GenerateInvalidEncounters(i);

                string json = JsonConvert.SerializeObject(testEncounter);
                HttpContent httpContent = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _client.PutAsync("/patients/1/encounters/21", httpContent);
                Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            }
        }
    }
}



