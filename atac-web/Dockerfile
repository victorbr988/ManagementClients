FROM node:20-alpine AS build

WORKDIR /usr/src/atac-web

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de produção
FROM node:20-alpine AS production

WORKDIR /usr/src/atac-web

COPY --from=build /usr/src/atac-web/package*.json ./
COPY --from=build /usr/src/atac-web/.next ./
COPY --from=build /usr/src/atac-web/public ./public
COPY --from=build /usr/src/atac-web/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
