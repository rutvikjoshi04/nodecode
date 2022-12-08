/****************************************************************************** ***
 * ITE5315 – Project
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students. *
 * Group member Name: Juan Gutierrez Student IDs: N01469217 Date: 29-Nov-2022
 ****************************************************************************** ***/

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDb from "./database/MongoDbConfig.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import rTokenModel from "./database/models/rToken.js";

//To load env variables into the process global object
dotenv.config();

//Create server
const app = express();

const PORT = process.env.PORT_AUTH || 5002;
//To connect to the Db
connectDb()
  .then(app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//Configure server
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.post("/newAccessToken", async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null)
    return res.status(401).send("Forbidden action. You need a refresh token");
  if (!(await rTokenModel.findOne({ refreshToken })))
    return res.status(403).send("Your refresh token is no longer valid");
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).send("Valid JWT token, but forbidden action");
    res
      .status(200)
      .json({ accessToken: getAccessToken({ email: user.email }) });
  });
});

app.post("/getTokens", async (req, res) => {
  //Authenticate user

  const userInfo = { email: req.body.email };

  if (!userInfo.email)
    return res.status(400).send("Request must have email parameter");

  const aToken = getAccessToken(userInfo);
  const rToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET);
  await rTokenModel.create({ refreshToken: rToken });
  res.json({ accessToken: aToken, refreshToken: rToken });
});

app.delete("/deleteRefreshToken", async (req, res) => {
  //Delete refresh token
  await rTokenModel
    .deleteOne({
      refreshToken: req.body.refreshToken,
    })
    .then(function (data) {
      console.log(data);
      res.status(204).send("Refresh token successfully deleted");
    });
});

function getAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
}
