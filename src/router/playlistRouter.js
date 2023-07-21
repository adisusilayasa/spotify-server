const express = require("express");
const PlaylistController = require("../controllers/playlistController");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { ErrorResponse } = require("../helper/error");

const router = express.Router();
const playlistController = new PlaylistController();

// Route-specific middleware for error handling
function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: { status, message } });
}

// Middleware for validating required fields when adding a song to the playlist
function validateAddSongData(req, res, next) {
    const { title, artists, album, external_url } = req.body;
    if (!title || !artists || !album || !external_url) {
        return next(new ErrorResponse("Missing data", 400));
    }
    next();
}
/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: API endpoints for managing playlists and songs.
 */

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Get all playlists.
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: Successful response.
 */
router.get("/playlists", playlistController.getAllPlaylists);

/**
 * @swagger
 * /playlists/{playlistId}:
 *   get:
 *     summary: Get a playlist by ID.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist to retrieve.
 *     responses:
 *       200:
 *         description: Successful response.
 *       404:
 *         description: Playlist not found.
 */
router.get("/playlists/:playlistId", playlistController.getPlaylistById);

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Create a new playlist.
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: My Playlist
 *               description: My awesome playlist
 *     responses:
 *       201:
 *         description: Playlist created successfully.
 *       400:
 *         description: Missing data.
 */
router.post("/playlists", playlistController.createPlaylist);

/**
 * @swagger
 * /playlists/{playlistId}:
 *   put:
 *     summary: Update a playlist by ID.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: My Playlist
 *               description: My updated playlist
 *     responses:
 *       200:
 *         description: Playlist updated successfully.
 *       400:
 *         description: Missing data.
 *       404:
 *         description: Playlist not found.
 */
router.put("/playlists/:playlistId", playlistController.updatePlaylist);

/**
 * @swagger
 * /playlists/{playlistId}:
 *   delete:
 *     summary: Delete a playlist by ID.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist to delete.
 *     responses:
 *       200:
 *         description: Playlist deleted successfully.
 *       404:
 *         description: Playlist not found.
 */
router.delete("/playlists/:playlistId", playlistController.deletePlaylist);

/**
 * @swagger
 * /playlists/{playlistId}/tracks/{songId}:
 *   get:
 *     summary: Get a song from a playlist by song ID.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist.
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the song to retrieve.
 *     responses:
 *       200:
 *         description: Successful response.
 *       404:
 *         description: Playlist or song not found.
 */
router.get("/playlists/:playlistId/tracks/:songId", playlistController.getSongById);

/**
 * @swagger
 * /playlists/{playlistId}/tracks/{songId}/play:
 *   get:
 *     summary: Play a song from a playlist by song ID.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist.
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the song to play.
 *     responses:
 *       200:
 *         description: Successful response.
 *       404:
 *         description: Playlist or song not found.
 */
router.get("/playlists/:playlistId/tracks/:songId/play", playlistController.playTheSong);

/**
 * @swagger
 * /playlists/{playlistId}/tracks:
 *   post:
 *     summary: Add a new song to a playlist by playlist ID.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist to add the song to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artists:
 *                 type: string
 *               album:
 *                 type: string
 *               external_url:
 *                 type: string
 *             example:
 *               title: Song Title
 *               artists: Artist Name
 *               album: Album Name
 *               external_url: https://example.com/song-url
 *     responses:
 *       201:
 *         description: New song added successfully.
 *       400:
 *         description: Missing data.
 *       404:
 *         description: Playlist not found.
 */
router.post(
  "/playlists/:playlistId/tracks",
  validateAddSongData,
  playlistController.addSongToPlaylist
);

/**
 * @swagger
 * /playlists/{playlistId}/tracks/{songId}:
 *   delete:
 *     summary: Delete a song from a playlist by playlist ID and song ID.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist to delete the song from.
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the song to delete.
 *     responses:
 *       200:
 *         description: Song successfully deleted.
 *       404:
 *         description: Playlist or song not found.
 */
router.delete(
  "/playlists/:playlistId/tracks/:songId",
  playlistController.deleteSongInPlaylist
);

router.use(errorHandler);

module.exports = router;
