# Többlépcsős build: Laravel backend és React frontend egy konténerben

# 1. Laravel (backend) - PHP környezet
FROM php:8.2-fpm AS backend

# Rendszerkövetelmények telepítése
RUN apt-get update && apt-get install -y \
    libsqlite3-dev unzip curl git \
    && docker-php-ext-install pdo pdo_sqlite

# Composer telepítése
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Laravel backend mappa másolása
WORKDIR /var/www/backend
COPY backend/ .

# Laravel függőségek telepítése
RUN composer install --optimize-autoloader --no-dev

# Laravel cache-elés
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache

# 2. React (frontend) - Vite build
FROM node:18 AS frontend

# Munkakönyvtár beállítása
WORKDIR /var/www/frontend

# Frontend teljes mappa másolása
COPY frontend/ .

# React build
RUN npm install && npm run build

# 3. Final stage - Nginx kiszolgálás
FROM nginx:1.25

# Laravel és React fájlok áthelyezése
COPY --from=backend /var/www/backend /var/www/backend
COPY --from=frontend /var/www/frontend/dist /var/www/frontend

# Nginx konfiguráció másolása
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Nginx alapértelmezett mappa
WORKDIR /var/www

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
