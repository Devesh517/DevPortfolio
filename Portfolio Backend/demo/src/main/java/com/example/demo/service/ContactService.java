package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final EmailService emailService;

    public ContactService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void sendMessage(String name, String email, String message) {

        // Send email (primary and only responsibility now)
        emailService.sendContactEmail(name, email, message);
    }
}
