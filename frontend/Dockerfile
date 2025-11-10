FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package.json .
RUN npm install --legacy-peer-deps

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
