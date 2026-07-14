package com.example.demo.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(String name, String email, String message) {

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("devesh.dhanwani2005@gmail.com");
        mail.setReplyTo(email);
        mail.setSubject("📩 New Contact Message from Portfolio");

        mail.setText(
                "Name: " + name + "\n" +
                        "Email: " + email + "\n\n" +
                        "Message:\n" + message
        );

        mailSender.send(mail);
    }
}
