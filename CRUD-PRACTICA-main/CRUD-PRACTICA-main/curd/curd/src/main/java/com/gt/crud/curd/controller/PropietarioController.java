package com.gt.crud.curd.controller;

import com.gt.crud.curd.entity.Propietario;
import com.gt.crud.curd.service.PropietarioServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/propietarios")
@RequiredArgsConstructor
public class PropietarioController {
    
    private final PropietarioServiceImpl propietarioService;

    @PostMapping
    public ResponseEntity<Propietario> create(@RequestBody Propietario propietario) {
        Propietario newPropietario = propietarioService.create(propietario);
        return new ResponseEntity<>(newPropietario, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Propietario> update(@PathVariable Long id, @RequestBody Propietario propietario) {
        propietario.setPropietarioId(id);  // Aseguramos que el ID del propietario se establece correctamente
        Propietario updatedPropietario = propietarioService.update(propietario);
        return new ResponseEntity<>(updatedPropietario, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        propietarioService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Propietario>> list() {
        List<Propietario> propietarios = propietarioService.list();
        return new ResponseEntity<>(propietarios, HttpStatus.OK);
    }
}
