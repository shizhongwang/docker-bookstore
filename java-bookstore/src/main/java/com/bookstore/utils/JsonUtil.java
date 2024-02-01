package com.bookstore.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.experimental.UtilityClass;

import java.io.File;
import java.io.IOException;
import java.time.*;
import java.util.*;

@UtilityClass
public class JsonUtil {
    private static final ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS, true);
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
        mapper.configure(JsonParser.Feature.ALLOW_NUMERIC_LEADING_ZEROS, true);
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);

        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.registerModule(createJavaTimeModule());
    }
    private static JavaTimeModule createJavaTimeModule() {
        JavaTimeModule javaTimeModule = new JavaTimeModule();

        customizeDateTimeSerialization(javaTimeModule);

        return javaTimeModule;
    }

    private static void customizeDateTimeSerialization(JavaTimeModule javaTimeModule) {
        javaTimeModule.addSerializer(Date.class, CustomizedJsonSerializer.DATE);
        javaTimeModule.addSerializer(LocalDateTime.class, CustomizedJsonSerializer.LOCAL_DATE_TIME);
        javaTimeModule.addSerializer(Instant.class, CustomizedJsonSerializer.INSTANT);
        javaTimeModule.addSerializer(Calendar.class, CustomizedJsonSerializer.CALENDAR);
        javaTimeModule.addSerializer(OffsetDateTime.class, CustomizedJsonSerializer.OFFSET_DATE_TIME);
    }

    public static <T> String toJSONString(T obj) {
        return toJSONString(obj, false);
    }

    public static <T> String toJSONString(T obj, boolean format) {
        if (Objects.isNull(obj)) {
            return null;
        }
        try {
            String result = format ? mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj) : mapper.writeValueAsString(obj);
            return result;
        } catch (JsonProcessingException e) {
            throw new JsonException(" Parse Object to String error ", e);
        }
    }

    public static <T> T toObject(String text, TypeReference<T> typeRef) {
        if (text == null || text.isEmpty() || typeRef == null) {
            return null;
        }
        try {
            T obj = mapper.readValue(text, typeRef);
            return obj;
        } catch (IOException e) {
            throw new JsonException(" Parse String to Object error ", e);
        }
    }

    public static <T> T toObject(File file, Class<T> clazz) {
        if (file == null || clazz == null) {
            return null;
        }
        try {
            T obj = mapper.readValue(file, clazz);
            return obj;
        } catch (IOException e) {
            throw new JsonException(" Parse file to Object error ", e);
        }
    }

    public static <T> T toObject(String text, Class<T> clazz) {
        if (text == null || text.isEmpty() || clazz == null) {
            return null;
        }
        if (clazz.equals(String.class)) {
            return (T) text;
        }
        try {
            T obj = mapper.readValue(text, clazz);
            return obj;
        } catch (IOException e) {
            throw new JsonException(" Parse String to Object error ", e);
        }
    }

    public static <T> T toObject(JsonNode node, Class<T> clazz) {
        try {
            return mapper.treeToValue(node, clazz);
        } catch (JsonProcessingException e) {
            throw new JsonException("Failed to convert from JSONNode to Object", e);
        }
    }

    public static ArrayNode createArrayNode() {
        return mapper.createArrayNode();
    }

    public static ObjectNode createObjectNode() {
        return mapper.createObjectNode();
    }

    public static <T> List<T> toArray(String text, Class<T> clazz) {
        if (text == null || text.isEmpty() || clazz == null) {
            return null;
        }
        JavaType javaType = mapper.getTypeFactory().constructParametricType(List.class, clazz);
        try {
            List<T> list = mapper.readValue(text, javaType);
            return list;
        } catch (IOException e) {
            throw new JsonException("Parse String to Array error ", e);
        }
    }

    public static JsonNode toJsonNode(Object object) {
        if (object == null) {
            return null;
        }
        return mapper.valueToTree(object);
    }

    public static JsonNode toJsonNode(String text) {
        if (text == null || text.isEmpty()) {
            return null;
        }
        try {
            return mapper.readTree(text);
        } catch (JsonProcessingException e) {
            throw new JsonException("Parse String to Json Node ", e);
        }
    }

    public static JsonNode toJsonNode(String json, String jsonPath) {
        if (json == null || json.isEmpty() || jsonPath == null || jsonPath.isEmpty()) {
            return null;
        }
        try {
            return mapper.readTree(json).at(jsonPath);
        } catch (JsonProcessingException e) {
            throw new JsonException("toJSONStringFromElement error ", e);
        }
    }

    public static JsonNode valueToTree(Object object){
        if (object == null) {
            return null;
        }

        return mapper.valueToTree(object);
    }

    public static ObjectNode jsonNodeToObjectNode(JsonNode jsonNode) {
        if(jsonNode == null){
            return null;
        }

        if (jsonNode.isObject()) {
            return (ObjectNode) jsonNode;
        }

        ObjectNode objectNode = mapper.createObjectNode();
        if (!jsonNode.isNull()) {
            for (Iterator<String> it = jsonNode.fieldNames(); it.hasNext(); ) {
                String fieldName = it.next();
                JsonNode fieldValue = jsonNode.get(fieldName);
                if (fieldValue != null && !fieldValue.isNull()) {
                    objectNode.set(fieldName, fieldValue);
                }
            }
        }
        return objectNode;
    }

    public static class JsonException extends RuntimeException {
        public JsonException() {
            super();
        }

        public JsonException(String message) {
            super(message);
        }

        public JsonException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    private static class CustomizedJsonSerializer {
        private static final JsonSerializer DATE = new JsonSerializer<Date>() {
            @Override
            public void serialize(Date value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
                jsonGenerator.writeString(TimeUtil.convertDateToUTCString(value));
            }
        };

        private static final JsonSerializer LOCAL_DATE_TIME = new JsonSerializer<LocalDateTime>() {
            @Override
            public void serialize(LocalDateTime value, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
                jsonGenerator.writeString(TimeUtil.getTimeStringFromEpochMilli(value.toInstant(ZoneOffset.UTC).toEpochMilli()));
            }
        };

        private static final JsonSerializer INSTANT = new JsonSerializer<Instant>() {
            @Override
            public void serialize(Instant value, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
                jsonGenerator.writeString(TimeUtil.getTimeStringFromEpochMilli(value.toEpochMilli()));
            }
        };

        private static final JsonSerializer CALENDAR = new JsonSerializer<Calendar>() {
            @Override
            public void serialize(Calendar value, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
                jsonGenerator.writeString(TimeUtil.getTimeStringFromEpochMilli(value.toInstant().toEpochMilli()));
            }
        };

        private static final JsonSerializer OFFSET_DATE_TIME =  new JsonSerializer<OffsetDateTime>() {
            @Override
            public void serialize(OffsetDateTime value, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
                jsonGenerator.writeString(TimeUtil.getTimeStringFromEpochMilli(value.toInstant().toEpochMilli()));
            }
        };

    }
}

