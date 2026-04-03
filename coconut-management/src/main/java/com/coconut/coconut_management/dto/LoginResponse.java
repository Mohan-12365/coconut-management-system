public class LoginResponse {
    private String role;
    private Long labourId;
    private String token;

    public LoginResponse(String role, Long labourId, String token) {
        this.role = role;
        this.labourId = labourId;
        this.token = token;
    }

    // getters
}
