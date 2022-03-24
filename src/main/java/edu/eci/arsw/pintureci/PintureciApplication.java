package edu.eci.arsw.pintureci;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw.pintureci"})
public class PintureciApplication {

	public static void main(String[] args) {
		SpringApplication.run(PintureciApplication.class, args);
	}
}
