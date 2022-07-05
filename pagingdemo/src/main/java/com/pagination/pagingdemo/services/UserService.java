package com.pagination.pagingdemo.services;

import org.springframework.data.domain.Page;

import com.pagination.pagingdemo.domain.User;

public interface UserService {
    Page<User> getUsers(String name, int page, int size);

}
