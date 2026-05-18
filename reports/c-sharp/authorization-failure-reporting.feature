@featureSet=access @beta
Feature: Authorization Failure Reporting
  Operations with restricted access report when authorization is denied in the form
  of a helpful error message.

  # These scenarios use the publish method to test the messages returned upon
  # authorization success or failure presuming the SDK returns the same response
  # for all other operations.

  Background: I have enabled access manager
    Given I have a keyset with access manager enabled - without secret key

  @contract=authSuccess
  Scenario: Publish simple message with valid ttl and auth permissions
    Given a valid token with permissions to publish with channel 'channel-1'
    When I publish a message using that auth token with channel 'channel-1'
    Then the result is successful

  @contract=authFailureExpired
  Scenario: Publish simple message with expired auth token
    Given an expired token with permissions to publish with channel 'channel-1'
    When I attempt to publish a message using that auth token with channel 'channel-1'
    Then an auth error is returned
    * the error status code is 403
    * the auth error message is 'Token is expired.'
    * the error service is 'Access Manager'

  @contract=authFailurePermissions
  Scenario: Publish simple message with invalid auth permissions
    Given a valid token with permissions to publish with channel 'channel-1'
    When I attempt to publish a message using that auth token with channel 'channel-1'
    Then an auth error is returned
    * the error status code is 403
    * the auth error message is 'Forbidden'
    * the error service is 'Access Manager'

  @contract=authFailureRevoked
  Scenario: Publish fails due to revoked token
    Given a valid token with permissions to publish with channel 'channel-1'
    When I attempt to publish a message using that auth token with channel 'channel-1'
    Then an auth error is returned
    * the error status code is 403
    * the auth error message is 'Token is revoked.'
    * the error service is 'Access Manager'
