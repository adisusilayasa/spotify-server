const PlaylistRepository = require("../repositories/playlistRepository");
const ErrorResponse = require("../helper/error");

class PlaylistService {
  constructor() {
    this.playlistRepository = new PlaylistRepository();
  }

  async getAllPlaylists() {
    return this.playlistRepository.getAllPlaylists();
  }

  async getPlaylistById(playlistId, isSortTracks = false) {
    let playlist = await this.playlistRepository.getPlaylistById(playlistId);
    if (!playlist) {
      throw new ErrorResponse("Playlist with that ID was not found.", 404);
    }
    if (isSortTracks) {
      playlist.tracks.sort((a, b) => b.played - a.played);
    }
    return playlist;
  }

  async createPlaylist(playlistData) {
    return this.playlistRepository.createPlaylist(playlistData);
  }

  async updatePlaylist(playlistId, newPlaylistData) {
    const playlist = await this.getPlaylistById(playlistId);
    const allPlaylists = await this.getAllPlaylists();
    const playlistIndex = allPlaylists.findIndex((p) => p.id == playlistId);
    const updatedPlaylist = { ...playlist, ...newPlaylistData };
    return this.playlistRepository.updatePlaylist(playlistIndex, updatedPlaylist);
  }

  async deletePlaylist(playlistId) {
    const allPlaylists = await this.getAllPlaylists();
    const playlistIndex = allPlaylists.findIndex((p) => p.id == playlistId);
    return this.playlistRepository.deletePlaylist(playlistIndex);
  }

  async getSongById(playlistId, songId) {
    const allPlaylists = await this.getAllPlaylists();
    const playlistIndex = allPlaylists.findIndex((p) => p.id == playlistId);
    const playlistTracks = allPlaylists[playlistIndex].tracks;
    const songIndex = playlistTracks.findIndex((s) => s.id == songId);
    return this.playlistRepository.getSongById(playlistIndex, songIndex);
  }

  async playTheSong(playlistId, songId) {
    const song = await this.getSongById(playlistId, songId);
    song.played++;
    return `Playing the ${song.title}..`;
  }

  async addSongToPlaylist(playlistId, songData) {
    const allPlaylists = await this.getAllPlaylists();
    const playlistIndex = allPlaylists.findIndex((p) => p.id == playlistId);
    return this.playlistRepository.addSongToPlaylist(playlistIndex, songData);
  }

  async deleteSongInPlaylist(playlistId, songId) {
    const allPlaylists = await this.getAllPlaylists();
    const playlistIndex = allPlaylists.findIndex((p) => p.id == playlistId);
    const playlistTracks = allPlaylists[playlistIndex].tracks;
    const songIndex = playlistTracks.findIndex((s) => s.id == songId);
    return this.playlistRepository.deleteSongInPlaylist(playlistIndex, songIndex);
  }
}

module.exports = PlaylistService;
