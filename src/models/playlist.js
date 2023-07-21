const { generateId } = require("../helper");

class Playlist {
  constructor({ name, description }) {
    this.id = generateId();
    this.name = name;
    this.description = description;
    this.tracks = [];
    this.created_at = new Date().toISOString();
  }
}

module.exports = Playlist;
