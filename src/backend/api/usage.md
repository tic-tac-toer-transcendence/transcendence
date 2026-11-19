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
| 201    | `{"id": "<uuid>", "username": "alice", "symbol": "X"}` | success                            |
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
| 200    | `{"id": "<uuid>", "username": "alice", "symbol": "X"}` + `Set-Cookie: session=...` | success |
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

### Server-pushed messages

| type               | extra fields       | sent to     | when                              |
|--------------------|--------------------|-------------|-----------------------------------|
| `game_invite`      | `fromUser: <uuid>`, `username: <inviter name>` | invited | someone invited you |
| `game_start`       | `gameId: <uuid>`   | both        | invite accepted, open game socket |
| `invite_declined`  | -                  | inviter     | other person said no              |
| `invite_cancelled` | -                  | other user  | other person cancelled or left    |
| `invite_expired`   | -                  | both        | no answer in 30s                  |
| `invite_failed`    | -                  | inviter     | server error on accept            |


## Online users

```
GET /users/online

Cookie: session=... - automatically by browswer
```

Returns the list of users currently connected via `/ws/presence`.

### Returns

| Status | Body                                 | When                              |
|--------|--------------------------------------|-----------------------------------|
| 200    | `{"online": [{"id": "<uuid>", "username": "bob", "symbol": "O"}]}` | success (list may be empty) |
| 401    | `{"error": "no_session"}`            | caller not logged in              |
| 500    | `{"error": "server_error"}`          | DB read failed                    |

The list includes the caller. Use `id` from here as `to` when sending an invite.

## Playing a game (overview)

Actions go over REST, news for the other player comes over their presence socket, moves go over the game socket.

```
1. both logged in, both have /ws/presence open
2. Alice:  POST /invites {"to": "<bob id>"}      -> 201, Alice waits (max 30s)
           Bob gets push:   game_invite
3. Bob:    POST /invites/accept                  -> 200 {"gameId"}
           both get push:   game_start + gameId
4. both:   open /ws/game/<gameId>                -> each gets "joined"
5. player whose turn it is sends "move"          -> both get "move" (or sender gets "error")
6. last move                                     -> both get "game_over", server closes the socket
```

Inviter is always `X`, invited is always `O`. Who moves first is random, see `turn` in `joined`. - I can change this later if we have time for it (regarding X and O)

## Invites

Only online users who are not in a game or another invite.

```
POST /invites            Body: {"to": "<uuid>"}
POST /invites/accept     Body: none (invited user only)
POST /invites/decline    Body: none (invited = decline, inviter = cancel)
```

### Returns

| Status | Body                                     | When                             |
|--------|------------------------------------------|----------------------------------|
| 201    | `{"status": "invite_sent"}`              | invite sent                      |
| 200    | `{"gameId": "<uuid>"}`                   | invite accepted                  |
| 200    | `{"status": "ok"}`                       | declined / cancelled             |
| 400    | `{"error": "validation_fail"}`           | missing `to`                     |
| 400    | `{"error": "cannot_invite_self"}`        | invited yourself                 |
| 401    | `{"error": "no_session"}`                | not logged in                    |
| 404    | `{"error": "no_invite"}`                 | no invite to accept/decline      |
| 409    | `{"error": "user_offline"}`              | invited user not online          |
| 409    | `{"error": "user_busy"}`                 | someone already in game/invite   |
| 500    | `{"error": "server_error"}`              | game could not be created        |

`no_invite` also happens in normal use: the invite expired or the other user cancelled a moment before the click, a double click, or the inviter calling accept. Just close the invite popup.

### All outcomes of an invite

| What happens                          | Caller gets              | Other user gets (presence push)      |
|---------------------------------------|--------------------------|--------------------------------------|
| invited accepts                       | 200 `{"gameId"}`         | `game_start` (caller gets it too)    |
| invited declines                      | 200 `{"status": "ok"}`   | inviter: `invite_declined`           |
| inviter cancels (calls decline)       | 200 `{"status": "ok"}`   | invited: `invite_cancelled`          |
| nobody answers for 30s                | -                        | both: `invite_expired`               |
| either one goes offline while waiting | -                        | the other: `invite_cancelled`        |
| accept fails on the server            | 500 `server_error`       | inviter: `invite_failed`             |

After any of these the invite is gone and both users can invite / be invited again.

## Game WebSocket

Open after `game_start` push (game vs a person) or after `POST /games/bot` (game vs computer). Same socket and same messages for both.

```
GET /ws/game/<gameId> (WebSocket upgrade)
```

### Handshake

| Status | When                              |
|--------|-----------------------------------|
| 101    | connected                         |
| 401    | not logged in                     |
| 403    | `not_your_game`                   |
| 404    | `game_not_found`                  |

### Client sends

```json
{"type": "move", "field": 4, "cell": 0}
```

Always send both `field` and `cell` (0-8, row by row, 0 = top-left). Missing = 0.

### Server sends

| Message                                                           | To     | When                           |
|-------------------------------------------------------------------|--------|--------------------------------|
| `{"type": "joined", "you": "X", "turn": "O"}`                     | you    | right after connect            |
| `{"type": "move", "player": "X", "field": 4, "cell": 0}`          | both   | move accepted                  |
| `{"type": "error", "error": "cell is already taken"}`             | sender | move rejected                  |
| `{"type": "game_over", "winner": "X"}`                            | both   | game ended (`null` = draw)     |
| `{"type": "game_over", "winner": "O", "reason": "opponent_left"}` | player who stayed | opponent left       |

### Move errors

`error` goes only to the sender, the move is not played and the turn does not change. Possible texts:

- `not your turn`
- `cell is already taken`
- `you can't play in this field`
- `field and cell must be 0-8`
- `game is already over`

### Where can I play

The server checks this on every move, so the frontend can use the same rules to highlight the allowed field:

- First move of the game: any field.
- After that: the `cell` of the last move decides the next `field`. Last move was `field 4, cell 0` -> next player must play in `field 0`.
- If that field is already won or full: next player can pick any field that is not won or full.
- A won or full field can never be played in again.
- Three won fields in a row (row, column or diagonal) wins the game. All 9 fields decided with no row = draw (`"winner": null`).

Wrong field gives `you can't play in this field`.

### Rules

- The server only sends the last move, never the whole board. Keep the board on the frontend and apply each `move` (including your own) when it arrives.
- Leaving or refreshing the game page = you lose, there is no reconnect. The opponent gets `game_over` with `reason: opponent_left`.
- Sending anything that is not valid JSON closes the socket (same as leaving).
- The server closes the socket after `game_over`. Connecting to the same game again gives 404 `game_not_found`.
- Closing only the presence socket does not end a running game.

## Bot game (vs computer)



```
POST /games/bot

Body: none
```

### Returns

| Status | Body                              | When                                     |
|--------|-----------------------------------|------------------------------------------|
| 201    | `{"gameId": "<uuid>"}`            | game created, open the game socket       |
| 401    | `{"error": "no_session"}`         | not logged in                            |
| 409    | `{"error": "user_busy"}`          | you are already in a game or an invite   |
| 500    | `{"error": "server_error"}`       | game could not be created                |

### How it goes

```
1. POST /games/bot                      -> 201 {"gameId"}
2. open /ws/game/<gameId>               -> "joined"
3. you send "move"                      -> you get your "move" back
                                           then right away the bot's "move"
4. repeat 3 until                       -> "game_over"
```

- You keep your own symbol (the one from register), the bot gets the other one.
- You always move first, so `joined` has the same symbol in `you` and `turn`.
- The bot's move looks exactly like a person's move: `{"type": "move", "player": "O", "field": 0, "cell": 3}`. Nothing special to handle.
- Errors and `game_over` are the same as in a game vs a person.
- Leaving the page just ends the game. Nobody gets `opponent_left` because there is nobody else.
- Bot games are not saved in the database.
- While you are in a bot game you count as busy: nobody can invite you.

### Not finished yet 

Function (AI get move) from game team is not fully complete. Crash, Lock or similar is possible
