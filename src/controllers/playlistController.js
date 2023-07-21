const PlaylistService = require("../services/playlistService");
const { ErrorResponse } = require("../helper/error");

class PlaylistController {
  constructor() {
    this.playlistService = new PlaylistService();
  }

  getAllPlaylists = async (_, res, next) => {
    try {
      const allPlaylists = await this.playlistService.getAllPlaylists();
      res.status(200).json(allPlaylists);
    } catch (err) {
      next(err);
    }
  };

  getPlaylistById = async (req, res, next) => {
    try {
      const { playlistId } = req.params;
      const { sort_by } = req.query;
      const isSortByPlayed = sort_by === "played";
      const playlist = await this.playlistService.getPlaylistById(
        playlistId,
        isSortByPlayed
      );
      res.status(200).json(playlist);
    } catch (err) {
      next(err);
    }
  };

  createPlaylist = async (req, res, next) => {
    try {
      const { name, description } = req.body;

      // Check if req.body is defined
      if (!req.body || !name || !description) {
        throw new ErrorResponse("Missing data", 400);
      }

      const playlistData = { name, description };
      const message = await this.playlistService.createPlaylist(playlistData);
      res.status(201).json({ message });
    } catch (err) {
      next(err);
    }
  };

  updatePlaylist = async (req, res, next) => {
    try {
      const { playlistId } = req.params;
      const { name, description } = req.body;
      if (!name || !description) {
        throw new ErrorResponse("Missing data", 400);
      }
      const playlistData = { name, description };
      const message = await this.playlistService.updatePlaylist(
        playlistId,
        playlistData
      );
      res.status(200).json({ message });
    } catch (err) {
      next(err);
    }
  };

  deletePlaylist = async (req, res, next) => {
    try {
      const { playlistId } = req.params;
      const message = await this.playlistService.deletePlaylist(playlistId);
      res.status(200).json({ message });
    } catch (err) {
      next(err);
    }
  };

  getSongById = async (req, res, next) => {
    try {
      const { playlistId, songId } = req.params;
      const song = await this.playlistService.getSongById(playlistId, songId);
      res.status(200).json(song);
    } catch (err) {
      next(err);
    }
  };

  playTheSong = async (req, res, next) => {
    try {
      const { playlistId, songId } = req.params;
      const message = await this.playlistService.playTheSong(playlistId, songId);
      res.status(200).send(message);
    } catch (err) {
      next(err);
    }
  };

  addSongToPlaylist = async (req, res, next) => {
    try {
      const { playlistId } = req.params;
      const { title, artists, album, external_url } = req.body;
      if (!title || !artists || !album || !external_url) {
        throw new ErrorResponse("Missing data", 400);
      }
      const songData = { title, artists, album, external_url };
      const message = await this.playlistService.addSongToPlaylist(
        playlistId,
        songData
      );
      res.status(201).json({ message });
    } catch (err) {
      next(err);
    }
  };

  deleteSongInPlaylist = async (req, res, next) => {
    try {
      const { playlistId, songId } = req.params;
      const message = await this.playlistService.deleteSongInPlaylist(
        playlistId,
        songId
      );
      res.status(200).json({ message });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PlaylistController;
