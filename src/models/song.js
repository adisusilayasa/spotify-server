const { generateId } = require("../helper");

class Song {
  constructor({ title, artists, album, external_url }) {
    this.id = generateId();
    this.title = title;
    this.artists = artists;
    this.album = album;
    this.external_url = external_url;
    this.played = 0;
  }
}

module.exports = Song;
