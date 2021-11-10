Feature: Crud post

@Posts-Crud @Posts-create
Scenario: CREATE WITH ALL REQUIRED FIELDS IS SUCCEFUL

Given user wants to create a post with the following attributes
    | payload | POST |
When user save the new post a POST request to wp/v2/posts endpoint
Then the save Created with code 201

@Posts-Crud @Posts-read
Scenario: The endpoint should be able to retrieve the collection of all posts
    Given A valid credentials
    When Executes a GET request to wp/v2/posts endpoint
    Then The status code should be 200 OK

@Posts-Crud @Posts-update
Scenario: UPDATE WITH ALL REQUIRED FIELDS IS SUCCEFUL

Given user wants to update a post with the required attributes
    | payload | PUT |
When user update the post a POST request to wp/v2/posts/{id} endpoint
Then the post is update OK with code 200

@Posts-Crud @Posts-delete
Scenario: DELETE WITH ALL REQUIRED FIELDS IS SUCCEFUL

Given user wants to delete a post with the required attributes
    | payload | DELETE |
When user delete the post a DELETE request to wp/v2/posts/{id} endpoint
Then the post is delete OK with code 200
