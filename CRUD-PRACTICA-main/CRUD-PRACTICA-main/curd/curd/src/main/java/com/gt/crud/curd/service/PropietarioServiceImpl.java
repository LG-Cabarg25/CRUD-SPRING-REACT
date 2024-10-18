package com.gt.crud.curd.service;

import com.gt.crud.curd.entity.Mascota;
import com.gt.crud.curd.entity.Propietario;
import com.gt.crud.curd.repository.IMascotaRepository;
import com.gt.crud.curd.repository.IPropietarioRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PropietarioServiceImpl implements IPropietarioService {

    private final IPropietarioRepository iPropietarioRepository;
    private final IMascotaRepository iMascotaRepository;

    @Transactional
    @Override
    public Propietario create(Propietario propietario) {
        // Buscar la mascota asociada
        Optional<Mascota> mascotaOpt = iMascotaRepository.findById(propietario.getMascota().getMascotaId());

        if (mascotaOpt.isPresent()) {
            Mascota mascota = mascotaOpt.get();
            // Cambiar el estado de la mascota a false
            mascota.setEstado(false);
            iMascotaRepository.save(mascota);

            // Crear y guardar el propietario
            Propietario create = Propietario.builder()
                    .nombreCompleto(propietario.getNombreCompleto())
                    .direccion(propietario.getDireccion())
                    .correoElectronico(propietario.getCorreoElectronico())
                    .mascota(mascota) // Asociar la mascota actualizada
                    .build();
            return iPropietarioRepository.save(create);
        } else {
            throw new RuntimeException("Mascota no encontrada con el ID: " + propietario.getMascota().getMascotaId());
        }
    }

    @Transactional
    @Override
    public Propietario update(Propietario propietario) {
        Optional<Propietario> existingPropietario = iPropietarioRepository.findById(propietario.getPropietarioId());

        if (existingPropietario.isPresent()) {
            Propietario updated = existingPropietario.get();
            updated.setNombreCompleto(propietario.getNombreCompleto());
            updated.setDireccion(propietario.getDireccion());
            updated.setCorreoElectronico(propietario.getCorreoElectronico());

            // Si la mascota cambia, debemos actualizarla también
            Optional<Mascota> mascotaOpt = iMascotaRepository.findById(propietario.getMascota().getMascotaId());
            if (mascotaOpt.isPresent()) {
                Mascota mascota = mascotaOpt.get();
                mascota.setEstado(false);  // Cambiar el estado de la nueva mascota a false
                iMascotaRepository.save(mascota);
                updated.setMascota(mascota);
            }
            return iPropietarioRepository.save(updated);
        } else {
            throw new RuntimeException("Propietario no encontrado con el ID: " + propietario.getPropietarioId());
        }
    }

    @Transactional
    @Override
    public void delete(Long propietarioId) {
        Optional<Propietario> propietarioOpt = iPropietarioRepository.findById(propietarioId);
        if (propietarioOpt.isPresent()) {
            iPropietarioRepository.deleteById(propietarioId);
        } else {
            throw new RuntimeException("Propietario no encontrado con el ID: " + propietarioId);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public List<Propietario> list() {
        return iPropietarioRepository.findAll();
    }
}
