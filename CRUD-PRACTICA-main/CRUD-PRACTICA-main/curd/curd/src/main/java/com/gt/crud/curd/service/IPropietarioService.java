package com.gt.crud.curd.service;

import com.gt.crud.curd.entity.Propietario;
import java.util.List;

public interface IPropietarioService {
    
    Propietario create (Propietario propietario);
    
    Propietario update (Propietario propietario);
    
    void delete (Long mascotaId);
    
    List<Propietario> list();
}
