package com.example.demo.controller;

import com.example.demo.dto.ContactRequest;
import com.example.demo.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // SAFE for portfolio
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<String> submitContact(
            @Valid @RequestBody ContactRequest request
    ) {
        contactService.sendMessage(
                request.getName(),
                request.getEmail(),
                request.getMessage()
        );

        return ResponseEntity.ok("Message sent successfully!");
    }
}
