import Client = require("ssh2-sftp-client");
import * as fs from "fs";
import { logger } from "../utils/logger.js";


export async function uploadFolderToFTP(localFolderPath, localFolderFailedPath, filename, remoteFolderPath, sftpconfig) {

  const localFilePath = localFolderPath + "/" + filename;
  const localFailedFilePath = localFolderFailedPath + "/" + filename;
  const timeout_miliseconds = 180000;
  const client = new Client()

  let data = fs.createReadStream(localFilePath);

  const config = {
    host: sftpconfig.host,
    port: sftpconfig.port,
    username: sftpconfig.username,
    password: sftpconfig.password,
    readyTimeout: timeout_miliseconds // integer How long (in ms) to wait for the SSH handshake
  };

  logger.info(`About to upload from ${localFolderPath} to ${remoteFolderPath}`);

  client.connect(config)
  .then(() => {
    return client.put(data, remoteFolderPath + "/" + filename);
  })
  .then(() => {
    logger.info("Archivo " + filename + " subido correctamente");
    logger.info("Elimino el archivo subido")
    fs.promises.rm(localFilePath);

    return client.end();
  })
  .catch(err =>  {
    logger.error("Error al subir archivo: " + filename);
    logger.error(err.message);

    logger.info("Muevo el archivo fallido");
    fs.promises.rename(localFilePath, localFailedFilePath);
    return client.end();
  })

};
