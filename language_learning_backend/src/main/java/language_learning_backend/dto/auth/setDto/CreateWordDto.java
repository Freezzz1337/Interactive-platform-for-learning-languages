package language_learning_backend.dto.auth.setDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateWordDto {
    private String wordSource;
    private String wordTarget;

    private String sourceLang;
    private String targetLang;
}
