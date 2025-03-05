package language_learning_backend.controllers;

import language_learning_backend.dto.auth.setDto.CreateSetDto;
import language_learning_backend.dto.auth.setDto.GetListSetDTO;
import language_learning_backend.models.Set;
import language_learning_backend.services.SetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<Set> getSet(@PathVariable Long id) {
        return ResponseEntity.ok(setService.getSetById(id));
    }

    @GetMapping("/get")
    public ResponseEntity<GetListSetDTO> getSets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(setService.getSets(page, size));
    }
}
