package com.bookstore;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bookstore.entity.meter.MeterData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
//@ComponentScans({
//		@ComponentScan(value = "com.bookstore.config"),
//})
//public class OnlineBookStoreApplication {
//    public static void main(String[] args) {
//        SpringApplication.run(OnlineBookStoreApplication.class, args);
//    }
//}

public class OnlineBookStoreApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {

        String input = "{\n" +
                "    \"upPacketSN\": -1,\n" +
                "    \"upDataSN\": -1,\n" +
                "    \"topic\": \"v1/up/ad\",\n" +
                "    \"timestamp\": 1701396137668,\n" +
                "    \"tenantId\": \"2000039930\",\n" +
                "    \"serviceId\": \"\",\n" +
                "    \"protocol\": \"lwm2m\",\n" +
                "    \"productId\": \"16985386\",\n" +
                "    \"payload\": {\n" +
                "        \"APPdata\": \"Q250OjE7VGljazoxNzAxMzk2MTM2O1R2YWw6MjUwO0h2YWw6NTU7RG91dDoxODtEZ2V0OjM7VGNwOjA7SGNwOjA7QnZvbDowO0NvZGU6MDtUYW1wZXI6MTtGbGFnOjA7U3ZlcjpTMDIxN1YxMEM7SHZlcjpIMTAxOVYyOEM7SU1FSTo4NjM0NTUwNjc1NTM1MDU7SU1TSTo0NjAxMTMwNjc3OTIyMzk7UlNTSToyNjtDZWxsSWQ6OTk3OTYzMDQ7SUNDSUQ6ODk4NjExMjIyMjkwMDUxMzg1OTY7UlNSUDotNjY7RUNMOjA7U05SOjk7\"\n" +
                "    },\n" +
                "    \"messageType\": \"dataReport\",\n" +
                "    \"deviceType\": \"\",\n" +
                "    \"deviceId\": \"4df91a86838249cb97d4e323db8e8ce2\",\n" +
                "    \"assocAssetId\": \"\",\n" +
                "    \"IMSI\": \"undefined\",\n" +
                "    \"IMEI\": \"863455067553505\"\n" +
                "}\n";

        var t = JSON.parseObject(input, MeterData.class);
        byte[] bytes = Base64.decodeBase64(t.getPayload().getAPPdata());
        String data = new String(bytes);

        parseString();

        SpringApplication.run(OnlineBookStoreApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(OnlineBookStoreApplication.class);
    }

    public static void parseString(){
        String input = "Cnt:1;Tick:1701396136;Tval:250;Hval:55;Dout:18;Dget:3;Tcp:0;Hcp:0;Bvol:0;Code:0;Tamper:1;Flag:0;Sver:S0217V10C;Hver:H1019V28C;IMEI:863455067553505;IMSI:460113067792239;RSSI:26;CellId:99796304;ICCID:89861122229005138596;RSRP:-66;ECL:0;SNR:9;";

        JSONObject json = new JSONObject();
        String delimiter = ";";
        String[] list = input.split(delimiter);
        for(int i=0; i<list.length; i++){
            String[] items = list[i].split(":");
            json.put(items[0], items[1]);
        }

        String ret = json.toJSONString();
        return;
    }
}