package language_learning_backend.dto.auth.folderDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FolderDto {
    private long id;
    private String name ;
    private int numberOfItems;
}
