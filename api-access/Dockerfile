FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# nest build requiere commonjs, nodenext solo funciona con ts-node en dev
RUN node -e "\
  const fs = require('fs');\
  const t = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));\
  t.compilerOptions.module = 'commonjs';\
  t.compilerOptions.moduleResolution = 'node';\
  delete t.compilerOptions.resolvePackageJsonExports;\
  fs.writeFileSync('tsconfig.json', JSON.stringify(t, null, 2));\
"

RUN npx tsc -p tsconfig.json

RUN ls -la dist/ && test -f dist/main.js || (echo "ERROR: dist/main.js not generated" && exit 1)


FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3016

CMD ["node", "dist/main"]
