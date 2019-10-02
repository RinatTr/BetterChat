### Database Schema

**Users**
ID: primary serial key
username: varchar unique not null

* username will be used as Unique ID for avatar generator.

**Messages**
ID: primary serial key
user_id: int references Users
body: varchar
timestamp: timestamp
