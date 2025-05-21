'use client'

import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomInput } from '../layout/custom-input'
import { Button } from '../ui/button'

const schema = z.object({
  email: z.string().email('E-mail inválido'),
})

type FormData = z.infer<typeof schema>

type Props = {
  onValidate: (hasEmail: boolean, email: string) => void
}

export const LoginAreaStepEmail = ({ onValidate }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleButton = async ({ email }: FormData) => {
    const emailReq = await api.post('/auth/validate_email', {
      email,
    })

    onValidate(!!emailReq.data.exists, email)
  }

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleButton)}
      >
        <p>Digite o seu e-mail</p>
        <CustomInput
          errors={errors.email?.message}
          disabled={isSubmitting}
          type="email"
          {...register('email', { required: true })}
        />
        <Button disabled={isSubmitting}>Continuar</Button>
      </form>
    </>
  )
}
