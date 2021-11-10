@Pages
Feature: Pages

    @UNAUTHORIZED-POST
    Scenario: Verify that a non authorized user cannot create a page
        Given I don't have valid credentials
        And I have the required payload
            | payload | Valid.POST |
        When I execute a POST request to wp/v2/pages page endpoint
        Then the status code should be 401 Unauthorized
