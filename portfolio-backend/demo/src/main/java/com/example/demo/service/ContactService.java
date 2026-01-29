package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final EmailService emailService;

    public ContactService(EmailService emailService) {
        this.emailService = emailService;
    }

    @Async
    public void sendMailAsync(String name, String email, String message) {
        emailService.sendContactEmail(name, email, message);
    }
}
