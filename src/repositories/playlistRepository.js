const Playlist = require("../models/playlist");
const Song = require("../models/song");

const RESPONSES = {
  PLAYLIST_CREATED_SUCCESS: "Playlist created successfully.",
  PLAYLIST_UPDATED_SUCCESS: "Playlist updated successfully.",
  PLAYLIST_DELETED_SUCCESS: "Playlist deleted successfully.",
  INVALID_PLAYLIST_INDEX: "Invalid playlist index.",
  PLAYLIST_NOT_FOUND: "Playlist not found.",
  INVALID_SONG_INDEX: "Invalid song index.",
  SONG_DELETED_SUCCESS: "Song successfully deleted.",
  SONG_ADDED_SUCCESS: "New song added successfully.",
};

class PlaylistRepository {
  constructor() {
    this.playlists = [];
  }

  async getAllPlaylists() {
    return this.playlists;
  }

  async getPlaylistById(playlistId) {
    return this.playlists.find((playlist) => playlist.id == playlistId);
  }

  async createPlaylist(playlistData) {
    const playlist = new Playlist(playlistData);
    this.playlists.push(playlist);
    return RESPONSES.PLAYLIST_CREATED_SUCCESS;
  }

  async updatePlaylist(playlistIndex, newPlaylistData) {
    if (playlistIndex < 0 || playlistIndex >= this.playlists.length) {
      throw new Error(RESPONSES.INVALID_PLAYLIST_INDEX);
    }
    this.playlists.splice(playlistIndex, 1, newPlaylistData);
    return RESPONSES.PLAYLIST_UPDATED_SUCCESS;
  }

  async deletePlaylist(playlistIndex) {
    if (playlistIndex < 0 || playlistIndex >= this.playlists.length) {
      throw new Error(RESPONSES.INVALID_PLAYLIST_INDEX);
    }
    this.playlists.splice(playlistIndex, 1);
    return RESPONSES.PLAYLIST_DELETED_SUCCESS;
  }

  async getSongById(playlistIndex, songIndex) {
    const playlist = this.playlists[playlistIndex];
    if (!playlist) {
      throw new Error(RESPONSES.PLAYLIST_NOT_FOUND);
    }
    const tracks = playlist.tracks;
    if (songIndex < 0 || songIndex >= tracks.length) {
      throw new Error(RESPONSES.INVALID_SONG_INDEX);
    }
    return tracks[songIndex];
  }

  async addSongToPlaylist(playlistIndex, songData) {
    const playlist = this.playlists[playlistIndex];
    if (!playlist) {
      throw new Error(RESPONSES.PLAYLIST_NOT_FOUND);
    }
    const song = new Song(songData);
    playlist.tracks.push(song);
    return RESPONSES.SONG_ADDED_SUCCESS;
  }

  async deleteSongInPlaylist(playlistIndex, songIndex) {
    const playlist = this.playlists[playlistIndex];
    if (!playlist) {
      throw new Error(RESPONSES.PLAYLIST_NOT_FOUND);
    }
    const tracks = playlist.tracks;
    if (songIndex < 0 || songIndex >= tracks.length) {
      throw new Error(RESPONSES.INVALID_SONG_INDEX);
    }
    tracks.splice(songIndex, 1);
    return RESPONSES.SONG_DELETED_SUCCESS;
  }
}

module.exports = PlaylistRepository;
