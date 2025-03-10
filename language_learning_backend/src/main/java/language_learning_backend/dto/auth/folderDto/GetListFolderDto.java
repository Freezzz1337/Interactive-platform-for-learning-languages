package language_learning_backend.dto.auth.folderDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GetListFolderDto {
    List<FolderDto> folders;
    @JsonProperty("isLastPage")
    private boolean isLastPage;
}
