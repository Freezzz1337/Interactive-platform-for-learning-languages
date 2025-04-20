package language_learning_backend.services;

import language_learning_backend.dto.auth.setDto.*;
import language_learning_backend.models.CreateSet;
import language_learning_backend.models.User;
import language_learning_backend.repositories.FolderRepository;
import language_learning_backend.repositories.SetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class SetService {
    private final SetRepository setRepository;
    private final WordService wordService;
    private final FolderService folderService;
    private final FolderRepository folderRepository;


    @Autowired
    public SetService(SetRepository setRepository, WordService wordService, FolderService folderService, FolderRepository folderRepository) {
        this.setRepository = setRepository;
        this.wordService = wordService;
        this.folderService = folderService;
        this.folderRepository = folderRepository;
    }

    @Transactional
    public Long create(CreateSetDto createSetDto) {
        User user = getCurrentUser();

        CreateSet newCreateSet = CreateSet.builder()
                .name(createSetDto.getName())
                .description(createSetDto.getDescription())
                .isVisible(createSetDto.isVisible())
                .user(user)
                .folders(null)
                .build();

        setRepository.save(newCreateSet);
        wordService.create(createSetDto.getWords(), newCreateSet.getId());

        return newCreateSet.getId();
    }

    public GetSetByIdDto getSetById(Long id) {
        CreateSet createSet = setRepository.findById(id).get();
        return GetSetByIdDto.builder()
                .name(createSet.getName())
                .description(createSet.getDescription())
                .isVisible(createSet.isVisible())
                .wordList(createSet.getWordList())
                .build();
    }

    public GetListSetDTO getSets(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        List<SetDto> setDtoList = setRepository.findAllByUserOrderByCreatedAtDesc(getCurrentUser(), pageable).stream()
                .sorted(Comparator.comparing(CreateSet::getCreatedAt).reversed())
                .map(set -> SetDto.builder()
                        .id(set.getId())
                        .setName(set.getName())
                        .numberOfWords(set.getWordList().size())
                        .nameOfCreator(set.getUser().getName())
                        .createdAt(set.getCreatedAt())
                        .build())
                .toList();

        return GetListSetDTO.builder()
                .setDtoList(setDtoList)
                .isLastPage(isLastPageByUser(page, size))
                .build();
    }

    public GetAllSetsByFolderDto getAllByFolder(long folderId, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        return GetAllSetsByFolderDto.builder()
                .folderName(folderService.getFolderNameById(folderId))
                .isLastPage(isLastPageByFolder(page, size, folderId))
                .sets(setRepository.findAllByFoldersOrderByCreatedAtDesc(Set.of(folderRepository.findFolderById(folderId)), pageable).stream()
                        .sorted(Comparator.comparing(CreateSet::getCreatedAt).reversed())
                        .map(set -> SetDto.builder()
                                .id(set.getId())
                                .setName(set.getName())
                                .numberOfWords(set.getWordList().size())
                                .nameOfCreator(set.getUser().getName())
                                .createdAt(set.getCreatedAt())
                                .build())
                        .toList())
                .build();
    }

    public List<SetDto> getSetsByFolderNotInFolder(long folderId, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        List<CreateSet> createSetList = setRepository.findAllByUserOrderByCreatedAtDesc(getCurrentUser(), pageable).stream()
                .filter(set -> set.getFolders().stream().noneMatch(folder -> folder.getId() == folderId))
                .toList();

        if (createSetList.isEmpty()) {
            return Collections.emptyList();
        } else {
            return createSetList.stream()
                    .sorted(Comparator.comparing(CreateSet::getCreatedAt).reversed())
                    .map(set -> SetDto.builder()
                            .id(set.getId())
                            .setName(set.getName())
                            .numberOfWords(set.getWordList().size())
                            .nameOfCreator(set.getUser().getName())
                            .createdAt(set.getCreatedAt())
                            .build())
                    .toList();
        }
    }

    @Transactional
    public void addSetsToFolder(SetIdsDto setIdsDto) {
        for (Long e : setIdsDto.getSetIds()) {
            CreateSet createSet = setRepository.findById(e).get();
            createSet.getFolders().add(folderRepository.findFolderById(setIdsDto.getFolderId()));
            setRepository.save(createSet);
        }
    }

    private boolean isLastPageByUser(int page, int size) {
        long listsCount = setRepository.countAllByUser(getCurrentUser());
        long totalPages = (long) Math.ceil((double) listsCount / size);
        return page + 1 >= totalPages;
    }

    private boolean isLastPageByFolder(int page, int size, long folderId) {
        long listsCount = setRepository.countAllByFoldersId(folderId);
        long totalPages = (long) Math.ceil((double) listsCount / size);
        return page + 1 >= totalPages;
    }


    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}