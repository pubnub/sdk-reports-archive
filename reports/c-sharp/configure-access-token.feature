
@featureSet=access @beta @skip
Feature: Configure SDK to authorize all requests using a specific access token
  After an SDK instance is created, an access token can be provided which will be used
  for all future operations requiring an authorization check.

  Background: I have enabled access manager
    Given I have a keyset with access manager enabled

  Scenario: An access token passed in the authKey configuration parameter will be used to authorize requests
    Given The SDK is configured with an AuthKey representing an access Token
    When I publish a messages
    Then The request uses the specified access token for authorization
