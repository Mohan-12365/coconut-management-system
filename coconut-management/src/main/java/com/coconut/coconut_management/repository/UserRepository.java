package com.coconut.coconut_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coconut.coconut_management.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsernameAndPassword(String username, String password);
}
