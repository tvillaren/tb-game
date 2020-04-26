import http from "http";
import path from "path";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";

import { TimeBombRoom } from "./timebomb-server/room/TimeBombRoom";

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server,
  express: app,
});

// register your room handlers
gameServer.define("TBRoom", TimeBombRoom);

// app.use("/", serveIndex(path.join(__dirname, "static"), { icons: true }));
app.use("/", express.static(path.join(__dirname, "timebomb-client")));

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
