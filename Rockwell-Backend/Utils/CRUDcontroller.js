// Centralized CRUD controller for all models
export class CRUDcontroller {
  constructor(model) {
    this.model = model;
  }

  async find(res, query) {
    try {
      const queriedres = await this.model.find(query);
      return res.json(queriedres).status(200);
    } catch (error) {
      return res.json({ message: error.message }).status(500);
    }
  }

  async findbyid(res, id) {
    try {
      const queriedres = await this.model.findById(id);
      return res.json(queriedres).status(200);
    } catch (error) {
      return res.json({ message: error.message }).status(500);
    }
  }
  async create(res, document) {
    try {
      const createdoc = await this.model.create(document);
      return res.json(createdoc).status(201);
    } catch (error) {
      return res.json({ message: error.message }).status(500);
    }
  }

  async put(res, id, document) {
    try {
      const queriedres = await this.model.findByIdAndUpdate(id, document);
      return res.json(queriedres).status(200);
    } catch (error) {
      return res.json({ message: error.message }).status(500);
    }
  }

  async delete(res, id) {
    try {
      const queriedres = await this.model.findByIdAndDelete(id);
      return res.json(queriedres).status(200);
    } catch (error) {
      return res.json({ message: error.message }).status(500);
    }
  }
}
