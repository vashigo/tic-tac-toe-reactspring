package edu.escuelaing.arsw.tictactoeReact.repository;

import edu.escuelaing.arsw.tictactoeReact.model.Tictactoe;
import org.springframework.data.mongodb.repository.MongoRepository;
/**
 *
 * @author Vashi
 */
public interface TictactoeRepository extends MongoRepository<Tictactoe, String>{
    
}
