package language_learning_backend.repositories;

import language_learning_backend.models.Folder;
import language_learning_backend.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    List<Folder> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);

    long countAllByUser(User user);

    Folder findFolderById(long id);

    @Modifying
    @Query(value = "DELETE FROM set_folder WHERE folder_id = :folderId", nativeQuery = true)
    void deleteFolderAssociation(@Param("folderId") long folderId);


    @Modifying
    @Query(value = "DELETE FROM set_folder WHERE folder_id = :folderId AND set_id = :setId", nativeQuery = true)
    void deleteSetFromFolder(@Param("folderId") long folderId,
                             @Param("setId") long setId);
}
