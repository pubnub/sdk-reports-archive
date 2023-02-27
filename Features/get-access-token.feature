@featureSet=access @beta @skip
Feature: Inspect the access token which the SDK is using to authorize requests
  The access token which the SDK can use to authorize requests can be
  inspected.  This may be useful in debugging or troubleshooting scenarios.

  This operation is known as `getToken`

  Background: I have enabled access manager
    Given I have a keyset with access manager enabled

  Scenario: I can read the current access token
    Given I have associated an access token with the SDK instance
    When I request the current access token via the getToken operation
    Then The token returned matches

  Scenario: No token is associated
    Given I have not associated an access token with the SDK instance
    When I request the current access token via the getToken operation
    Then A non-error response indicating no token is associated will be returned
