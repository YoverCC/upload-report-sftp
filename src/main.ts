import 'dotenv/config';
import { logger } from "./utils/logger.js";
import { uploadToRepository } from './uploadToRepository.js';


async function main() {
  logger.info("Iniciando proceso de subida de reportes a SFTP ...");

  var reportJson = JSON.parse(process.env.REPORTS);

  //console.log(reportJson.reports);
  reportJson.reports.forEach(function(reportCountry){
    for(var countryFolder in reportCountry){
      //console.log(countryFolder);
      //console.log(reportCountry[countryFolder]);
      var reports = reportCountry[countryFolder].split(", ");
      reports.forEach(async function(reporte){
        logger.info("Ejecuto proceso para reporte: ", reporte);
        await uploadToRepository(reporte, countryFolder);
      })
    }
  }

  )
  /*var reports = process.env.REPORTS.split(", ");
  console.log(reports);


  reports.forEach(async function(reporte){
    logger.info("Ejecuto proceso para reporte: ", reporte);
    await uploadToRepository(reporte);
  })
  */
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
