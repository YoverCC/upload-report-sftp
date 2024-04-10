import prisma from './db.js';
import { report } from "./types.js";
import { logger } from "./utils/logger.js";

export async function queryReport(reportName): Promise<report[]> {

  try {

    logger.info("Report: ", reportName);
    var data = await prisma.$queryRaw<report[]>`${reportName}`;

    if (data.length == 0) {
      logger.warn("Error retrieving report:", "No hay registros");
      return []; // Return empty array if there is no registers
    }
    else{
      return data; // Return data
    }
  } catch (error) {
    logger.error("Error retrieving report:");
    logger.error(error);
    return []; // Return empty array
  }

}
