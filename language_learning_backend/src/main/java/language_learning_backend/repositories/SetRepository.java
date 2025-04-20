package language_learning_backend.repositories;

import language_learning_backend.models.CreateSet;
import language_learning_backend.models.Folder;
import language_learning_backend.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface SetRepository extends JpaRepository<CreateSet, Long> {

    List<CreateSet> findAllByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    List<CreateSet> findAllByFoldersOrderByCreatedAtDesc(Set<Folder> folder, Pageable pageable);
    long countAllByUser(User user);
    long countAllByFoldersId(long folderId);
}
