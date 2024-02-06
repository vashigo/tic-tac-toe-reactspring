# Etapa de construcción: Utiliza la imagen oficial de Maven/Java 8 para crear un artefacto de construcción
FROM maven:3.5-jdk-8-alpine as builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Construye un artefacto de lanzamiento.
RUN mvn clean package -DskipTests

# Depura: Lista los archivos en el directorio target para verificar la creación del JAR
RUN ls /app/target/

# Etapa de ejecución: Usa la imagen oficial de OpenJDK para una etapa de producción más ligera
FROM openjdk:8-jre-alpine

EXPOSE 8080

# Copia el JAR usando un comodín para evitar problemas de nombres de archivos
COPY --from=builder /app/target/*.jar /app.jar

ENV JAVA_OPTS=""

CMD exec java $JAVA_OPTS -jar /app.jar
