# Start with a base image containing Oracle JDK 17 LTS
FROM openjdk:17-jdk-slim

# Add Maintainer Info
LABEL maintainer="markraidc@gmail.com"

# Make port 8081 available to the world outside this container
EXPOSE 8081

# The application's jar file
ARG JAR_FILE=target/plumairvisualizer-0.0.1-SNAPSHOT.jar

# Add the application's jar to the container
ADD ${JAR_FILE} app.jar

# Run the jar file and specify the prod application.properties
ENTRYPOINT ["java","-jar","/app.jar","--spring.profiles.active=prod"]
