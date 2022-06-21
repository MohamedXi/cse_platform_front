import { Agency } from '../../types/entities'
import { AgencyDto } from '../../types/dtos'

/**
 * From domain to API
 * @param agency
 */
export const agencyToDto = (agency: Agency): AgencyDto => ({
  ...agency,
})

/**
 * From domain to API
 * @param agencies
 */
export const agenciesToDto = (agencies: Agency[]): AgencyDto[] => agencies.map(agencyToDto)

/**
 * From API to domain
 * @param agency
 */
export const dtoToAgency = (agency: AgencyDto): Agency => ({ ...agency })

/**
 * From API to domain
 * @param agencies
 */
export const dtosToAgencies = (agencies: AgencyDto[]): Agency[] => agencies.map(dtoToAgency)
