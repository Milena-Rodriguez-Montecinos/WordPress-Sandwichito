@Posts
Feature: Post

@Posts @GET
Scenario: The endpoint should be able to retrieve the collection of all posts
    Given A valid credentials
    When Executes a GET request to wp/v2/posts endpoint
    Then The status code should be 200 OK