# API calls, usage and returns

## Register

```
POST /register

Body:
{
  "email":    "alice@example.com",
  "password": "pw1234",
  "username": "alice",
  "symbol":   "X"
}
```

### Validation

email - required, must be valid

password - required, 6 - 72 chars

username - required, 3 - 16 chars

symbol - required, must be either X or O

### Returns

| Status | Body                                               | When                                   |
|--------|----------------------------------------------------|----------------------------------------|
| 201    | `{"id": "<uuid>", "username": "alice"}`            | success                                |
| 400    | `{"error": "validation_fail", "details": { ... }}` | missing/invalid fields                 |
| 409    | `{"error": "email_taken"}`                         | email already registered               |
| 409    | `{"error": "username_taken"}`                      | username already registered            |
| 409    | `{"error": "duplicate"}`                           | some other unique-constraint violation |
| 500    | `{"error": "server_error", "message": "..."}`      | DB or hashing failed                   |

### `details` object (on 400)

Keys are the failed field names. Values are the validation rule that failed. Possible pairs:

email - `required` | `email`

password - `required` | `min` | `max`

username - `required` | `min` | `max`

symbol - `required` | `oneof`

Example: `{"email": "email", "password": "min"}` means email wasn't valid format and password was too short.

## Login

```
POST /login

Body:
{
  "email":    "alice@example.com",
  "password": "pw1234"
}
```

### Validation

email - required, must be valid

password - required

### Returns

| Status | Body                                               | When                                      |
|--------|----------------------------------------------------|-------------------------------------------|
| 200    | `{"id": "<uuid>", "username": "alice"}` + `Set-Cookie: session=...` | success           |
| 400    | `{"error": "validation_fail", "details": { ... }}` | missing/invalid fields                    |
| 401    | `{"error": "invalid_credentials"}`                 | email not found or password mismatch      |
| 500    | `{"error": "session_create_failed", "message": "..."}` | session row could not be created      |

### `details` object (on 400)

Keys are the failed field names. Values are the validation rule that failed. Possible pairs:

email - `required` | `email`

password - `required`

Example: `{"email": "required"}` means email was missing.

## Logout

```
POST /logout

Body: none
Cookie: session=... (sent automatically by browser)
```

### Validation

none (missing cookie is treated as already logged out)

### Returns

| Status | Body                                          | When                   |
|--------|-----------------------------------------------|------------------------|
| 200    | `{"message": "logged_out"}`                   | success                |
| 500    | `{"error": "server_error", "message": "..."}` | DB delete failed       |

## Presence WebSocket

Open **immediately after login**

```
GET /ws/presence (WebSocket upgrade)

Cookie: session= (browswer automatically sends I guess)
```

### Behavior

- Connection will remain until tab is closed or logout or network drop
- When the connection drops for any reason, the user is removed from the online list

### Returns (handshake)

| Status | When                                              |
|--------|---------------------------------------------------|
| 101    | WebSocket upgrade accepted (connection is open)   |
| 401    | `no_session` / `invalid_session` (not logged in)  |

### Server-pushed message examples

```json
{"type": "game_invite", "fromUser": "<uuid>", "gameId": "<uuid>"}
```


## Online users

```
GET /users/online

Cookie: session=... - automatically by browswer
```

Returns the list of users currently connected via `/ws/presence`.

### Returns

| Status | Body                                 | When                              |
|--------|--------------------------------------|-----------------------------------|
| 200    | `{"online": ["<uuid>", "<uuid>"]}`   | success (list may be empty)       |
| 401    | `{"error": "no_session"}`            | caller not logged in              |
```
