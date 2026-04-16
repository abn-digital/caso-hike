FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html

# Nginx config: serve static files, handle slash routing, enable gzip
RUN echo 'server { \
    listen 8080; \
    root /usr/share/nginx/html; \
    index caso-practico.html; \
    gzip on; \
    gzip_types text/html text/css application/javascript application/json; \
    location / { \
        try_files $uri $uri/ /caso-practico.html; \
    } \
    location ~* \.(zip|csv)$ { \
        add_header Content-Disposition "attachment"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
