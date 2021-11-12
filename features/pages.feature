@Pages
Feature: Pages

    @PAGE-CRUD @PAGE-GET
    Scenario: A user should be able to retrieve the collection of all pages
        Given Given valid credentials
        When Executing GET request to wp/v2/pages page endpoint
        Then the status code should be 200 OK

    @PAGE-CRUD @PAGE-SPECIFICGET
    Scenario: A user should be able to retrieve the collection of an specific page
        Given Given valid credentials
        When Executing GET request to wp/v2/pages/{id} page endpoint
        Then the status code should be 200 OK

    @PAGE-CRUD @PAGE-POST
    Scenario: A user should be able to create a new page
        Given Given valid credentials
        And Given the required payload
            | payload | Valid.POST |
        When Executing POST request to wp/v2/pages page endpoint
        Then the status code should be 201 Created

    @PAGE-CRUD @PAGE-PUT
    Scenario: A user should be able to update a page
        Given Given valid credentials
        And Given the required payload
            | payload | Valid.PUT |
        When Executing POST request to wp/v2/pages/{id} page endpoint
        Then The page has been updated
        And the status code should be 200 OK

    @PAGE-CRUD @PAGE-DELETE
    Scenario: A user should be able to delete a page
        Given Given valid credentials
        When Executing DELETE request to wp/v2/pages/{id} page endpoint
        Then The page has been deleted
        And the status code should be 200 OK