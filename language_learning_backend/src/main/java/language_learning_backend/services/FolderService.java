package language_learning_backend.services;

import language_learning_backend.dto.auth.folderDto.CreateFolderDto;
import language_learning_backend.dto.auth.folderDto.FolderDto;
import language_learning_backend.dto.auth.folderDto.GetListFolderDto;
import language_learning_backend.models.Folder;
import language_learning_backend.models.User;
import language_learning_backend.repositories.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

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

    public GetListFolderDto getListFolder(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        List<FolderDto> folderDtos = folderRepository.findByUserOrderByCreatedAtDesc(getCurrentUser(), pageable)
                .stream()
                .sorted(Comparator.comparing(Folder::getCreatedAt).reversed())
                .map(folder -> FolderDto.builder()
                        .id(folder.getId())
                        .name(folder.getName())
                        .build())
                .toList();

        return GetListFolderDto.builder()
                .folders(folderDtos)
                .isLastPage(isLastPage(page, size))
                .build();
    }

    private boolean isLastPage(int page, int size) {
        long listsCount = folderRepository.countAllByUser(getCurrentUser());
        long totalPages = (long) Math.ceil((double) listsCount / size);
        return page + 1 >= totalPages;
    }


    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
