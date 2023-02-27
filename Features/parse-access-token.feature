@featureSet=access
Feature: Parse Access Token
  Although clients do not need to know the internal details of how an access token
  is constructed, it can be helpful to have the ability to parse this internal
  structure to help with debugging and troubleshooting access issues.

  Background: I have enabled access manager
    Given I have a keyset with access manager enabled

  Scenario: Validate that a token containing authorized uuid can be parsed correctly
    Given I have a known token containing an authorized UUID
    When I parse the token
    Then the parsed token output contains the authorized UUID "test-authorized-uuid"

  Scenario: Validate that a token containing uuid resource permissions can be parsed correctly
    Given I have a known token containing UUID resource permissions
    When I parse the token
    Then the token has 'uuid-1' UUID resource access permissions
    * token resource permission GET
    
  Scenario: Validate that a token containing uuid pattern permissions can be parsed correctly
    Given I have a known token containing UUID pattern Permissions
    When I parse the token
    Then the token has '^uuid-\S*$' UUID pattern access permissions
    * token pattern permission GET
