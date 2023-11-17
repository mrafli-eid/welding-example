FROM node:lts as build-stage
WORKDIR ./app
COPY ./package*.json /app/
RUN npm ci
COPY ./ /app/

RUN npm run build -- --output-path=./dist/out --output-hashing=all
# Stage 2: Serve it using Ngnix
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

