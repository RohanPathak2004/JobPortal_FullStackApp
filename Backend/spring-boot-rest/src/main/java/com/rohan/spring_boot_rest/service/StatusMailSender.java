package com.rohan.spring_boot_rest.service;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class StatusMailSender {


    private final JavaMailSender mailSender;

    public StatusMailSender(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    @Async
    public void sendStatusMail(String toMail,String name,String status,String jobTitle){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toMail);
        if ("accept".equalsIgnoreCase(status)) {
           sendAcceptanceEmail(toMail,name,jobTitle,message);
        } else {
            sendRejectionEmail(toMail,name,jobTitle,message);
        }

        mailSender.send(message);
    }

    public void sendAcceptanceEmail(String toEmail, String candidateName, String jobTitle,SimpleMailMessage message) {
        message.setTo(toEmail);
        message.setSubject("Interview Invitation: " + jobTitle + " role at [Your Company Name]");

        String body = "Dear " + candidateName + ",\n\n" +
                "Thank you for your interest in the " + jobTitle + " position at [Your Company Name].\n\n" +
                "Our hiring team has reviewed your application and we are very impressed with your background and experience. " +
                "We would like to invite you for an interview to discuss how your skills align with our current needs.\n\n" +
                "NEXT STEPS:\n" +
                "Please log in to your candidate dashboard at [Portal Link] to select a convenient time slot for your initial technical round. " +
                "Alternatively, our HR team will reach out to you shortly via phone to coordinate the schedule.\n\n" +
                "We look forward to speaking with you!\n\n" +
                "Best Regards,\n" +
                "The Recruitment Team\n" +
                "[Your Company Name]";

        message.setText(body);
    }

    private void sendRejectionEmail(String toEmail, String candidateName, String jobTitle,SimpleMailMessage message) {
        message.setTo(toEmail);
        message.setSubject("Update regarding your application for " + jobTitle);

        String body = "Dear " + candidateName + ",\n\n" +
                "Thank you for giving us the opportunity to review your application for the " + jobTitle + " position.\n\n" +
                "After careful consideration, we have decided to move forward with other candidates whose qualifications " +
                "more closely match our current requirements. Please note that this decision is specific to this role and " +
                "does not reflect your potential for future openings at [Your Company Name].\n\n" +
                "We truly appreciate the time you invested in applying and wish you the very best in your professional journey. " +
                "We will keep your resume in our database and may reach out if a role better suited to your profile becomes available.\n\n" +
                "Sincerely,\n" +
                "Talent Acquisition Team\n" +
                "[Your Company Name]";

        message.setText(body);
    }
}
