module.exports = {
  apps: [
    {
      name: 'GrupoMok-Envio-SFTP',
      script: './build/src/main.js', // Entry point of your application
      args: "",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '6G',
      cron_restart: '0 6 * * *',
      env: {
        NODE_ENV: 'production'
      },
      // https://blog.caustik.com/2012/04/11/escape-the-1-4gb-v8-heap-limit-in-node-js/
      node_args: '--max-old-space-size=4096 --nouse-idle-notification',
    }
  ],
};
