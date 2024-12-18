FROM node:20 AS build 
WORKDIR /app 
COPY package.json package-lock.json ./ 
RUN npm install 
COPY . . 
RUN npm run build
FROM nginx:alpine 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/our-travel-app/browser /usr/share/nginx/html 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]