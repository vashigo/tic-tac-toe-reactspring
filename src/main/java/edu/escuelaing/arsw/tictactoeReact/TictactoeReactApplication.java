package edu.escuelaing.arsw.tictactoeReact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "package edu.escuelaing.arsw.tictactoeReact.endpoints")
public class TictactoeReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(TictactoeReactApplication.class, args);
	}

}
