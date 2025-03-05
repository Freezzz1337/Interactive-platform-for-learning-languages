package language_learning_backend.dto.auth.setDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class SetDto {
    private long id;
    private String setName;
    private int numberOfWords;
    private String nameOfCreator;
    private Timestamp createdAt;
}
