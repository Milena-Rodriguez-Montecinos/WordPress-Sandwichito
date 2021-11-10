@Pages
Feature: Pages

    @PAGE-CRUD @PAGE-GET
    Scenario: A user should be able to retrieve the collection of all pages
        Given I have valid credentials
        When I execute a GET request to wp/v2/pages pages endpoint
        Then the status code should be 200 OK

    @PAGE-CRUD @PAGE-SPECIFICGET
    Scenario: A user should be able to retrieve the collection of an specific page
        Given I have valid credentials
        When I execute a GET request to wp/v2/pages pages endpoint
        Then the status code should be 200 OK

    @PAGE-CRUD @PAGE-POST
    Scenario: A user should be able to create a new page
        Given I have valid credentials
        And I have the required payload
            | payload | Valid.POST |
        When I execute a POST request to wp/v2/pages pages endpoint
        Then the status code should be 201 Created

    @PAGE-CRUD @PAGE-PUT
    Scenario: A user should be able to update a page
        Given I have valid credentials
        And I have the required payload
            | payload | Valid.PUT |
        When I execute a POST request to wp/v2/pages/{id} pages endpoint
        Then the page is updated
        And the status code should be 200 OK

    @PAGE-CRUD @PAGE-DELETE
    Scenario: A user should be able to delete a page
        Given I have valid credentials
        When I execute a DELETE request to wp/v2/pages/{id} pages endpoint
        Then the page is deleted
        And the status code should be 200 OK