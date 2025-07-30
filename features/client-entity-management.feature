Feature: Client and Entity Management
  As an operator user
  User wants to manage clients and entities in the asset management system
  So that new clients and entities can be created and verified

  Scenario: Create a new client and entity with unique timestamp names
    Given the user navigates to the application homepage
    When the user logs in with valid operator credentials
    And the user opens the sidebar menu
    And the user navigates to Account Management under Clients tab
    And the user generates a unique client name with timestamp
    Then the user checks if the client name already exists in the client table
    When the client does not exist
    Then the user creates a new client with type "Intermediary"
    And the user verifies the client appears in the client table
    When the user switches to the Entities tab
    And the user creates a new entity with generated client name
    And the user fills all mandatory entity fields
    And the user submits the entity form
    Then the user verifies the entity is successfully saved
    And the user verifies the entity appears in the entity table
    And the user verifies the entity status is "under_review"

  Scenario: Verify existing client handling  
    Given the user navigates to the application homepage
    When the user logs in with valid operator credentials
    And the user opens the sidebar menu
    And the user navigates to Account Management under Clients tab
    And the user generates a unique client name with timestamp
    Then the user checks if the client name already exists in the client table
    When the client does not exist
    Then the user creates a new client with type "Intermediary"
    And the user verifies the client appears in the client table
    When the user generates the same client name again
    And the user checks if the client name already exists in the client table
    Then the client should exist in the table

  Scenario: Handle mandatory field validation for entity creation
    Given the user navigates to the application homepage
    When the user logs in with valid operator credentials
    And the user opens the sidebar menu
    And the user navigates to Account Management
    And the user switches to the Entities tab
    When the user attempts to create a new entity without filling mandatory fields
    Then the user should see validation errors
    And the form should remain on the create entity page
