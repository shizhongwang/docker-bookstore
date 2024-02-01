package com.bookstore.utils;

import lombok.experimental.UtilityClass;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@UtilityClass
public class TimeUtil {
    public static final String DATE_TIME_ISO_8601_WITH_MILLIS = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
    public static final String DATE_TIME_COMPACT_WITH_MILLIS = "yyyyMMddHHmmssSSS";
    public static final String DATE_ISO_8601 = "yyyy-MM-dd";

    private static final ZoneId UTC_ZONE_ID = ZoneId.of("UTC");

    private static final Map<String, DateTimeFormatter> formatterCache = new ConcurrentHashMap<>();

    private static DateTimeFormatter getFormatter(String pattern) {
        return formatterCache.computeIfAbsent(pattern, p -> {
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(p);
            dateTimeFormatter.withZone(UTC_ZONE_ID);

            return dateTimeFormatter;
        });
    }

    public static String format(long epochTimeMillis, String pattern) {
        return getFormatter(pattern).format(ZonedDateTime.from(Instant.ofEpochMilli(epochTimeMillis).atZone(UTC_ZONE_ID)));
    }

    public static String getCurrentTimeString() {
        return getCurrentUTCDateTime().format(getFormatter(DATE_TIME_ISO_8601_WITH_MILLIS));
    }

    public static long getCurrentTimeMilliLong() {
        return Instant.now().toEpochMilli();
    }

    /**
     * get Date from UTCTimeString, format is "2022-07-20T08:03:09.178Z"
     *
     * @param timeStr
     * @return
     */
    public static Date convertStringToDate(String timeStr) {
        return timeStr == null ? null : Date.from(Instant.parse(timeStr));
    }

    public static String convertDateToUTCString(Date date) {
        return date.toInstant().atZone(UTC_ZONE_ID).format(getFormatter(DATE_TIME_ISO_8601_WITH_MILLIS));
    }

    public static String getUTCDateTimeBeforeHoursString(int hours) {
        return getCurrentUTCDateTime().minusHours(hours).format(getFormatter(DATE_TIME_ISO_8601_WITH_MILLIS));
    }

    public static ZonedDateTime getCurrentUTCDateTime() {
        return Instant.now().atZone(UTC_ZONE_ID);
    }

    public static String getSimplifiedTimeString(long epoch) {
        return format(epoch > 0 ? epoch : getCurrentTimeMilliLong(), DATE_TIME_COMPACT_WITH_MILLIS);
    }

    /**
     * get epochMilli from UTCTimeString, format is "2022-07-20T08:03:09.178Z"
     *
     * @param timeStr
     * @return
     */
    public static long getEpochMilliFromUTCTimeString(String timeStr) {
        return Instant.parse(timeStr).toEpochMilli();
    }

    public static String getTimeStringFromEpochMilli(Long epochTime) {
        return epochTime == null ? null : format(epochTime, DATE_TIME_ISO_8601_WITH_MILLIS);
    }

    public static String convertToUTCFormat(String date){
        return  Instant.parse(date + "T00:00:00.000Z").atZone(UTC_ZONE_ID).format(getFormatter(DATE_TIME_ISO_8601_WITH_MILLIS));
    }

    public static String convertUTCtoDateString(String utcDateTime){
        return Instant.parse(utcDateTime).atZone(UTC_ZONE_ID).format(getFormatter(DATE_ISO_8601));
    }

    public static String getCurrentDate() {
        return getCurrentUTCDateTime().format(getFormatter(DATE_ISO_8601));
    }

}
