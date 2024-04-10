import { queryReport } from "./getReport.js";
import { logger } from './utils/logger.js';
import { createCsvReport } from './clients/grupomok/processCSV.js';
import { uploadFolderToFTP } from "./targets/uploadToFtp.js";
import moment from "moment";

const sftpConfig = {
  host: process.env.SFTP_HOST,
  port: process.env.SFTP_PORT,
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASS,
  secure: false // set to true if you are using FTPS
};

const folderPath = process.env.LOCAL_TEMPORAL_DIRECTORY;
const folderFailedPath = process.env.LOCAL_TEMPORAL_FAILED_DIRECTORY;

export async function uploadToRepository(reportName) {
  logger.info('Starting uploadToRepository function');

  const report = await queryReport(reportName);

  if (report.length === 0) {
    logger.info('No records to process');
    logger.info('Terminating uploadToRepository function');
    return;
  }

  logger.info("Cantidad de datos", report.length);

  // Generar CSV y setear el directorio temporal
  // get the current date only, which is the execution date
  const executionDate = moment().format('YYYY_MM_DD_HH_mm');

  logger.info("Hora de ejecucion", executionDate);

  const executionIdentifier = reportName + "_" + executionDate;
  await createCsvReport(folderPath, executionIdentifier, report);

  // log user host, port and user
  logger.info('SFTP configuration:');
  logger.info(`Host: ${sftpConfig.host}`);
  logger.info(`Port: ${sftpConfig.port}`);
  logger.info(`User: ${sftpConfig.username}`);

  logger.info('Uploading to SFTP repository');

  const filename = executionIdentifier + ".csv";
  // copy all from local temp folder to remote folder
  await uploadFolderToFTP(folderPath, folderFailedPath, filename, process.env.REMOTE_SFTP_DIRECTORY, sftpConfig)

  logger.info('uploadToRepository function completed');
}
