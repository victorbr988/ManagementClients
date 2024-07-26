# Etapa de construção
FROM node:20-alpine AS build

WORKDIR /usr/src/atac-server

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de produção
FROM node:20-alpine AS production

WORKDIR /usr/src/atac-server

COPY --from=build /usr/src/atac-server/dist ./
COPY --from=build /usr/src/atac-server/package*.json ./
COPY --from=build /usr/src/atac-server/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "start"]
