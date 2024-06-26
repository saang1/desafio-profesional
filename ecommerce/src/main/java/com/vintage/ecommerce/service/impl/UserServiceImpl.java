package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.user.Role;
import com.vintage.ecommerce.user.User;
import com.vintage.ecommerce.user.UserRepository;
import com.vintage.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUserRole(Integer id, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setRole(Role.valueOf(role)); // Convert String to Role
        return userRepository.save(user);
    }


}
