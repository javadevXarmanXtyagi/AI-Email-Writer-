package com.email.writer.byarman.request;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
