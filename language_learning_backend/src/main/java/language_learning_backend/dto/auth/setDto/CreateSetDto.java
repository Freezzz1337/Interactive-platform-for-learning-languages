package language_learning_backend.dto.auth.setDto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CreateSetDto {
    private String name;
    private String description;
    private boolean isVisible;
    List<CreateWordDto> createWordDtoList;
}
