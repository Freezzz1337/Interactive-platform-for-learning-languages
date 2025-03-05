package language_learning_backend.services;

import language_learning_backend.dto.auth.setDto.CreateSetDto;
import language_learning_backend.dto.auth.setDto.GetListSetDTO;
import language_learning_backend.dto.auth.setDto.SetDto;
import language_learning_backend.models.Set;
import language_learning_backend.models.User;
import language_learning_backend.repositories.SetRepository;
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
public class SetService {
    private final SetRepository setRepository;
    private final WordService wordService;


    @Autowired
    public SetService(SetRepository setRepository, WordService wordService) {
        this.setRepository = setRepository;
        this.wordService = wordService;
    }

    @Transactional
    public Long create(CreateSetDto createSetDto) {
        User user = getCurrentUser();

        Set newSet = Set.builder()
                .name(createSetDto.getName())
                .description(createSetDto.getDescription())
                .isVisible(createSetDto.isVisible())
                .user(user)
                .folderId(null)
                .build();

        setRepository.save(newSet);
        wordService.create(createSetDto.getWords(), newSet.getId());

        return newSet.getId();
    }

    public Set getSetById(Long id) {
        return setRepository.findById(id).get();
    }

    public GetListSetDTO getSets(int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        List<SetDto> setDtoList = setRepository.findAllByUserOrderByCreatedAtDesc(getCurrentUser(), pageable).stream()
                .sorted(Comparator.comparing(Set::getCreatedAt).reversed())
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
                .isLastPage(isLastPage(page, size))
                .build();
    }

    private boolean isLastPage(int page, int size) {
        long listsCount = setRepository.countAllByUser(getCurrentUser());
        long totalPages = (long) Math.ceil((double) listsCount / size);
        return page + 1 >= totalPages;
    }


    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}