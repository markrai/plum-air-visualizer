package com.markrai.plumairanalyzer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class PlumairvisualizerApplication implements CommandLineRunner {

    @Value("${app.ipport}")
    private String ipport;

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("America/New_York"));
        SpringApplication.run(PlumairvisualizerApplication.class, args);

    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("App hosted at http://" + ipport + "/metrics.html");
    }
}
