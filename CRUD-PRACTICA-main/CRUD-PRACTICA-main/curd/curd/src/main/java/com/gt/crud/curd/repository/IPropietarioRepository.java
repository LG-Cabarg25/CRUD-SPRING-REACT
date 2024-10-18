package com.gt.crud.curd.repository;

import com.gt.crud.curd.entity.Propietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPropietarioRepository extends JpaRepository<Propietario, Long> {

}
