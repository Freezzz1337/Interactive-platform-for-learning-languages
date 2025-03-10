package language_learning_backend.controllers;

import language_learning_backend.dto.auth.folderDto.CreateFolderDto;
import language_learning_backend.dto.auth.folderDto.GetListFolderDto;
import language_learning_backend.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/folder")
public class FolderController {
    private final FolderService folderService;

    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createFolder(@RequestBody CreateFolderDto createFolderDto) {
        folderService.createFolder(createFolderDto);
        return ResponseEntity.ok(Map.of("message", "Folder created"));
    }

    @GetMapping("/get")
    public ResponseEntity<GetListFolderDto> getFolders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(folderService.getListFolder(page, size));
    }

}
