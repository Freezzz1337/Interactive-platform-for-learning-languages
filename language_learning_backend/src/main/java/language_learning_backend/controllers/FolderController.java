package language_learning_backend.controllers;

import language_learning_backend.dto.auth.folderDto.CreateFolderDto;
import language_learning_backend.models.Folder;
import language_learning_backend.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
