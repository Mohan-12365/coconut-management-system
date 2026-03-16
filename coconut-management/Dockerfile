FROM eclipse-temurin:17

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

RUN mvn -N wrapper:wrapper

EXPOSE 8080

CMD ["java","-jar","target/*.jar"]
