Feature: Post Negative test

@Posts-Negative @Posts-Negative-Create
Scenario: The endpoint shouldn't be able to create a new post
    Given A invalid credentials
        | payload | Valid.POST |
    When Executes a POST request to wp/v2/posts endpoint. 
    Then The status response code should be 401 with status text Unauthorized

@Posts-Negative @Posts-Negative-Delete
Scenario: The endpoint shouldn't be able delete a invalid post Id
    Given A Valid credentials.
        | payload | Valid.DELETE |
    When Executes a POST request to wp/v2/posts/{id} endpoint. 
    Then The status response code should be 404 with status text Not Found

@Posts-Negative @Posts-Create-invalid-parameter
Scenario: The endpoint shouldn't be able created a new post with invalid parameters
    Given A Valid credentials.
        | payload | Invalid.POST |
    When Executes a POST request to wp/v2/posts endpoint. 
    Then The status response code should be 400 with status text Bad Request



