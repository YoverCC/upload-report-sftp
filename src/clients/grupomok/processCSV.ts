import { parse } from 'json2csv';
import { writeFile } from 'fs/promises';
import { report } from "../../types.js";
import { logger } from '../../utils/logger.js';

export async function createCsvReport(folderPath: string, executionIdentifier: string, reportData: report[]) {
  const csvReportPath = `${folderPath}/${executionIdentifier}.csv`;

  // create csv report
  //console.log(reportData);

  // Convert JSON to CSV
  const csv = parse(reportData);

  // Write CSV to file asynchronously
  await writeFile(csvReportPath, csv);

  logger.info(`CSV report created at ${csvReportPath}`);
}
