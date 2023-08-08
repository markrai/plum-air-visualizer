package com.markrai.plumairanalyzer.model;


import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "metrics")
public class Metrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Timestamp timestamp;

    @Column(name = "detector_id")
    private Integer detectorId;

    @Column(name = "placement")
    private String placement;

    @Column(name = "p_0_3_um")
    private Float p0_3Um;

    @Column(name = "p_0_3_um_b")
    private Float p0_3UmB;

    @Column(name = "p_2_5_um")
    private Float p2_5Um;

    @Column(name = "p_2_5_um_b")
    private Float p2_5UmB;

    @Column(name = "gas_680")
    private Float gas680;

    @Column(name = "temperature")
    private Float temperature;

    @Column(name = "humidity")
    private Float humidity;

    @Column(name = "outdoor_temperature")
    private Float outdoorTemperature;

    @Column(name = "outdoor_humidity")
    private Float outdoorHumidity;

    @Column(name = "co2")
    private Float co2;


    @ManyToOne
    @JoinColumn(name = "detector_id", insertable = false, updatable = false)
    private Detector detector;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getDetectorId() {
        return detectorId;
    }

    public void setDetectorId(Integer detectorId) {
        this.detectorId = detectorId;
    }

    public String getPlacement() {
        return placement;
    }

    public void setPlacement(String placement) {
        this.placement = placement;
    }

    public Float getP0_3Um() {
        return p0_3Um;
    }

    public void setP0_3Um(Float p0_3Um) {
        this.p0_3Um = p0_3Um;
    }

    public Float getP0_3UmB() {
        return p0_3UmB;
    }

    public void setP0_3UmB(Float p0_3UmB) {
        this.p0_3UmB = p0_3UmB;
    }

    public Float getP2_5Um() {
        return p2_5Um;
    }

    public void setP2_5Um(Float p2_5Um) {
        this.p2_5Um = p2_5Um;
    }

    public Float getP2_5UmB() {
        return p2_5UmB;
    }

    public void setP2_5UmB(Float p2_5UmB) {
        this.p2_5UmB = p2_5UmB;
    }

    public Float getGas680() {
        return gas680;
    }

    public void setGas680(Float gas680) {
        this.gas680 = gas680;
    }

    public Float getTemperature() {
        return temperature;
    }

    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public Float getHumidity() {
        return humidity;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public Float getCo2() {
        return co2;
    }

    public Float getOutdoorTemperature() {
        return outdoorTemperature;
    }

    public void setOutdoorTemperature(Float outdoorTemperature) {
        this.outdoorTemperature = outdoorTemperature;
    }

    public Float getOutdoorHumidity() {
        return outdoorHumidity;
    }

    public void setOutdoorHumidity(Float outdoorHumidity) {
        this.outdoorHumidity = outdoorHumidity;
    }

    public void setCo2(Float co2) {
        this.co2 = co2;
    }

    public Detector getDetector() {
        return detector;
    }

    public void setDetector(Detector detector) {
        this.detector = detector;
    }
}
