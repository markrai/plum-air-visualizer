package com.markrai.plumairanalyzer.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ConfigController {

    @Value("${api.baseUrl}")
    private String apiBaseUrl;

    @GetMapping("/api/config")
    public Map<String, String> getConfig() {
        Map<String, String> config = new HashMap<>();
        config.put("apiBaseUrl", apiBaseUrl);
        return config;
    }
}
