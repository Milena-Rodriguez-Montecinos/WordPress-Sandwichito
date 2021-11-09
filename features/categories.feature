@Categories
Feature: Categories

@CRUD @LIST
Scenario: The endpoint should be able to GET the collection of all categories
    Given A valid credentials
    When Executes a GET request to wp/v2/categories endpoint
    Then The status code should be 200 OK

@CRUD @CREATE
Scenario: The endpoint should be able to create category
    Given A valid credentials
        | payload | valid.POST.CreateCategory |
    When Executes a GET request to wp/v2/categories endpoint
    Then The status code should be 200 OK
    
@CRUD @RETRIEVE
Scenario: The endpoint should be able to retrieve the collection of all categories
    Given A valid credentials
    When Executes a GET request to wp/v2/categories/{id} endpoint
    Then The status code should be 200 OK

@CRUD @UPDATE
Scenario: The endpoint should be able to retrieve the collection of all categories
    Given A valid credentials
        | payload | valid.POST.UpdateCategory |
    When Executes a GET request to wp/v2/categories/{id} endpoint
    Then The status code should be 200 OK

@CRUD @DELETE
Scenario: The endpoint should be able TO DELETE the categoriY select by ID
    Given A valid credentials
        | payload | valid.DELETE.DeleteCategory |
    When Executes a DELETE request to wp/v2/categories/{id} endpoint
    Then The status code should be 200 OK
    