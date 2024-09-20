package language_learning_backend.util;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String searchLine) {
        super("User with this name \"" + searchLine + "\" was not found");
    }
}
