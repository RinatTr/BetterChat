## Timeline

### Day 1 - Oct 2
1. Backend architecture design and implementation

### Day 2 - Oct 3
2. Frontend implementation.

### Day 3 - Oct 4
3. Frontend - CSS.

### Day 4 - Oct 5
4. Testing
5. Web Sockets (optional)

### Day 5 - Oct 6: Submit


## Assumptions
1. No need in user Auth, since password is not required.
2. React state will be used to create a session by storing a new username each refresh when component mounts.
3. Thread should display a limited amount of latest posts, depends on the view size.
4. Can scroll up to view earlier posts, infinitely, up to very first post in the chat app.
5. Username can be used as Unique ID for avatar.
6. Usernames have to be unique.
7. Regarding requirement: "When the page is refreshed any currently logged in user should be logged out and they should be prompted to enter a username again.", assuming that all the rest of the users stay logged in. 
8. Regarding requirement: "Every post needs to have date and time...", design spec displays "timeago", but not date, hence only time that has passed since the message was created is displayed (not the date). 

## Challenges 
Error handling at username validation. Max char error can be handled on front end, but UNIQUE username has to go through backend. 
Studying testing to fullfil mandatory requirement.
