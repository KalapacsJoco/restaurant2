FROM node:20-alpine

# Alkalmazás munkakönyvtár beállítása
WORKDIR /usr/src/app

# package.json és package-lock.json másolása
COPY package*.json ./

# Függőségek telepítése
RUN npm install


# Cache törlése (opcionális, ha szükséges)
RUN npm cache clean --force


# Alkalmazás fájlok másolása
COPY . .

# Rollup manuális telepítése
RUN npm install rollup@latest --save-dev

# Port kiexportálása
EXPOSE 5173

# Alkalmazás futtatása
CMD ["npm", "run", "dev"]