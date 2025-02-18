package language_learning_backend.controllers;

import language_learning_backend.dto.auth.setDto.CreateSetDto;
import language_learning_backend.services.SetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/set")
public class SetController {

    private final SetService setService;

    @Autowired
    public SetController(SetService setService) {
        this.setService = setService;
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createSet(@RequestBody CreateSetDto createSetDto) {
        Long id = setService.create(createSetDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
}
