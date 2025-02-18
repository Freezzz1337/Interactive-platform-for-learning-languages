package language_learning_backend.services;

import language_learning_backend.dto.auth.setDto.CreateSetDto;
import language_learning_backend.models.Set;
import language_learning_backend.repositories.SetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Set newSet = Set.builder()
                .name(createSetDto.getName())
                .description(createSetDto.getDescription())
                .isVisible(createSetDto.isVisible())
                .folderId(null)
                .build();

        setRepository.save(newSet);
        wordService.create(createSetDto.getWords(),newSet.getId());

        return newSet.getId();
    }
}
