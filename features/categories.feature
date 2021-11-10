@Categories
Feature: Categories

@Categories-CRUD @List
Scenario: The endpoint should be able to get the collection of all categories
    Given A valid credentials
    When Executes a GET request to wp/v2/categories endpoint
    Then The status code should be 200 OK

@Categories-CRUD @Create
Scenario: The endpoint should be able to create a new category
    Given A valid credentials
        And I have the required payload
        | payload | valid.POST.CreateCategory |
    When Executes a GET request to wp/v2/categories endpoint
    Then The status code should be 201 Created
    
@Categories-CRUD @Retrieve
Scenario: The endpoint should be able to retrieve the collection of all categories
    Given A valid credentials
    When Executes a GET request to wp/v2/categories/{id} endpoint
    Then The status code should be 200 OK

@Categories-CRUD @Update
Scenario: The endpoint should be able to retrieve the collection of all categories
    Given A valid credentials
        And I have the required payload
        | payload | valid.POST.UpdateCategory |
    When Executes a GET request to wp/v2/categories/{id} endpoint
    Then The status code should be 200 OK

@Categories-CRUD @Delete
Scenario: The endpoint should be able TO DELETE the categoriY select by ID
    Given A valid credentials
        And I have the required payload 
        | payload | valid.DELETE.DeleteCategory |
    When Executes a DELETE request to wp/v2/categories/{id} endpoint
    Then The status code should be 200 OK
    