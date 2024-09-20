package language_learning_backend.models.enums;

import lombok.Getter;

@Getter
public enum UserTypeEnum {
    ADMIN("ADMIN"),
    USER("USER");

    private final String userType;

    UserTypeEnum(String userType) {
        this.userType = userType;
    }
}
