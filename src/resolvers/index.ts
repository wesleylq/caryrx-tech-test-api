import repository from "@repositories/index"
import { ISearchMedicines } from "src/interfaces"

const resolvers = {
  getCompanies: async () => {
    const results = await repository.findCompanies()
    return results
  },

  getTypes: async () => {
    const results = await repository.findTypes()
    return results
  },

  getMedicines: async ({ companyId, type, from, size }: ISearchMedicines) => {
    var results: any = []
    var count: any = []

    if (companyId && type) {
      results = await repository.findMedicinesByCompanyIdAndType(companyId, type, from, size)
      count = await repository.countMedicinesByCompanyIdAndType(companyId, type)
    }

    else if (companyId) {
      results = await repository.findMedicinesByCompanyId(companyId, from, size)
      count = await repository.countMedicinesByCompanyId(companyId)
    }

    else if (type) {
      results = await repository.findMedicinesByType(type, from, size)
      count = await repository.countMedicinesByType(type)
    }

    else {
      results = await repository.findMedicines(from, size)
      count = await repository.countMedicines()
    }
    return { medicines: results, count: count[0].count }
  },

  countMedicinesByType: async () => {
    const results = await repository.countByType()
    return results
  },

  getExpensiveMedicines: async () => {
    const results = await repository.findExpensiveMedicines()
    return results
  },

  averagePriceByType: async () => {
    const results = await repository.averageMedicinesPriceByType()
    return results
  }
}

export default resolvers
