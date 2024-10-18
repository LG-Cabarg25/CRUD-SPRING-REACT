package com.gt.crud.curd.repository;

import com.gt.crud.curd.entity.Mascota;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMascotaRepository extends JpaRepository<Mascota, Long> {

    List<Mascota> findByEstadoTrue();
}
