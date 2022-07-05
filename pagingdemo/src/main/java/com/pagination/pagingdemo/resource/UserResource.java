package com.pagination.pagingdemo.resource;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pagination.pagingdemo.domain.HttpResponse;
import com.pagination.pagingdemo.services.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/")
@RequiredArgsConstructor

public class UserResource {

        private final UserService userService;

        @RequestMapping("/users")
        public ResponseEntity<HttpResponse> getUser(@RequestParam Optional<String> name,
                        @RequestParam Optional<Integer> page,
                        @RequestParam Optional<Integer> size) {

                return ResponseEntity.ok()
                                .body(HttpResponse.builder()
                                                .timeStamp(LocalDateTime.now()
                                                                .toString())
                                                .data(Map.of("page",
                                                                userService.getUsers(name.orElse(""), page.orElse(0),
                                                                                size.orElse(10))))
                                                .message("Users Retrived").status(HttpStatus.OK)
                                                .statusCode(HttpStatus.OK.value()).build());
        }
}
