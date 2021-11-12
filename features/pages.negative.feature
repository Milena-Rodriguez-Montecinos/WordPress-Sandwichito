@Pages
Feature: Pages Negative Testing

    @NEGATIVE @UNAUTHORIZED-POST
    Scenario: Verify that a non authorized user cannot create a page
        Given Does not using valid credentials
        And Given the required payload
            | payload | Valid.POST |
        When Executing POST request to wp/v2/pages page endpoint
        Then the status code should be 401 Unauthorized

    @NEGATIVE @UNAUTHORIZED-PUT
    Scenario: Verify that a non authorized user cannot update a page
        Given Does not using valid credentials
        And Given the required payload
            | payload | Valid.POST |
        When Executing POST request to wp/v2/pages page endpoint
        Then the status code should be 401 Unauthorized

    @NEGATIVE @UNAUTHORIZED-DELETE
    Scenario: Verify that a non authorized user cannot update a page
        Given Does not using valid credentials
        When Executing DELETE request to wp/v2/pages/{id} page endpoint
        Then The page has been deleted
        And the status code should be 401 Unauthorized

    @NEGATIVE @UNAUTHORIZED-GET
    Scenario: A user should be able to retrieve the collection of all pages
        Given Does not using valid credentials
        When Executing GET request to wp/v2/pages page endpoint
        Then the status code should be 401 Unauthorized

    @NEGATIVE @UNAUTHORIZED-SPECIFICGET
    Scenario: A user should be able to retrieve the collection of an specific page
        Given Does not using valid credentials
        When Executing GET request to wp/v2/pages/{id} page endpoint
        Then the status code should be 401 Unauthorized

    @NEGATIVE @INVALID-TITLEVALUE
    Scenario: Verify that a page title cannot be updated with an integer value
        Given Given valid credentials
        And Given the required payload
            | payload | Invalid.POSTINT |
        When Executing POST request to wp/v2/pages/{id} page endpoint
        Then the status code should be 400 Bad Request

    @NEGATIVE @INVALID-BODYVALUE
    Scenario: Verify that a page cannot be cerated with empty values
        Given Given valid credentials
        And Given the required payload
            | payload | Invalid.EMPTY |
        When Executing POST request to wp/v2/pages page endpoint
        Then the status code should be 400 Bad Request

    @NEGATIVE @INVALID-SPECIFICGET
    Scenario: Verify i cannot get information from a page when I send a password with empty value
        Given Given valid credentials
        And Given the required payload
            | payload | Invalid.BADPASSWORD |
        When Executing GET request to wp/v2/pages/{id} page endpoint
        Then the status code should be 403 Forbidden