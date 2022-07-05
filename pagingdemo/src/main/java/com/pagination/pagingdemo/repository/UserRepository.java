package com.pagination.pagingdemo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.pagination.pagingdemo.domain.User;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    Page<User> findByNameContaining(String name, PageRequest pageRequest);
}
