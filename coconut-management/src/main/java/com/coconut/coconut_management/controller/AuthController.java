import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.beans.factory.annotation.Autowired;

import com.coconut.coconut_management.repository.LabourRepository;
import com.coconut.coconut_management.entity.Labour;

import java.util.Optional;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private LabourRepository labourRepo;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        // 👨‍💼 ADMIN LOGIN
        if (request.getUsername().equals("admin") &&
            request.getPassword().equals("admin123")) {

            return new LoginResponse("ADMIN", null, "admin-token");
        }

        // 👷 LABOUR LOGIN
        Labour labour = labourRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!labour.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse("LABOUR", labour.getId(), "labour-token");
    }
}
