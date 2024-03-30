# 베이스 이미지로 AdoptOpenJDK 11 사용
FROM adoptopenjdk:11-jre-hotspot

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 WAR 파일 복사
COPY target/accompany_mobile.war /app/accompany_mobile.war

# MariaDB JDBC 드라이버 다운로드 및 복사
ADD https://downloads.mariadb.com/Connectors/java/connector-java-2.3.0/mariadb-java-client-2.3.0.jar /app/mariadb-java-client.jar

# Tomcat 다운로드 및 압축 해제
ADD https://downloads.apache.org/tomcat/tomcat-8/v8.5.99/bin/apache-tomcat-8.5.99.tar.gz /tmp
RUN tar -xzf /tmp/apache-tomcat-8.5.99.tar.gz -C /opt && \
    rm /tmp/apache-tomcat-8.5.99.tar.gz

# Spring application context 및 dispatcher servlet 설정 파일 복사
COPY src/main/webapp/WEB-INF/spring/applicationContext.xml /opt/apache-tomcat-8.5.99/webapps/accompany_mobile/WEB-INF/classes/spring/
COPY src/main/webapp/WEB-INF/spring/dispatcher-servlet.xml /opt/apache-tomcat-8.5.99/webapps/accompany_mobile/WEB-INF/classes/spring/

# 웹 애플리케이션 설정 파일(web.xml) 복사
COPY src/main/webapp/WEB-INF/web.xml /opt/apache-tomcat-8.5.99/webapps/accompany_mobile/WEB-INF/

# 데이터베이스 설정 파일 복사
COPY src/main/webapp/WEB-INF/database.properties /opt/apache-tomcat-8.5.99/webapps/accompany_mobile/

# 포트 노출
EXPOSE 8090

# 컨테이너 실행 시 Tomcat 시작
CMD ["/opt/apache-tomcat-8.5.99/bin/catalina.sh", "run"]
