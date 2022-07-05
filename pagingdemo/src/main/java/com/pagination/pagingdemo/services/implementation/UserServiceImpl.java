package com.pagination.pagingdemo.services.implementation;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.pagination.pagingdemo.domain.User;
import com.pagination.pagingdemo.repository.UserRepository;
import com.pagination.pagingdemo.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * UserServiceImpl
 */

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Page<User> getUsers(String name, int page, int size) {
        log.info("Fetching users form pages {} of size {}", page, size);
        return userRepository.findByNameContaining(name, PageRequest.of(page, size));
    }

}