# Build phase
FROM node:18 as build
WORKDIR /app
COPY ./web-builder2/package*.json ./
RUN npm install
COPY ./web-builder2 .
RUN npm run build

# Nginx serve phase
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
