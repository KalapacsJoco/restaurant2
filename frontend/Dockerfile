# Node.js alapú image
FROM node:20-alpine

# Alkalmazás munkakönyvtár beállítása
WORKDIR /usr/src/app

# package.json és package-lock.json másolása a cache használatához
COPY package*.json ./

# Függőségek telepítése (csak a production környezethez)
RUN npm install 

# Alkalmazás fájlok másolása
COPY . .

# Port dokumentálása
EXPOSE 5173

# Környezeti változók átadása (például Vite backend URL)
ARG VITE_BACKEND_URL=http://backend:8000
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Alkalmazás futtatása
CMD ["npm", "run", "dev"]
