FROM node:20 AS build

WORKDIR /app

COPY .npmrc ./.npmrc
COPY package.json package-lock.json ./
COPY src ./src
COPY public ./public
COPY webpack.config.ts ./webpack.config.ts
COPY tsconfig.json ./tsconfig.json

RUN npm install

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

RUN echo "REACT_APP_BACKEND_URL: $REACT_APP_BACKEND_URL"
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

RUN sed -i 's|#location / {|location / {|' /etc/nginx/nginx.conf
RUN sed -i 's|#\s*include\s*proxy_params;|include proxy_params;|' /etc/nginx/nginx.conf
RUN sed -i 's|#\s*proxy_pass http://backend:8090;|proxy_pass '"$BACKEND_URL"';|' /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
