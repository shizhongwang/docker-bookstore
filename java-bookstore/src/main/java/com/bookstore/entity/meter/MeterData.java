package com.bookstore.entity.meter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeterData {
    private int upPacketSN;
    private int upDataSN;
    private String topic;
    private long timestamp;
    private String tenantId;
    private String serviceId;
    private String protocol;
    private String productId;
    private Payload payload;
    private String messageType;
    private String deviceType;
    private String deviceId;
    private String assocAssetId;
    private String IMSI;
    private String IMEI;
}