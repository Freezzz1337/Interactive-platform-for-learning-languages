package language_learning_backend.dto.auth.folderDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditFolderNameDto {
    private Long folderId;
    private String folderName;
}