package language_learning_backend.controllers;

import language_learning_backend.dto.auth.ResponseMessageDto;
import language_learning_backend.dto.auth.setDto.*;
import language_learning_backend.models.CreateSet;
import language_learning_backend.services.SetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<GetSetByIdDto> getSet(@PathVariable Long id) {
        return ResponseEntity.ok(setService.getSetById(id));
    }

    @GetMapping("/get")
    public ResponseEntity<GetListSetDTO> getSets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(setService.getSets(page, size));
    }

    @GetMapping("/getAllByFolder/{id}")
    public ResponseEntity<GetAllSetsByFolderDto> getSetsByFolder(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "0") int size
    ) {
        return ResponseEntity.ok(setService.getAllByFolder(id, page, size));
    }

    @GetMapping("/getAllNotInFolder/{id}")
    public ResponseEntity<List<SetDto>> getSetsByFolderNotInFolder(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "0") int size
    ) {
        return ResponseEntity.ok(setService.getSetsByFolderNotInFolder(id, page, size));
    }

    @PostMapping("/addSetsToFolder")
    public ResponseEntity<ResponseMessageDto> addSetsToFolder(@RequestBody SetIdsDto setIdsDto) {
        setService.addSetsToFolder(setIdsDto);
        return ResponseEntity.ok(new ResponseMessageDto("Sets added successfully"));
    }
}
