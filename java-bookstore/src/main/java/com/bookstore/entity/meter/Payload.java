package com.bookstore.entity.meter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.tomcat.util.codec.binary.Base64;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payload {
    private String APPdata;

    public String getDecode(){
        byte[] bytes = Base64.decodeBase64(this.getAPPdata());
        String data = new String(bytes);
        return data;
    }
}