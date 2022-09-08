FROM openjdk:8-jdk-alpine
LABEL maintainer="intro react"
ADD target/intro-react-0.0.1-SNAPSHOT.jar intro-react.jar
ENTRYPOINT ["java","-jar","intro-react.jar"]