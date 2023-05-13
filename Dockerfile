FROM node:18.16.0-alpine3.17
FROM nginx:alpine

COPY dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
