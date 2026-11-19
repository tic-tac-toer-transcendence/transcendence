# Privacy Policy

**Effective date:** November 13, 2026

This Privacy Policy explains how the Tic Tac Toer prototype (the
“Service”) handles information when you use this application. The Service is
maintained as a development project and is not intended for production use.

## 1. Information we collect

When you create an account, the Service may collect:

- email address;
- username;
- selected game symbol (`X` or `O`); and
- password material in the form of a one-way bcrypt hash. The plain-text
  password is not intended to be stored.

When you sign in, the Service creates a session record containing a random
session token, the associated user ID, creation time, and expiration time.
The browser receives the token in an HTTP-only `session` cookie. Sessions
expire after seven days unless deleted sooner by logging out.

Depending on which features are enabled, the database may also contain game
results, game statistics, messages, friendship records, and profile
information associated with an account.

The application may also receive ordinary technical information needed to
operate the Service, such as request information and connection metadata
handled by the reverse proxy. The current prototype does not define a
separate analytics or advertising system.

## 2. How we use information

We use information to:

- create and authenticate user accounts;
- maintain logged-in sessions;
- provide online presence and gameplay features;
- store and display game-related information;
- operate, troubleshoot, and protect the Service; and
- respond to questions or reports about the project.

We do not sell personal information or use it for targeted advertising.

## 3. Cookies and similar technology

The Service uses a session cookie to keep you signed in. The cookie is
HTTP-only so client-side scripts cannot read it. You can delete the cookie
through your browser settings or by using the logout function. Deleting or
blocking the cookie may prevent authenticated features from working.

The development configuration is served through HTTPS by Nginx, but
deployment-specific cookie and TLS settings must be reviewed before a
production launch.

## 4. Sharing and service providers

Information is stored in the PostgreSQL database configured by the operator
of the deployment. The Service does not intentionally share account
information with advertisers or data brokers. Information may be disclosed
when required by law, to protect the Service and its users, or to investigate
abuse and security incidents.

If a deployment uses hosting, monitoring, email, or other third-party
providers, the operator should update this policy to identify those
providers and explain the information they process.

## 5. Retention and deletion

Account and game information is retained for as long as the deployment
operator needs it to provide or maintain the Service. Session records are
intended to expire after seven days, although expired records may remain in
the database until cleanup.

Because this is a prototype, it does not currently provide a self-service
account-deletion workflow. To request correction or deletion of information,
contact the project maintainers through the repository or deployment
operator. Requests may require enough information to identify the relevant
account, and the operator may retain information where required for
security, legal, or operational reasons.

## 6. Security

Passwords are hashed with bcrypt before storage, and session tokens are
generated using cryptographically secure randomness. No method of
transmission or storage is completely secure, so do not submit information
that you do not need to use the prototype. Operators should protect
environment files, database credentials, TLS keys, and database backups.

## 7. Children

The Service is not directed at children, and we do not knowingly collect
personal information from children. If you believe a child has provided
personal information, contact the project maintainers so it can be
reviewed and removed where appropriate.

## 8. Changes to this policy

This policy may be updated when the Service or its data practices change.
The effective date at the top indicates when the current version took
effect. Continued use of the Service after an update means the updated
policy applies to future use.

## 9. Contact

For privacy questions or requests, contact the operator or project
maintainers through the repository where this Service is hosted. Before
public launch, replace this section with a dedicated privacy contact,
operator identity, and applicable jurisdiction.
