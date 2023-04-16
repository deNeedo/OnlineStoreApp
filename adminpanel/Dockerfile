FROM openjdk:17
COPY target/adminpanel-0.1.0.jar adminpanel.jar
ENTRYPOINT ["java", "--module-path", "'./target/classes/app/onlinestore/javafx-sdk-17.0.6/lib'", "--add-modules", "'javafx.controls, javafx.fxml, javafx.graphics'", "-jar", "adminpanel.jar"]