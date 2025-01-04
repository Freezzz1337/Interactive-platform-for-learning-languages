package language_learning_backend.controllers;

import language_learning_backend.dto.auth.LoginDto;
import language_learning_backend.dto.auth.LoginResponseDto;
import language_learning_backend.dto.auth.RegisterDto;
import language_learning_backend.dto.auth.RegisterResponseDto;
import language_learning_backend.models.User;
import language_learning_backend.services.AuthenticationService;
import language_learning_backend.services.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterDto registerDto) {
        authenticationService.signup(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponseDto());
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticate(@RequestBody LoginDto loginDto) {
        User authenticatedUser = authenticationService.authenticate(loginDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setToken(jwtToken);
        loginResponseDto.setExpiresIn(jwtService.getExpirationTime());
        loginResponseDto.setUserType(String.valueOf(authenticatedUser.getUserType()));

        return ResponseEntity.ok(loginResponseDto);
    }
}
