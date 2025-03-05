package language_learning_backend.repositories;

import language_learning_backend.models.Set;
import language_learning_backend.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetRepository extends JpaRepository<Set, Long> {

    List<Set> findAllByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    long countAllByUser(User user);
}
