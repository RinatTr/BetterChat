### API endpoints

**Users**
</br>
POST `/api/users/:username`
Creates a new user.
</br>
GET `/api/users`
Gets all users, required for repeated username validation.
</br>
GET `/api/users/:userId`
Gets a user, required for POST message.

**Posts**
</br>
GET `/api/messages/`
Gets all messages. Each message provides data on both message and user info (using JOIN).
</br>
POST `/api/messages/`
Creates a new message.
