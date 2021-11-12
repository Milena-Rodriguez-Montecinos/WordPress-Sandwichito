@Categories
Feature: Categories

@Categories-Negative @Negative-Category-Retrieve
Scenario: The endpoint should Verify that a non authorized user cannot be able to get the collection of all categories.
    Given I don't have valid credentials
    And I have a invalid payload: <payload>
    When I execute a GET request to wp/v2/categories endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    |   Invalid.GET.RetrieveACategory     |     400    |  Bad Request |
   
@Categories-Negative @Negative-Category-POST
Scenario: The endpoint should Verify that a non authorized user cannot be able to update or create a category.
    Given I don't have valid credentials
    And I have a invalid payload: <payload>
    When I execute a POST request to wp/v2/categories endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    |   Invalid.POST.UpdateCategory       |     400    | Bad Request  |
    |   Invalid.POST.CreateCategory       |     400    | Bad Request  |

@Categories-Negative @Negative-Category-Delete
Scenario: The endpoint should Verify that a non authorized user cannot be able to delete a category.
    Given I don't have valid credentials
    And I have a invalid payload: <payload>
    When I execute a DELETE request to wp/v2/categories/{id} endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    |   Invalid.DELETE.DeleteCategory     |     404    |  Not Found   |

@Categories-Negative @Negative-Category-Retrieve
Scenario: The endpoint should Verify that a non id concret cannot be able to get the collection data of specific category.
    Given I have valid credentials
    And I have a invalid payload: <payload>
    When I execute a GET request to wp/v2/categories/{id} endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    |   Invalid.GET.RetrieveACategory     |     404    |  Not Found   |

@Categories-Negative @Negative-Category-POST
Scenario: The endpoint should Verify that a non name cannot be able to create a category.
    Given I have valid credentials
    And I have a invalid payload: <payload>
    When I execute a POST request to wp/v2/categories/ endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    |   Invalid.POST.CreateCategory       |     400    |  Bad Request |

@Categories-Negative @Negative-Category-POST
Scenario: The endpoint should Verify that a non id cannot be able to update a category.
    Given I have valid credentials
        And I have a invalid payload: <payload>
    When I execute a POST request to wp/v2/categories/{id} endpoint 
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    |   Invalid.POST.UpdateCategory       |     404    |  Not Found   |

@Categories-Negative @Negative-Category-Delete
Scenario: The endpoint should Verify that a non id and force cannot be able to delete a category.
    Given I have valid credentials
    And I have the required payload
            | payload | Valid.DELETE.DeleteCategoryy |
    When I execute a DELETE request to wp/v2/categories/{id}?force=true endpoint
    Then The error status code should be <statusCode> <statusText>
    Examples:
    |              payload              | statusCode |  statusText  |
    | Invalid.DELETE.DeleteCategory     |     404    |  Not Found   |
