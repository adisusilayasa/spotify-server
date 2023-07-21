# Spotify Playlist Server

Simple Spotify Playlist Server is a REST service built with Express.js. It allows users to manage playlists and songs. The application follows clean architecture principles to ensure modularity and maintainability.

## API Endpoints

| Method | Endpoint                                     | Description                                      |
| ------ | -------------------------------------------- | ------------------------------------------------ |
| GET    | /playlists                                   | Get the list of all playlists                    |
| GET    | /playlists/:playlistId                       | Get details of a specific playlist               |
| GET    | /playlists/:playlistId?sort_by=played        | Sort tracks in a specific playlist by play count |
| POST   | /playlists                                   | Create a new playlist                            |
| PUT    | /playlists/:playlistId                       | Update details of a specific playlist            |
| DELETE | /playlists/:playlistId                       | Delete a specific playlist                       |
| GET    | /playlists/:playlistId/tracks/:songId        | Get details of a specific song from a playlist   |
| GET    | /playlists/:playlistId/tracks/:songId/play   | Play a song from a playlist                      |
| POST   | /playlists/:playlistId/tracks                | Add a song to a specific playlist                |
| DELETE | /playlists/:playlistId/tracks/:songId        | Remove a specific song from a playlist           |

### Request Body Format

- Create & update playlist:
  {
    "name": <name>,
    "description": <description>
  }

- Adding a song to the playlist:

  {
    "title": <>title,
    "artists": <artist>,
    "album": <album>,
    "external_url": <spotify link>
  }


## Swagger Documentation

You can explore and test the API endpoints using the Swagger documentation. To access the Swagger UI, please follow these steps:

1. Make sure the Simple Spotify Playlist Server is running.
2. Open your web browser and enter the following URL:

   http://localhost:3000/api-docs

   Note: Replace localhost:3000 with the appropriate server address and port if your server is running on a different host or port.

3. The Swagger UI will open, where you can see a list of available endpoints and methods. You can click on an endpoint to view its details, including parameters and responses. You can also use the Swagger UI to send requests and view responses directly from the browser.

The Swagger documentation provides an intuitive interface for developers to understand and interact with the Simple Spotify Playlist Server API effectively.
