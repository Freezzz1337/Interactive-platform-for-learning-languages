package language_learning_backend.services;

import language_learning_backend.dto.auth.folderDto.CreateFolderDto;
import language_learning_backend.models.Folder;
import language_learning_backend.repositories.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class FolderService {
    private final FolderRepository folderRepository;

    @Autowired
    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    @Transactional
    public void createFolder(CreateFolderDto createFolderDto) {
        Folder newFolder = Folder.builder()
                .name(createFolderDto.getFolderName())
                .build();

        folderRepository.save(newFolder);
    }
}
