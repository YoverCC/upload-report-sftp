import 'dotenv/config';
import { logger } from "./utils/logger.js";
import { uploadToRepository } from './uploadToRepository.js';


async function main() {
  logger.info("Iniciando proceso de subida de reportes a SFTP ...");

  var reports = process.env.REPORTS.split(", ");
  console.log(reports);


  reports.forEach(async function(reporte){
    logger.info("Ejecuto proceso para reporte: ", reporte);
    await uploadToRepository(reporte);
  })

}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
