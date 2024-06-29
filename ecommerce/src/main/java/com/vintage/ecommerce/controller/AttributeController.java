package com.vintage.ecommerce.controller;

import com.vintage.ecommerce.dto.AttributeDto;
import com.vintage.ecommerce.service.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attributes")
@RequiredArgsConstructor
public class AttributeController {
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
    public ResponseEntity<AttributeDto> addAttribute(@RequestBody AttributeDto attributeDto) {
        return ResponseEntity.ok(attributeService.addAttribute(attributeDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttributeDto> updateAttribute(@PathVariable Integer id, @RequestBody AttributeDto attributeDto) {
        return ResponseEntity.ok(attributeService.updateAttribute(id, attributeDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttribute(@PathVariable Integer id) {
        attributeService.deleteAttribute(id);
        return ResponseEntity.noContent().build();
    }
}

