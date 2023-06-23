# .Net Sports Apparel API

## Getting Started

### Dependencies

#### .Net Runtime

You must have a .Net runtime installed on your machine.

#### Postgres

This server requires that you have Postgres installed and running on the default Postgres port of 5432. It requires that you have a database created on the server with the name of `postgres`
- Your username should be `postgres`
- Your password should be `root`

### Start the Server

- Click the drop down arrow next to the App Runner button and select `Apparel.Catalyte.API`
- Click Build > Build Solution
- Click the App Runner button

### Connections

By default, this service starts up on port 8085 and accepts cross-origin requests from `*`.

### Postman Collection

*You can access the postman collection for this API [here](https://www.getpostman.com/collections/03a1dd327e4e5fcea728).

*Here, you can view all the tested requests for the API for each endpoint.

### Swagger v1

#### How to run Swagger API

In order to run the Swagger API to test out some endpoints, you have to first start the server following the 
directions [above](#start-the-server) and then, in a web browser, type out `http://localhost:8085/swagger/index.html` 
into the url address bar.

![swagger_final.png](swagger_final.png?raw=true)

Swagger allows you to run endpoints such as (/patients) and (/patients/{patientId}/encounters) on the backend of
this API in order to test various scenarios.

### Testing

#### How to run the tests

- Click the `Test` tab at the top of Microsoft Visual Studio
- Click `Run All Tests`
- A window should pop up with all the testing results

#### Test coverage

Given that you have [Fine Code Coverage](https://marketplace.visualstudio.com/items?itemName=FortuneNgwenya.FineCodeCoverage) installed on your Microsoft Visual Studio client, navigate to:

`View > Other Windows > Fine Code Coverage`

#### Test files

Intergration test files:
- [PatientIntegrationTests.cs](./src/Catalyte.Apparel.Test.Integration/PatientIntegrationTests.cs)
- [EncounterIntegrationTests.cs](./src/Catalyte.Apparel.Test.Integration/EncounterIntegrationTests.cs)

Unit test files:
- [PatientUnitTests.cs](./src/Catalyte.Apparel.Test.Unit/PatientUnitTests.cs)
- [EncounterUnitTests.cs](./src/Catalyte.Apparel.Test.Unit/EncounterUnitTests.cs)

## Other notes
I hope this document will give you some insights as to how and why I choose this application architecture.

I have needed to and chosen to, use a few tools in this application to make it easier to develop and maintain.  Some of the tools are used at runtime and a couple of them are used during development.  The tools used for development are Visual Studio extensions and can be used with any project.
## Visual Studio Extensions

#### Markdown Editor
This extension let's you edit and preview .md files.
https://marketplace.visualstudio.com/items?itemName=MadsKristensen.MarkdownEditor

#### Add New File
By using this extension you can quickly create new files without having to right-click or go through the menu.  You will see that by using proper naming conventions the correct type of file will be created prepopulated with great content.
https://marketplace.visualstudio.com/items?itemName=MadsKristensen.AddNewFile

## NuGet Packages

This is some helpful documentation explaing the NuGet package manager.
https://docs.microsoft.com/en-us/nuget/consume-packages/install-use-packages-powershell

#### Google Authenticator
https://www.nuget.org/packages/GoogleAuthenticator/

#### Entity Framework Core
This is the heart of the Entity Framework tools.
`Install-Package Microsoft.EntityFrameworkCore -Version 5.0.10`
https://www.nuget.org/packages/Microsoft.EntityFrameworkCore/6.0.0-rc.1.21452.10

#### Entity Framework Core Design
Used for creating EF migrations
`Install-Package Microsoft.EntityFrameworkCore.Design -Version 5.0.10`

#### Swashbuckle
Also known as Swagger, this tool creates an interface for the API when you run the application.  You can use markup in the controllers to show documentation on the interface.  It is preinstalled with basic configuration (Startup.cs) when creating a new API with the newest versions of Visual Studio.
https://docs.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-5.0&tabs=visual-studio


 