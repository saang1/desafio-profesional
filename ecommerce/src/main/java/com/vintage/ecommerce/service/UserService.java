package com.vintage.ecommerce.service;

import com.vintage.ecommerce.user.User;

public interface UserService {
    User getUserByUsername(String username);
}
