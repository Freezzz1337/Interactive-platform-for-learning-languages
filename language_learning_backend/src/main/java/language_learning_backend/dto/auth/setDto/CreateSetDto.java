package language_learning_backend.dto.auth.setDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CreateSetDto {
    private String name;
    private String description;
    @JsonProperty("isVisible")
    private boolean isVisible;
    List<CreateWordDto> words;
}



