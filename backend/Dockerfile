FROM adoptopenjdk/openjdk11:alpine-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .. /usr/src/app

RUN apk add --no-cache maven \
    && apk add --no-cache curl

RUN mvn clean package

ENV TOMCAT_VERSION 8.5.99
ENV CATALINA_HOME /usr/local/tomcat

RUN wget https://downloads.apache.org/tomcat/tomcat-8/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    tar -xzf apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    rm apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    mv apache-tomcat-${TOMCAT_VERSION} ${CATALINA_HOME}

RUN mv /usr/src/app/target/v1.war ${CATALINA_HOME}/webapps/

RUN sed -i 's/<Connector port="8080"/<Connector port="8090"/' ${CATALINA_HOME}/conf/server.xml

RUN sed -i 's#</Context>#<Resource name="jdbc/acpy" auth="Container" type="javax.sql.DataSource" maxActive="100" maxIdle="30" maxWait="10000" username="root" password="acpy01!" driverClassName="com.mysql.jdbc.Driver" url="jdbc:mysql://localhost:3306/acpy" /></Context>#' ${CATALINA_HOME}/conf/context.xml

CMD ["/usr/local/tomcat/bin/catalina.sh", "run"]

EXPOSE 8090
