const functions = require("firebase-functions");

const express = require("express");
const app = express();

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");
const FBAuth = require("./util/fbAuth");

app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);
app.get("/scream/:screamId", getScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);
app.post("/scream/:screamId/like", FBAuth, likeScream);
app.post("/scream/:screamId/unlike", FBAuth, unlikeScream);
// delee scream
// like a scream
// unliking scream
//comment on scream

//signup route
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.get("/user", FBAuth, getAuthenticatedUser);
app.post("/user", FBAuth, addUserDetails);
exports.api = functions.region("europe-west1").https.onRequest(app);
