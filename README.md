hawk-toa

couldn't think of a better name than TypeScript osu! Api (wrapper)


## TO-DO-LIST

### v1

- will do once v2 is at least mostly done

### v2

- [x] POST /oauth/token
- [ ] DELETE /oauth/tokens/current
- [ ] /beatmaps/packs
- [ ] /beatmaps/packs/{pack}
- [ ] /beatmaps/lookup
- [x] /beatmaps/{beatmap}/scores/users/{user}
- [x] /beatmaps/{beatmap}/scores/users/{user}/all
- [x] /beatmaps/{beatmap}/scores
- [ ] DEP /beatmaps/{beatmap}/solo-score
- [ ] /beatmaps
- [ ] /beatmaps/{beatmap}
- [ ] POST /beatmaps/{beatmap}/attributes
- [ ] LIKELY TO CHANGE SOON 2025-06-16 /beatmapsets/discussions/posts 
- [ ] LIKELY TO CHANGE SOON 2025-06-16 /beatmapsets/discussions/votes
- [ ] LIKELY TO CHANGE SOON 2025-06-16 /beatmapsets/discussions
- [ ] /beatmapsets/search
- [ ] /beatmapsets/lookup
- [ ] /beatmapsets/{beatmapset}
- [ ] DNI /beatmapsets/{beatmapset}/download
- [ ] /changelog/{stream}/{build}
- [ ] /changelog
- [ ] /changelog/{changelog}
- [ ] POST /chat/ack
- [ ] POST /chat/new
- [ ] /chat/updates
- [ ] /chat/channels/{channel}/messages
- [ ] POST /chat/channels/{channel}/messages
- [ ] PUT /chat/channels/{channel}/users/{user}
- [ ] DELETE /chat/channels/{channel}/users/{user}
- [ ] PUT /chat/channels/{channel}/mark-as-read/{message}
- [ ] /chat/channels
- [ ] POST /chat/channels
- [ ] /chat/channels/{channel}
- [ ] /comments
- [ ] POST /comments
- [ ] /comments/{comment}
- [ ] PUT/PATCH /comments/{comment}
- [ ] DELETE /comments/{comment}
- [ ] POST /comments/{comment}/vote
- [ ] DELETE /comments/{comment}/vote
- [ ] /events
- [ ] POST /forums/topics/{topic}/reply
- [ ] /forums/topics
- [ ] POST /forums/topics
- [ ] /forums/topics/{topic}
- [ ] PUT/PATCH /forums/topics/{topic}
- [ ] PUT/PATCH /forums/posts/{post}
- [ ] /forums
- [ ] /forums/{forum}
- [ ] /search
- [ ] /matches
- [ ] /matches/{match}
- [ ] /rooms/{room}/playlist/{playlist}/scores/users/{user}
- [ ] /rooms/{room}/playlist/{playlist}/scores
- [ ] /rooms/{room}/playlist/{playlist}/scores/{score}
- [ ] /rooms
- [ ] /news
- [ ] /news/{news}
- [ ] /notifications
- [ ] POST /notifications/mark-read
- [ ] /rankings/kudosu
- [ ] /rankings/{mode}/{type}
- [ ] /spotlights
- [ ] /scores
- [ ] POST /score-pins/{score}/reorder
- [ ] DELETE /score-pins/{score}
- [ ] PUT /score-pins/{score}
- [ ] /me/{mode?}
- [ ] /users/{user}/kudosu
- [x] /users/{user}/scores/{type}
- [ ] /users/{user}/beatmapsets/{type}
- [x] /users/{user}/recent_activity
- [x] /users/{user}/{mode?}
- [ ] /users
- [ ] /wiki/{locale}/{path}

<br> below are undocumented 

- [ ] POST /session/verify
- [ ] POST /session/verify/reissue
- [ ] POST /beatmaps/{beatmap}/solo/scores
- [ ] PUT /beatmaps/{beatmap}/solo/scores/{token}
- [ ] PUT/PATCH /beatmaps/{beatmap}/tags/{tag}
- [ ] DELETE /beatmaps/{beatmap}/tags/{tag}
- [ ] /beatmapsets/events
- [ ] POST /beatmapsets/{beatmapset}/favourites
- [ ] /blocks
- [ ] POST /blocks
- [ ] DELETE /blocks/{block}
- [ ] /chat/presence
- [ ] POST /reports
- [ ] PUT /rooms/{room}/users/{user}
- [ ] DELETE /rooms/{room}/users/{user}
- [ ] /rooms/{room}/leaderboard
- [ ] /rooms/{room}/events
- [ ] POST /rooms/{room}/playlist/{playlist}/scores
- [ ] PUT/PATCH /rooms/{room}/playlist/{playlist}/scores/{score}
- [ ] POST /rooms
- [ ] /rooms/{room}
- [ ] DELETE /rooms/{room}
- [ ] /seasonal-backgrounds
- [ ] /scores/{score}/download
- [x] /scores/{rulesetOrScore}/{score}/download
- [x] /scores/{rulesetOrScore}/{score?}
- [ ] /friends
- [ ] POST /friends
- [ ] DELETE /friends/{friend}
- [ ] /me/download-quota-check
- [ ] /users/lookup
- [ ] /tags