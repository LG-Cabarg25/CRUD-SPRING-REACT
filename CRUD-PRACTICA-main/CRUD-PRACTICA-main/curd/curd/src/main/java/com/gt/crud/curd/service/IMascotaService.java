package com.gt.crud.curd.service;

import com.gt.crud.curd.entity.Mascota;
import java.util.List;

public interface IMascotaService {
    
    Mascota create (Mascota mascota);
    
    Mascota update (Mascota mascota);
    
    void delete (Long mascotaId);
    
    List<Mascota> list();
}
