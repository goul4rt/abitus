import * as yup from "yup"

const today = new Date()

export const reportFormSchema = yup.object().shape({
  informacao: yup
    .string()
    .required("Por favor, informe o que você sabe sobre esta pessoa")
    .min(10, "Forneça uma descrição mais detalhada (mínimo 10 caracteres)"),
  data: yup
    .string()
    .required("Por favor, informe a data da visualização")
    .test('is-not-future', "A data não pode ser futura", (value) => {
      if (!value) return true
      const date = new Date(value)
      return date <= today
    }),
  descricao: yup.string().when("$hasFiles", {
    is: true,
    then: (schema) => 
      schema
        .required("Por favor, descreva os anexos")
        .min(5, "Forneça uma descrição mais detalhada (mínimo 5 caracteres)"),
    otherwise: (schema) => schema.nullable()
  })
}) 