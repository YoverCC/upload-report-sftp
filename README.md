# Proceso de subida de SP Reportes a SFTP 

Proceso personalizado para cliente GrupoMok que consiste en enviar reportes a SFTP

## DESARROLLO y SETUP

Requerimientos:

- node >= 18

Setup:

1. Instalar librerias

```shell
npm i
```

2. Editar y copiar variables de entorno

```shell
cp .env.development .env
```

3.  Setup directories

```shell
make setup
```

4. Correr upload

```shell
npm run build && node build/src/main.js
```

## EJECUCIÓN AUTOMÁTICA

Utliza pm2 cron

1. Agregar el app a la lista de apps de PM2 y ejecutar inmediatamente

```shell
pm2 startOrReload ecosystem.config.cjs --update-env
```

2. Guardar la lista de apps de PM2 para sobrevivir los reinicios del servidor, considerando que esta configurado el [PM2-STARTUP](https://pm2.keymetrics.io/docs/usage/startup/)

```shell
pm2 save
```
