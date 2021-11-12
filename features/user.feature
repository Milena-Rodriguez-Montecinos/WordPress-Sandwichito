@Users
Feature: Users CRUD

@Users-CRUD @Read
Scenario: A user should be able to retrieve the collection of all users
    Given I have valid credentials
    When I execute a GET request to wp/v2/users endpoint
    Then The status code should be 200 OK

@Users-CRUD @Create
Scenario: A user should be able to create a new user
    Given I have valid credentials 
        And I have the required payload
        | payload | Valid.POST.CreateUser |
    When I execute a POST request to wp/v2/users endpoint 
    Then The user is created
        And The status code should be 201 Created

@Users-CRUD @ReadById
Scenario: A user should be able to retrieve a user info
    Given I have valid credentials
    When I execute a GET request to wp/v2/users/{id} endpoint
    Then The status code should be 200 OK
        
@Users-CRUD @Update
Scenario: A user should be able to update a user
    Given I have valid credentials 
        And I have the required payload
        | payload | Valid.POST.UpdateUser |
    When I execute a POST request to wp/v2/users/{id} endpoint 
    Then The user is updated
        And The status code should be 200 OK

@Users-CRUD @Delete
Scenario: A user should be able to delete a user
    Given I have valid credentials
        And I have the required payload
        | payload | Valid.DELETE.DeleteUser |
    When I execute a DELETE request to wp/v2/users/{id} endpoint
    Then The user is deleted
        And The status code should be 200 OK
