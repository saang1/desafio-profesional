package com.vintage.ecommerce.config;

import com.vintage.ecommerce.jwt.JwtAuthenticationFilter;
import com.vintage.ecommerce.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf ->
                        csrf.disable())
                .authorizeHttpRequests(authRequest ->
                                authRequest
                                        .requestMatchers("/auth/**").permitAll()
                                        .requestMatchers("/api/products").permitAll()
                                        .requestMatchers("/api/attributes").permitAll()
                                        .requestMatchers("/api/products/search").permitAll()
                                        .requestMatchers("/api/products/suggestions").permitAll()
                                        .requestMatchers("/api/reservation/**").permitAll()
                                        .requestMatchers("/api/reservation/available/**").permitAll()
                                        .requestMatchers("/api/favorites/**").permitAll()
                                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                        .requestMatchers("/api/user/list/").hasRole("ADMIN")
                                        .requestMatchers("/api/user/list/{id}/role").hasRole("ADMIN")

                                        .anyRequest().authenticated()
                                )
                        .sessionManagement(sessionManager ->
                                sessionManager
                                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .authenticationProvider(authProvider)
                        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                        .build();

    }



}

