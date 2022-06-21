import { z } from 'zod'

/**
 * Override des messages par défaut de Zod
 *
 * @param issue
 * @param ctx
 */
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'number') {
      return { message: 'Doit être un nombre' }
    }
    if (issue.expected === 'string') {
      return { message: 'Doit être une chaîne de caractères' }
    }
  }
  return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap)

export default z
