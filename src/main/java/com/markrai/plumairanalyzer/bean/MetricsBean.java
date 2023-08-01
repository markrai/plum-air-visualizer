package com.markrai.plumairanalyzer.bean;

import com.markrai.plumairanalyzer.service.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;

@Component
@Scope("view")
public class MetricsBean implements Serializable {

    private List<String> timestamps; // List to hold formatted timestamps

    private final MetricsService metricsService;

    @Autowired
    public MetricsBean(MetricsService metricsService) {
        this.metricsService = metricsService;
    }


    public List<String> getTimestamps() {
        return timestamps;
    }
}
