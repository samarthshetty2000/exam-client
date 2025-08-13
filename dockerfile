FROM nginx:alpine

# Copy built Angular app from local build to Nginx HTML folder
COPY dist/your-app-name /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
