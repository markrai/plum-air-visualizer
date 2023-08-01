package com.markrai.plumairanalyzer.service;

import com.markrai.plumairanalyzer.model.Metrics;
import com.markrai.plumairanalyzer.repository.MetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetricsService {

    private final MetricsRepository metricsRepository;

    @Autowired
    public MetricsService(MetricsRepository metricsRepository) {
        this.metricsRepository = metricsRepository;
    }

    public List<Metrics> findAll() {
        return metricsRepository.findAll();
    }


}
