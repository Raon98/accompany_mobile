FROM adoptopenjdk/openjdk11

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN apt-get update && \
    apt-get install -y maven curl && \
    apt-get clean

RUN mvn clean package

ENV TOMCAT_VERSION 10.1.31
ENV MAVEN_HOME=/root/.m2/repository
ENV CATALINA_HOME /usr/local/tomcat

RUN curl -L -O https://archive.apache.org/dist/tomcat/tomcat-10/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    tar -xzf apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    rm apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    mv apache-tomcat-${TOMCAT_VERSION} ${CATALINA_HOME}

RUN mv /usr/src/app/target/v1.war ${CATALINA_HOME}/webapps/

COPY ./script/redeploy.sh /usr/local/bin/redeploy.sh
RUN chmod +x /usr/local/bin/redeploy.sh

RUN sed -i 's/<Connector port="8080"/<Connector port="8090"/' ${CATALINA_HOME}/conf/server.xml && \
    sed -i '/<Host name="localhost" appBase="webapps"/a unpackWARs="true" autoDeploy="true" reloadable="true"' ${CATALINA_HOME}/conf/server.xml

CMD ["/usr/local/tomcat/bin/catalina.sh", "run"]

EXPOSE 8090
