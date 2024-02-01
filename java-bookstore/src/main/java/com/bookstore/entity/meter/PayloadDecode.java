package com.bookstore.entity.meter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayloadDecode {
    private int Cnt;
    private long Tick;
    private String Tval;
    private String Hval;
    private int Dout;
    private int Dget;
    private int Tcp;
    private int Hcp;
    private int Bvol;
    private int Code;
    private int Tamper;
    private int Flag;
    private String Sver;
    private String Hver;
    private String IMSI;
    private String IMEI;
    private String RSSI;
    private String CellId;
    private String ICCID;
    private String RSRP;
    private int ECL;
    private int SNR;

}