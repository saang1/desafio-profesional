package com.vintage.ecommerce.controller;

import com.vintage.ecommerce.dto.AttributeDto;
import com.vintage.ecommerce.service.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attributes")
@RequiredArgsConstructor
public class AttributeController {

    @Autowired
    private final AttributeService attributeService;

    @GetMapping
    public ResponseEntity<List<AttributeDto>> getAllAttributes() {
        return ResponseEntity.ok(attributeService.getAllAttributes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttributeDto> getAttributeById(@PathVariable Integer id) {
        return ResponseEntity.ok(attributeService.getAttributeById(id));
    }

    @PostMapping
    public ResponseEntity<AttributeDto> addAttribute(
            @RequestParam("name") String name,
            @RequestParam("icon") MultipartFile icon) {
        AttributeDto attributeDto = new AttributeDto();
        attributeDto.setName(name);
        return new ResponseEntity<>(attributeService.addAttribute(attributeDto, icon), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttributeDto> updateAttribute(
            @PathVariable Integer id,
            @ModelAttribute AttributeDto attributeDto,
            @RequestParam("icon") MultipartFile image) {

        // Call the service method
        AttributeDto updatedAttribute = attributeService.updateAttribute(id, attributeDto, image);

        return new ResponseEntity<>(updatedAttribute, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable Integer id) {
        attributeService.deleteAttribute(id);
        return ResponseEntity.noContent().build();
    }
}
