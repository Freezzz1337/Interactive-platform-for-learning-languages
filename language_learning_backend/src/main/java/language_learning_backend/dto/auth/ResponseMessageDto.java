package language_learning_backend.dto.auth;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class ResponseMessageDto {
    public ResponseMessageDto(String message) {
        this.message.put("message", message);
    }

    private final Map<String, String> message = new HashMap<>();
}
