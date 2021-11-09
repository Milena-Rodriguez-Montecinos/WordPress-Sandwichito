@Users
Feature: Posts

@CRUD @GET
Scenario: A user should be able to retrieve the collection of all pages
    Given I have valid credentials
    When I execute a GET request to wp/v2/pages endpoint
    Then the status code should be 200 OK

@CRUD @SPECIFICGET
Scenario: A user should be able to retrieve the collection of an specific page
    Given I have valid credentials
    When I execute a GET request to wp/v2/pages endpoint
    Then the status code should be 200 OK    

@CRUD @POST
Scenario: A user should be able to create a new pages
    Given I have valid credentials
    When I execute a GET request to wp/v2/pages endpoint
    Then the status code should be 200 OK

@CRUD @PUT
Scenario: A user should be able to update a pages
    Given I have valid credentials
    When I execute a GET request to wp/v2/pages endpoint
    Then the status code should be 200 OK

@CRUD @DELETE
Scenario: A user should be able to delete a page
    Given I have valid credentials
    When I execute a GET request to wp/v2/pages endpoint
    Then the status code should be 200 OK            