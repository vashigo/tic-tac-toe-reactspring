# Etapa de construcción: Utiliza la imagen oficial de Maven/Java 8 para crear un artefacto de construcción
FROM maven:3.5-jdk-8-alpine as builder

# Copia el código local en la imagen del contenedor
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Construye un artefacto de lanzamiento.
RUN mvn clean package -DskipTests

# Etapa de ejecución: Usa la imagen oficial de OpenJDK para una etapa de producción más ligera
FROM openjdk:8-jre-alpine

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 8080

# Copia el JAR de la etapa de construcción a la imagen de producción
COPY --from=builder /app/target/intro-react-0.0.1-SNAPSHOT.jar /app.jar

ENV JAVA_OPTS=""

# Ejecuta el servicio web al iniciar el contenedor
CMD exec java $JAVA_OPTS -jar /app.jar
