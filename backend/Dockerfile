# 베이스 이미지
FROM adoptopenjdk/openjdk11:alpine-slim

# 앱 디렉토리 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 필요한 파일들 복사
COPY .. /usr/src/app

# Maven 설치
RUN apk add --no-cache maven

# Maven 빌드
RUN mvn clean package

# 톰캣 다운로드 및 설치
ENV TOMCAT_VERSION 8.5.99
ENV CATALINA_HOME /usr/local/tomcat

RUN wget https://downloads.apache.org/tomcat/tomcat-8/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    tar -xzf apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    rm apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    mv apache-tomcat-${TOMCAT_VERSION} ${CATALINA_HOME}

# Maven 빌드 후 생성된 WAR 파일을 이동
RUN mv /usr/src/app/target/v1.war ${CATALINA_HOME}/webapps/

# 톰캣의 포트 설정 변경
RUN sed -i 's/<Connector port="8080"/<Connector port="8090"/' ${CATALINA_HOME}/conf/server.xml

# MariaDB 설치
RUN apk add --no-cache mariadb mariadb-client

# 톰캣 실행
CMD ["/usr/local/tomcat/bin/catalina.sh", "run"]

# 8090 포트 노출
EXPOSE 8080
