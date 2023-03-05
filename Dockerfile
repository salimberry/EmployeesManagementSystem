FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
COPY . .
FROM nginx:latest
COPY --from=build /app/dist/management-sytem /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
