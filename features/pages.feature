@Users
Feature: Posts

@CRUD @GET
Scenario: A user should be able to retrieve the collection of all pages
    Given I have valid credentials
    When I execute a GET request to wp/v2/pages endpoint
    Then the status code should be 200 OK