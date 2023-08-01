package com.markrai.plumairanalyzer.repository;

import com.markrai.plumairanalyzer.model.Metrics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetricsRepository extends JpaRepository<Metrics, Integer> {}

