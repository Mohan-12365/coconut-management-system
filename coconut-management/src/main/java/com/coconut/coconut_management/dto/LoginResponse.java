package com.coconut.coconut_management.dto;

public class LoginResponse {

    private String role;
    private Long labourId;
    private String token;

    public LoginResponse(String role, Long labourId, String token) {
        this.role = role;
        this.labourId = labourId;
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public Long getLabourId() {
        return labourId;
    }

    public String getToken() {
        return token;
    }
}
