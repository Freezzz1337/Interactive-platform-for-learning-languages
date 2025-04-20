package language_learning_backend.dto.auth.setDto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SetIdsDto {
    long folderId;
    List<Long> setIds;
}
