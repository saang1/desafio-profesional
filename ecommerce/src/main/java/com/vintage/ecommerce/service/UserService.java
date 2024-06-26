package com.vintage.ecommerce.service;

import com.vintage.ecommerce.user.User;
import java.util.List;


public interface UserService {
    User getUserByUsername(String username);

    List<User> getAllUsers();

    User updateUserRole(Integer id, String role);
}
