package language_learning_backend.dto.auth.setDto;

import language_learning_backend.models.Word;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GetSetByIdDto {
    private String name;
    private String description;
    private boolean isVisible;
    private List<Word> wordList;
}
