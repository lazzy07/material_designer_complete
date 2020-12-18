import Server from "../common/classes/Server";
import { CDN_SERVICE_PORT } from "../common/constants";
import { profilePictureUpload } from "./controllers/ImageUpload";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { handleUploadArtwork } from "./controllers/UploadArtwork";
import { handleUploadMaterial } from "./controllers/MaterialUpload";

class CDNMain {
  static main() {
    const server = Server.getInstance();
    server.setPort(CDN_SERVICE_PORT);
    server.listen("srv_cdn");

    const app = server.getApp();
    app.use(cors({ credentials: true, origin: true }));
    app.use(cookieParser());
    app.use("/uploads", express.static("/usr/src/app/uploads"));
    app.use(
      fileUpload({
        limits: { fileSize: 1024 * 1024 * 5 },
        useTempFiles: true,
        tempFileDir: "/tmp/"
      })
    );
    app.post("/upload_profile", profilePictureUpload);
    app.post("/uploadartwork", handleUploadArtwork);
    app.post("/uploadmaterial", handleUploadMaterial);
  }
}

CDNMain.main();
