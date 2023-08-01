package com.markrai.plumairanalyzer.repository;

import com.markrai.plumairanalyzer.model.Detector;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetectorRepository extends JpaRepository<Detector, Integer> {}

