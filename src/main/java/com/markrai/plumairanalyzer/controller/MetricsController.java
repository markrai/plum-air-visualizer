package com.markrai.plumairanalyzer.controller;
import com.markrai.plumairanalyzer.model.Metrics;
import com.markrai.plumairanalyzer.repository.MetricsRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/metrics")
public class MetricsController {

    private final MetricsRepository metricsRepository;

    public MetricsController(MetricsRepository metricsRepository) {
        this.metricsRepository = metricsRepository;
    }

    @GetMapping
    public Iterable<Metrics> getAllMetrics() {
        return metricsRepository.findAll();
    }


}
