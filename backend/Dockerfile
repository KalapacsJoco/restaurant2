# Alap PHP image
FROM php:8.2-fpm

# Szükséges kiegészítők telepítése
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

# Composer telepítése
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Mappa beállítása a backend kódhoz
WORKDIR /var/www/backend

# Projekt fájlok másolása
COPY . .

# Laravel függőségek telepítése
RUN composer install --optimize-autoloader --no-dev

# Laravel cache-ek létrehozása
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache

# Szimbolikus link létrehozása a storage mappához
RUN php artisan storage:link

# Laravel alkalmazás futtatásához
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

EXPOSE 8000