# README

hawk-toa (im unfunny)

couldn't think of a better name than TypeScript osu! Api (wrapper)

## TO-DO-LIST

### basic

-   [x] client oauth functionality (v2 only)
-   [ ] user login functionality
-   [ ] scopes other than public

### v1 routes

-   [x] /get_beatmaps
-   [x] /get_user
-   [x] /get_scores
-   [x] /get_user_best
-   [x] /get_user_recent
-   [x] /get_match
-   [x] /get_replay

### v2 routes

will do all public scope only routes first

-   [x] POST /oauth/token
-   [ ] DELETE /oauth/tokens/current
-   [x] /beatmaps/packs
-   [x] /beatmaps/packs/{pack}
-   [x] /beatmaps/lookup
-   [x] /beatmaps/{beatmap}/scores/users/{user}
-   [x] /beatmaps/{beatmap}/scores/users/{user}/all
-   [x] /beatmaps/{beatmap}/scores
-   [ ] DEP /beatmaps/{beatmap}/solo-score
-   [x] /beatmaps
-   [x] /beatmaps/{beatmap}
-   [x] POST /beatmaps/{beatmap}/attributes
-   [ ] /beatmapsets/discussions/posts
-   [ ] /beatmapsets/discussions/votes
-   [ ] /beatmapsets/discussions
-   [x] /beatmapsets/search
-   [x] /beatmapsets/lookup
-   [x] /beatmapsets/{beatmapset}
-   [ ] /beatmapsets/{beatmapset}/download
-   [x] /changelog/{stream}/{build}
-   [x] /changelog
-   [x] /changelog/{changelog}
-   [ ] POST /chat/ack
-   [ ] POST /chat/new
-   [ ] /chat/updates
-   [ ] /chat/channels/{channel}/messages
-   [ ] POST /chat/channels/{channel}/messages
-   [ ] PUT /chat/channels/{channel}/users/{user}
-   [ ] DELETE /chat/channels/{channel}/users/{user}
-   [ ] PUT /chat/channels/{channel}/mark-as-read/{message}
-   [ ] /chat/channels
-   [ ] POST /chat/channels
-   [ ] /chat/channels/{channel}
-   [x] /comments
-   [ ] POST /comments
-   [x] /comments/{comment}
-   [ ] PUT/PATCH /comments/{comment}
-   [ ] DELETE /comments/{comment}
-   [ ] POST /comments/{comment}/vote
-   [ ] DELETE /comments/{comment}/vote
-   [x] /events
-   [ ] POST /forums/topics/{topic}/reply
-   [x] /forums/topics
-   [ ] POST /forums/topics
-   [x] /forums/topics/{topic}
-   [ ] PUT/PATCH /forums/topics/{topic}
-   [ ] PUT/PATCH /forums/posts/{post}
-   [x] /forums
-   [x] /forums/{forum}
-   [ ] /search
-   [x] /matches
-   [x] /matches/{match}
-   [ ] /rooms/{room}/playlist/{playlist}/scores/users/{user}
-   [x] /rooms/{room}/playlist/{playlist}/scores
-   [ ] /rooms/{room}/playlist/{playlist}/scores/{score}
-   [x] /rooms
-   [x] /news
-   [x] /news/{news}
-   [ ] /notifications
-   [ ] POST /notifications/mark-read
-   [x] /rankings/kudosu
-   [x] /rankings/{mode}/{type}
-   [x] /spotlights
-   [ ] /scores
-   [ ] POST /score-pins/{score}/reorder
-   [ ] DELETE /score-pins/{score}
-   [ ] PUT /score-pins/{score}
-   [ ] /me/{mode?}
-   [x] /users/{user}/kudosu
-   [x] /users/{user}/scores/{type}
-   [x] /users/{user}/beatmapsets/{type}
-   [x] /users/{user}/recent_activity
-   [x] /users/{user}/{mode?}
-   [x] /users
-   [x] /wiki/{locale}/{path}

<br> below are undocumented

-   [ ] POST /session/verify
-   [ ] POST /session/verify/reissue
-   [ ] POST /beatmaps/{beatmap}/solo/scores
-   [ ] PUT /beatmaps/{beatmap}/solo/scores/{token}
-   [ ] PUT/PATCH /beatmaps/{beatmap}/tags/{tag}
-   [ ] DELETE /beatmaps/{beatmap}/tags/{tag}
-   [ ] /beatmapsets/events
-   [ ] POST /beatmapsets/{beatmapset}/favourites
-   [ ] /blocks
-   [ ] POST /blocks
-   [ ] DELETE /blocks/{block}
-   [ ] /chat/presence
-   [ ] POST /reports
-   [ ] PUT /rooms/{room}/users/{user}
-   [ ] DELETE /rooms/{room}/users/{user}
-   [ ] /rooms/{room}/leaderboard
-   [ ] /rooms/{room}/events
-   [ ] POST /rooms/{room}/playlist/{playlist}/scores
-   [ ] PUT/PATCH /rooms/{room}/playlist/{playlist}/scores/{score}
-   [ ] POST /rooms
-   [ ] /rooms/{room}
-   [ ] DELETE /rooms/{room}
-   [ ] /seasonal-backgrounds
-   [ ] /scores/{score}/download
-   [x] /scores/{rulesetOrScore}/{score}/download
-   [x] /scores/{rulesetOrScore}/{score?}
-   [ ] /friends
-   [ ] POST /friends
-   [ ] DELETE /friends/{friend}
-   [ ] /me/download-quota-check
-   [x] /users/lookup
-   [ ] /tags

## Credits

Most information is taken from the [osu! web docs](https://osu.ppy.sh/docs/index.html)

Extra information is grabbed from [osu-api-extended](https://github.com/cyperdark/osu-api-extended)