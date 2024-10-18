package com.gt.crud.curd.service;

import com.gt.crud.curd.entity.Mascota;
import com.gt.crud.curd.repository.IMascotaRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MascotaServiceImpl implements IMascotaService {

    private final IMascotaRepository iMascotaRepository;

    @Transactional
    @Override
    public Mascota create(Mascota mascota) {
        Mascota create = Mascota.builder()
                .nombre(mascota.getNombre())
                .tipo(mascota.getTipo())
                .raza(mascota.getRaza())
                .estado(true)
                .build();
        return iMascotaRepository.save(create);
    }

    @Transactional
    @Override
    public Mascota update(Mascota mascota) {
        Optional<Mascota> existingMascota = iMascotaRepository.findById(mascota.getMascotaId());
        if (existingMascota.isPresent()) {
            Mascota updated = existingMascota.get();
            updated.setNombre(mascota.getNombre());
            updated.setTipo(mascota.getTipo());
            updated.setRaza(mascota.getRaza());
            return iMascotaRepository.save(updated);
        } else {
            throw new RuntimeException("Mascota no encontrada con el ID: " + mascota.getMascotaId());
        }
    }

    @Transactional
    @Override
    public void delete(Long mascotaId) {
        iMascotaRepository.deleteById(mascotaId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Mascota> list() {
        return iMascotaRepository.findByEstadoTrue();
    }
}
