FROM node:18.16.0-alpine3.17
FROM nginx:alpine

COPY dist /app

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
