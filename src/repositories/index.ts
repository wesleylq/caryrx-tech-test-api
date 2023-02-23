import db from "@database"

const repository = {
  findCompanies: async () => {
    return await db.query("SELECT id, name FROM companies", []);
  },

  findCompaniesById: async (id: string) => {
    return await db.query("SELECT name FROM companies WHERE id = ?", [id]);
  },

  findTypes: async () => {
    return await db.query("SELECT type FROM medicines GROUP BY type", []);
  },

  findMedicines: async (from: number, size: number) => {
    return await db.query("SELECT id, name, substance, presentation, type, max_price AS maxPrice \
                            FROM medicines LIMIT ?, ?", [from, size]);
  },

  countMedicines: async () => {
    return await db.query("SELECT COUNT(id) as count FROM medicines", []);
  },

  findMedicinesById: async (id: string) => {
    return await db.query("SELECT * FROM medicines WHERE id = ?", [id]);
  },

  findMedicinesByType: async (type: string, from: number, size: number) => {
    return await db.query("SELECT id, name, substance, presentation, type, max_price AS maxPrice \
                            FROM medicines WHERE type = ? LIMIT ?, ?", [type, from, size]);
  },

  findMedicinesByCompanyId: async (companyId: string, from: number, size: number) => {
    return await db.query("SELECT id, name, substance, presentation, type, max_price AS maxPrice \
                            FROM medicines WHERE company_id = ? LIMIT ?, ?", [companyId, from, size]);
  },

  countMedicinesByCompanyId: async (companyId: string) => {
    return await db.query("SELECT COUNT(id) as count FROM medicines WHERE company_id = ?", [companyId]);
  },

  countMedicinesByType: async (type: string) => {
    return await db.query("SELECT COUNT(type) as count FROM medicines WHERE type = ?", [type]);
  },

  findMedicinesByCompanyIdAndType: async (companyId: string, type: string, from: number, size: number) => {
    return await db.query("SELECT id, name, type, substance, presentation, max_price AS maxPrice \
                            FROM medicines WHERE company_id = ? AND type = ? LIMIT ?, ?", [companyId, type, from, size]);
  },

  countMedicinesByCompanyIdAndType: async (companyId: string, type: string) => {
    return await db.query("SELECT COUNT(id) as count FROM medicines WHERE company_id = ? AND type = ?", [companyId, type]);
  },

  countByType: async () => {
    return await db.query("SELECT type, COUNT(type) AS count FROM medicines GROUP BY type", []);
  },

  averageMedicinesPriceByType: async () => {
    return await db.query("SELECT type,  ROUND(AVG(max_price),2) AS avg FROM medicines GROUP BY type", []);
  },

  findExpensiveMedicines: async () => {
    return await db.query("SELECT id, name as label, max_price as value FROM medicines ORDER BY max_price DESC LIMIT 10", []);
  },
}

export default repository
