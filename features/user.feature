@Users
Feature: Users

@CRUD @GET
Scenario: A user should be able to retrieve the collection of all users
    Given I have valid credentials
    When I execute a GET request to wp/v2/users endpoint
    Then the status code should be 200 OK