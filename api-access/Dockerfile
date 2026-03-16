FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Elimina el path alias local que no existe en Docker (la lib está instalada vía npm)
RUN node -e "\
  const fs = require('fs');\
  const t = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));\
  delete t.compilerOptions.paths;\
  fs.writeFileSync('tsconfig.json', JSON.stringify(t, null, 2));\
"

RUN npm run build && ls -la dist/


FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3016

CMD ["node", "dist/main"]
