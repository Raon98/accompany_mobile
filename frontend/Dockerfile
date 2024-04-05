# 첫 번째 단계: 애플리케이션 빌드
FROM node:20 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY .npmrc ./.npmrc
COPY package.json package-lock.json ./
COPY src ./src
COPY public ./public
COPY .env.development ./.env.development
COPY webpack.config.ts ./webpack.config.ts
COPY tsconfig.json ./tsconfig.json

# 애플리케이션 종속성 설치
RUN npm install

# 애플리케이션 빌드
RUN npm run build

# 두 번째 단계: Nginx를 이용한 애플리케이션 배포
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 애플리케이션을 Nginx의 정적 파일 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 환경 변수를 이용하여 백엔드 주소 설정
ENV BACKEND_URL="http://backend:8090/v1/"

# Nginx가 리버스 프록시로 작동하도록 설정
# 서비스 호출 시 백엔드 주소로 포워딩
RUN sed -i 's|#location / {|location / {|' /etc/nginx/nginx.conf
RUN sed -i 's|#\s*include\s*proxy_params;|include proxy_params;|' /etc/nginx/nginx.conf
RUN sed -i 's|#\s*proxy_pass http://backend:8090;|proxy_pass '"$BACKEND_URL"';|' /etc/nginx/nginx.conf

# 사용할 포트 노출
EXPOSE 3000

# Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]
