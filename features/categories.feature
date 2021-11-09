@Categories
Feature: Categories

@CRUD @GET
Scenario: The endpoint should be able to retrieve the collection of all categories
    Given A valid credentials
    When Executes a GET request to wp/v2/categories endpoint
    Then The status code should be 200 OK
    