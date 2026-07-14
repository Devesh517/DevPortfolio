package com.example.demo.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final EmailService emailService;

    public ContactService(EmailService emailService) {
        this.emailService = emailService;
    }

    @Async
    public void sendMessage(String name, String email, String message) {
        emailService.sendContactEmail(name, email, message);
    }
}
