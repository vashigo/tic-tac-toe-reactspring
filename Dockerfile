#FROM openjdk:8-jdk-alpine
#LABEL maintainer="intro react"
#ADD target/intro-react-0.0.1-SNAPSHOT.jar intro-react.jar
#ENTRYPOINT ["java","-jar","intro-react.jar"]

FROM maven:3.5-jdk-8-alpine as builder
RUN mvn clean install -DskipTests
FROM openjdk:8
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# Use the official maven/Java 8 image to create a build artifact: https://hub.docker.com/_/maven
#FROM maven:3.5-jdk-8-alpine as builder

# Copy local code to the container image.
 #WORKDIR ./Dockerfile/app
 #COPY pom.xml .
 #COPY src ./src

# Build a release artifact.
#RUN mvn clean package -DskipTests

# Use the Official OpenJDK image for a lean production stage of our multi-stage build.
# https://hub.docker.com/_/openjdk
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
#FROM openjdk:8-jre-alpine

# Copy the jar to the production image from the builder stage.
#COPY --from=builder ./Dockerfile/app/target/intro-react-0.0.1-SNAPSHOT.jar /intro-react.jar

# Run the web service on container startup.
#CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/intro-react.jar"]
