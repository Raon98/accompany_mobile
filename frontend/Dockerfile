# Node.js 20 버전을 베이스 이미지로 사용
FROM node:20 AS build

# 작업 디렉토리 설정
WORKDIR /app

COPY .npmrc ./.npmrc
# 패키지 파일 복사
COPY package.json package-lock.json ./

# 패키지 설치
RUN npm install

# 소스 코드 복사
COPY src ./src
COPY public ./public
COPY .env.development ./.env.development
COPY webpack.config.ts ./webpack.config.ts
COPY tsconfig.json ./tsconfig.json

# 애플리케이션 빌드
RUN npm run build

# NGINX를 베이스 이미지로 사용하여 최종 이미지 생성
FROM nginx:alpine

# NGINX 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 애플리케이션 파일을 NGINX의 HTML 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 포트 노출
EXPOSE 3000

# 컨테이너 실행 시 NGINX 시작
CMD ["nginx", "-g", "daemon off;"]
