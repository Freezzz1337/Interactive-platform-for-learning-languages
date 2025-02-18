package language_learning_backend.services;

import language_learning_backend.dto.auth.setDto.CreateWordDto;
import language_learning_backend.models.Word;
import language_learning_backend.repositories.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class WordService {
    private final WordRepository wordRepository;

    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @Transactional
    public void create(List<CreateWordDto> dtoList, long setId) {
        dtoList.forEach(a -> wordRepository.save(Word.builder()
                .wordSource(a.getWordSource())
                .wordTarget(a.getWordTarget())
                .setId(setId)
                .build()));
    }
}
