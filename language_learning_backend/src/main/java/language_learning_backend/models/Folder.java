package language_learning_backend.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "folder")
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folder_id")
    private long id;

    @Column(name = "name")
    private String name;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private List<Set> setList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
