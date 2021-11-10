@Categories
Feature: Categories

@Categories-CRUD @Category-List
Scenario: The endpoint should be able to get the collection of all categories
    Given I have valid credentials
    When I execute a GET request to wp/v2/categories endpoint
    Then The response status code should be 200 OK

@Categories-CRUD @Category-Create
Scenario: The endpoint should be able to create a new category
    Given I have valid credentials
        And I have the required payload
        | payload | Valid.POST.CreateCategory |
    When I execute a GET request to wp/v2/categories endpoint
    Then The response status code should be 200 OK
    
@Categories-CRUD @Category-Retrieve
Scenario: A category should be able to retrieve by id
    Given I have valid credentials
        And I have the required payload
        | payload | Valid.GET.RetrieveACategory |
    When I execute a GET request to wp/v2/categories/{id} endpoint
    Then The category is retrieve
        And The response status code should be 200 OK

@Categories-CRUD @Category-Update
Scenario: The endpoint should be able to update the category
    Given I have valid credentials
        And I have the required payload
        | payload | Valid.POST.UpdateCategory |
    When I execute a POST request to wp/v2/categories/{id} endpoint
    Then The category is updated
        And The response status code should be 200 OK

@Categories-CRUD @Category-Delete
Scenario: The endpoint should be able TO DELETE the category select by ID
    Given I have valid credentials
        And I have the required payload 
        | payload | Valid.DELETE.DeleteCategory |
    When I execute a DELETE request to wp/v2/categories/{id} endpoint
    Then The category is deleted
        And The response status code should be 200 OK
    