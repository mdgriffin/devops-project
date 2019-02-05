#!/usr/bin/env bash

# Install Java
apt install software-properties-common apt-transport-https -y
add-apt-repository ppa:webupd8team/java -y
apt-get update -y
apt-get install oracle-java8-installer

# Verify Java is Installed
echo java -version

# Install Maven
cd /usr/local/src || exit
wget http://www-us.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
tar -xf apache-maven-3.5.4-bin.tar.gz
mv apache-maven-3.5.4/ apache-maven/

# Setup Environment Variables
export JAVA_HOME=/usr/lib/jvm/java-8-oracle
export M2_HOME=/usr/local/src/apache-maven
export MAVEN_HOME=/usr/local/src/apache-maven
export PATH=${M2_HOME}/bin:${PATH}

echo mvn --version