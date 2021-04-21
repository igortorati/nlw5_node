import { Repository, EntityRepository } from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export { SettingsRepository }

// Cuida da comunicação entre as entidades e as tabelas do banco de dados.