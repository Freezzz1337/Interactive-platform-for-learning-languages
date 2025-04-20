package language_learning_backend.dto.auth.setDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GetAllSetsByFolderDto {
    private String folderName;
    private List<SetDto> sets;
    @JsonProperty("isLastPage")
    private boolean isLastPage;
}
