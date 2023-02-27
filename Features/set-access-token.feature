@featureSet=access @beta @skip
Feature: provide an access token to the the SDK to authorize requests
  An access token can be provided which will be used
  for all future operations requiring an authorization check.

  This operation is known as `setToken`
  # TODO: Describe use case for this.  Is it only for testing purposes?

  Background: I have enabled access manager
    Given I have a keyset with access manager enabled

  Scenario: An access token provided via the setToken operation will be used to authorize future requests
    Given I have provided an access token to the SDK via the setToken operation
    When I publish a messages
    Then The request uses the specified access token for authorization

  Scenario: An Access token provided via the setToken operation overrides access token provided in configuration
    Given The SDK is configured with an AuthKey representing an acess Token
    And I provide an access token to the SDK via the setToken operation
    When I publish a messages
    Then The request uses the specified access token for authorization

  # could be something like setToken(null) or clearToken()
  Scenario: It is possible to stop using an access token without replacing it with another one
    Given I have associated an access token with the SDK instance
    And I indicated to the SDK to not use a token.
    When I publish a messages
    Then The request does not include an access token
