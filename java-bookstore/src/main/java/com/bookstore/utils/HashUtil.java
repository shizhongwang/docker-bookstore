//package com.bookstore.utils;
//
//import com.google.common.hash.Hashing;
//import lombok.experimental.UtilityClass;
//
//import java.nio.charset.StandardCharsets;
//
//@UtilityClass
//public class HashUtil {
//    public static final String UUID_HEADER = "user-uuid";
//    public static final String MESSENGER_UUID_HEADER = "messenger-uuid";
//    public static final String HEADER_AUTHORIZATION = "authorization";
//
//    public static String getHashFromUuid(String uuid) {
//        if (uuid == null) {
//            return null;
//        }
//        return Hashing.sha256().hashString(uuid, StandardCharsets.UTF_8).toString();
//    }
//}