package language_learning_backend.dto.auth.setDto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class GetListSetDTO {
    private List<SetDto> setDtoList;
    @JsonProperty("isLastPage")
    private boolean isLastPage;
}
