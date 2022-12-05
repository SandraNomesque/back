#Descarga una imagen de node 16
FROM node:16
#Cambia al directorio /app
WORKDIR /
#Copia desde nuestra equipo al contendor en el directorio activo
COPY . .
#Instala las librerias
RUN npm install --production --force
#Puerto de escucha
EXPOSE 8000
#Ejecuto el backend
CMD ["node", "/node-template/server.js"]
#Ejecuto el frontend
#CMD ["npm","run","dev"]
