#!/bin/bash
# redeploy.sh
mvn package

rm /usr/local/tomcat/webapps/v1.war

cp /usr/src/app/target/v1.war /usr/local/tomcat/webapps/