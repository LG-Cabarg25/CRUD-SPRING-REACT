package com.gt.crud.curd.controller;

import com.gt.crud.curd.entity.Mascota;
import com.gt.crud.curd.service.MascotaServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mascotas")
@RequiredArgsConstructor
public class MascotaController {

    private final MascotaServiceImpl mascotaService;

    @PostMapping
    public ResponseEntity<Mascota> create(@RequestBody Mascota mascota) {
        Mascota newMascota = mascotaService.create(mascota);
        return new ResponseEntity<>(newMascota, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mascota> update(@PathVariable Long id, @RequestBody Mascota mascota) {
        mascota.setMascotaId(id);  // Aseguramos que el ID de la mascota se establece correctamente
        Mascota updatedMascota = mascotaService.update(mascota);
        return new ResponseEntity<>(updatedMascota, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mascotaService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Mascota>> listActiveMascotas() {
        List<Mascota> mascotasActivas = mascotaService.list();
        return new ResponseEntity<>(mascotasActivas, HttpStatus.OK);
    }
}
