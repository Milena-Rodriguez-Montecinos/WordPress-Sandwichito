Feature: Post CRUD

@Posts-Crud @Posts-create
Scenario: CREATE WITH ALL REQUIRED FIELDS IS SUCCEFUL

Given User wants to create a post with the following attributes
    | payload | POST |
When User save the new post a POST request to wp/v2/posts endpoint
Then The save Created with code 201

@Posts-Crud @Posts-read
Scenario: The endpoint should be able to retrieve the collection of all posts
    Given User with valid credentials
    When Executes a GET request to wp/v2/posts endpoint
    Then The post status code should be 200 OK

@Posts-Crud @Posts-readById
Scenario: The endpoint should be able to retrieve the collection of all posts by id post
    Given A Valid credential to retrieve
    When Executes a GET request to wp/v2/posts/{id} endpoint
    Then The post status code should be 200 OK

@Posts-Crud @Posts-update
Scenario: UPDATE WITH ALL REQUIRED FIELDS IS SUCCEFUL

Given User wants to update a post with the required attributes
    | payload | PUT |
When User update the post a POST request to wp/v2/posts/{id} endpoint
Then The post will be update OK with code 200

@Posts-Crud @Posts-delete
Scenario: DELETE WITH ALL REQUIRED FIELDS IS SUCCEFUL

Given User wants to delete a post with an identifier
    | payload | DELETE |
When User delete the post a DELETE request to wp/v2/posts/{id} endpoint
Then The post will be delete OK with code 200
