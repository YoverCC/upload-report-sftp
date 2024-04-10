declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PWD: string;
      LOCAL_TEMPORAL_DIRECTORY: string;
      LOCAL_TEMPORAL_FAILED_DIRECTORY: string;
      REMOTE_SFTP_DIRECTORY: string;
      LOG_LEVEL: string;
      SFTP_HOST: string;
      SFTP_PORT: string;
      SFTP_USER: string;
      SFTP_PASS: string;
      DATABASE_URL: string;
      REPORTS: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
