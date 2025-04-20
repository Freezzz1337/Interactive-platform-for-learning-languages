package language_learning_backend.controllers;

import language_learning_backend.dto.auth.ResponseMessageDto;
import language_learning_backend.dto.auth.folderDto.CreateFolderDto;
import language_learning_backend.dto.auth.folderDto.EditFolderNameDto;
import language_learning_backend.dto.auth.folderDto.GetListFolderDto;
import language_learning_backend.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/folder")
public class FolderController {
    private final FolderService folderService;

    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseMessageDto> createFolder(@RequestBody CreateFolderDto createFolderDto) {
        folderService.createFolder(createFolderDto);
        return ResponseEntity.ok(new ResponseMessageDto("Folder created"));
    }

    @GetMapping("/get")
    public ResponseEntity<GetListFolderDto> getFolders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(folderService.getListFolder(page, size));
    }

    @PatchMapping("/editName")
    public ResponseEntity<ResponseMessageDto> editFolderName(@RequestBody EditFolderNameDto editFolderNameDto) {
        folderService.editFolderName(editFolderNameDto);
        return ResponseEntity.ok(new ResponseMessageDto("Edit folder name"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseMessageDto> deleteFolder(@PathVariable long id) {
        folderService.deleteFolder(id);
        return ResponseEntity.ok(new ResponseMessageDto("Delete folder"));
    }

    @DeleteMapping("/deleteSetFromFolder")
    public ResponseEntity<ResponseMessageDto> deleteSetFromFolder(
            @RequestParam(defaultValue = "0") long folderId,
            @RequestParam(defaultValue = "0") long setId
    ) {
        folderService.deleteSetFromFolder(folderId, setId);
        return ResponseEntity.ok(new ResponseMessageDto("Delete set from folder"));
    }
}
