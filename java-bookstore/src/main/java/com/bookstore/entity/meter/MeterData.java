package com.bookstore.entity.meter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.invoke.MethodHandles;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeterData {
    public static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

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

    public static String parseString(String input) {
        try {
            MeterData meterData = JSON.parseObject(input, MeterData.class);
            logger.info("MeterData: {}", JSON.toJSONString(meterData));

            byte[] bytes = Base64.decodeBase64(meterData.getPayload().getAPPdata());
            String data = new String(bytes);

            JSONObject json = new JSONObject();
            String delimiter = ";";
            String[] list = data.split(delimiter);
            for (int i = 0; i < list.length; i++) {
                String[] items = list[i].split(":");
                json.put(items[0], items[1]);
            }

            String ret = json.toJSONString();
            logger.info("PayloadDecode: {}", ret);
            PayloadDecode payloadDecode = JSON.parseObject(ret, PayloadDecode.class);

            return ret;
        } catch (Exception ex) {
            logger.error(ex.toString());
            return ex.toString();
        }
    }
}