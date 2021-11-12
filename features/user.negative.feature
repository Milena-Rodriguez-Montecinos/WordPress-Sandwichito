@Users
Feature: Users Negative Testing

@UsersNegative @UsersRead-N
Scenario: A user should not be able to retrieve the collection of all users
    Given I don't have valid credentials
    When I execute a GET request to wp/v2/users endpoint
    Then The error status code should be 401 Unauthorized 

@UsersNegative @UsersCreate-N
Scenario: A user should not be able to create a new user
    Given I don't have valid credentials 
        And I have the required payload
        | payload | Valid.POST.CreateUser |
    When I execute a POST request to wp/v2/users endpoint 
    Then The error status code should be 401 Unauthorized

@UsersNegative @UsersCreate-N
Scenario: A user should not be able to create a new user
    Given I have valid credentials 
        And I have a invalid payload: <payload>
    When I execute a POST request to wp/v2/users endpoint 
    Then The error status code should be 400 Bad Request
        And The payload should be <errorPayload>
    Examples:
    |              payload              | errorPayload |
    | Invalid.POST.Create-Without-Name  | MissingParam |
    | Invalid.POST.Create-Without-Email | MissingParam |
    | Invalid.POST.Create-Without-Pass  | MissingParam |
    | Invalid.POST.Create-Empty-Name    | InvalidParam |
    | Invalid.POST.Create-Empty-Email   | InvalidParam |
    | Invalid.POST.Create-Empty-Pass    | InvalidParam |
    | Invalid.POST.Create-Space-Name    | InvalidParam |
    | Invalid.POST.Create-Space-Email   | InvalidParam |
    | Invalid.POST.Create-Space-Pass    | InvalidParam |

@UsersNegative @UsersReadById-N
Scenario: A user should not be able to retrieve a user
    Given I don't have valid credentials
    When I execute a GET request to wp/v2/users/{id} endpoint
    Then The error status code should be 401 Unauthorized 

@UsersNegative @UsersReadByIdOne
Scenario: A user should not be able to retrieve the admin user
    Given I don't have valid credentials
    When I execute a GET request to wp/v2/users/1 endpoint
    Then The error status code should be 401 Unauthorized 

@UsersNegative @UsersUpdate-N
Scenario: A user should not be able to update a user info
    Given I don't have valid credentials
        And I have the required payload
        | payload | Valid.POST.UpdateUser | 
    When I execute a POST request to wp/v2/users/{id} endpoint
    Then The error status code should be 401 Unauthorized 

@UsersNegative @UsersUpdate-N
Scenario: A user should not be able to update a user
    Given I have valid credentials 
        And I have a invalid payload: <payload>
    When I execute a POST request to wp/v2/users/{id} endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    | Invalid.POST.Update-Invalid-Email |     400    | Bad Request  |
    | Invalid.POST.Update-Empty-Email   |     400    | Bad Request  |
    | Invalid.POST.Update-Space-Email   |     400    | Bad Request  |
    | Invalid.POST.Update-Empty-Password|     400    | Bad Request  |
    | Invalid.POST.Update-Space-Password|     400    | Bad Request  |
    | Invalid.POST.Update-username      |     400    | Bad Request  |
   
@UsersNegative @UsersDelete-N
Scenario: A user should not be able to delete a user
    Given I don't have valid credentials
        And I have the required payload
        | payload | Valid.DELETE.DeleteUser |
    When I execute a DELETE request to wp/v2/users/{id} endpoint
    Then The error status code should be 401 Unauthorized 
   
@UsersNegative @UsersDelete-N
Scenario: A user should not be able to delete a user
    Given I have valid credentials 
        And I have a invalid payload: <payload>
    When I execute a POST request to wp/v2/users/{id} endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |                  payload                 | statusCode |  statusText     |
    | Invalid.DELETE.Delete-Without-Parameters |     200    |       OK        |
    | Invalid.DELETE.Delete-Without-Force      |     200    |       OK        |
    | Invalid.DELETE.Delete-Without-reassing   |     200    |       OK        |
