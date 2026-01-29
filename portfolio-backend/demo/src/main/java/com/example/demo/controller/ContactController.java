package com.example.demo.controller;

import com.example.demo.dto.ContactRequest;
import com.example.demo.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(
        origins = {
                "http://localhost:5500",
                "http://127.0.0.1:5500",
                "https://devesh517.github.io"
        }
)
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public String submitContact(@Valid @RequestBody ContactRequest request) {

        emailService.sendContactEmail(
                request.getName(),
                request.getEmail(),
                request.getMessage()
        );

        return "Message sent successfully!";
    }
}
