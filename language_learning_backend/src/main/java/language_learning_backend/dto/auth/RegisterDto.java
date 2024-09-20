package language_learning_backend.dto.auth;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class RegisterDto {
    private String username;
    private String password;
    private String email;
    private String profilePicture;
    private Timestamp dateOfBirthday;
}
