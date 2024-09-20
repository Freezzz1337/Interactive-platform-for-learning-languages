package language_learning_backend.util;

public class UserWithThisEmailAlreadyExistsException extends RuntimeException{
    public UserWithThisEmailAlreadyExistsException() {
        super("Email already taken");
    }
}

