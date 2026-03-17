package com.coconut.coconut_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.coconut.coconut_management.entity.User;
import com.coconut.coconut_management.repository.UserRepository;

@RestController
@CrossOrigin(origins = "https://secure-login-hxjn7im0b-mohan-prasanths-projects.vercel.app/")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {

        User user = userRepository
                .findByUsernameAndPassword(
                        loginRequest.getUsername(),
                        loginRequest.getPassword());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }

        return ResponseEntity.ok(user);
    }
}
