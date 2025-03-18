import { LevelModel } from "@/lib/models/levelModel";
import { ClassModel } from "@/lib/models/classModel";
import { SubclassModel } from "@/lib/models/subClassModel";
import { RaceModel } from "@/lib/models/raceModel";

export class SheetsService {
  constructor() {
    this.levelModel = new LevelModel();
    this.classModel = new ClassModel();
    this.subclassModel = new SubclassModel();
    this.raceModel = new RaceModel();
  }

  async getLevels() {
    try {
      const levels = await this.levelModel.findAll();

      // Transformação dos dados para o front
      return levels.map((level) => ({
        id: level._id,
        name: level.name,
        value: level.value,
        attributePoints: level.attributePoints,
      }));
    } catch (error) {
      console.error("[SheetsService] - Service error:", error);
      throw new Error(
        "[SheetsService] - Falha ao buscar níveis: " + error.message
      );
    }
  }

  async getClasses() {
    try {
      const classes = await this.classModel.findAll();

      // Transformação dos dados para o front
      return classes.map((class_) => ({
        id: class_._id,
        name: class_.name,
        description: class_.description,
        advantages: class_.advantages,
        disadvantages: class_.disadvantages, 
        receipt: class_.receipt
      }));
    } catch (error) {
      console.error("[SheetsService] - Service error:", error);
      throw new Error(
        "[SheetsService] - Falha ao buscar classes: " + error.message
      );
    }
  }

  async getSubClasses() {
    try {
      const subclasses = await this.subclassModel.findAll();
    
      // Transformação dos dados para o front
      return subclasses.map((subclass_) => ({
        id: subclass_._id,
        name: subclass_.name,
        classId: subclass_.classId,
        description: subclass_.description,
        advantages: subclass_.advantages,
        disadvantages: subclass_.disadvantages, 
      }));
    } catch (error) {
      console.error("[SheetsService] - Service error:", error);
      throw new Error(
        "[SheetsService] - Falha ao buscar subclasses: " + error.message
      );
    }
  }

  async getRaces() {
    try {
        const races = await this.raceModel.findAll();
      
        // Transformação dos dados para o front
        return races.map((race_) => ({
          id: race_._id,
          name: race_.name,
          history: race_.history,
          description: race_.description,
          advantages: race_.advantages,
          disadvantages: race_.disadvantages, 
        }));
      } catch (error) {
        console.error("[SheetsService] - Service error:", error);
        throw new Error(
          "[SheetsService] - Falha ao buscar Raças: " + error.message
        );
      }
  }
}
