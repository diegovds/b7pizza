'use client'

import { api } from '@/lib/axios'
import { useAuth } from '@/stores/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomInput } from '../layout/custom-input'
import { Button } from '../ui/button'

type Props = {
  email: string
}

const schema = z
  .object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no minímo 6 caracteres'),
    passwordConfirm: z
      .string()
      .min(6, 'A senha deve ter no minímo 6 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas precisam ser iguais',
    path: ['passwordConfirm'],
  })

type FormData = z.infer<typeof schema>

export const LoginAreaStepSignup = ({ email }: Props) => {
  const auth = useAuth()

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  setValue('email', email)

  const handleButton = async ({ email, name, password }: FormData) => {
    const signupReq = await api.post('/auth/signup', {
      name,
      email,
      password,
    })

    if (!signupReq.data.token) {
      alert('Ocorreu um erro')
    } else {
      auth.setToken(signupReq.data.token)
      auth.setOpen(false)
    }
  }

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleButton)}
      >
        <div className="flex flex-col gap-2">
          <p>Digite o seu nome</p>
          <CustomInput
            errors={errors.name?.message}
            disabled={isSubmitting}
            type="text"
            {...register('name', { required: true })}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Digite o seu e-mail</p>
          <CustomInput
            errors={errors.email?.message}
            disabled={isSubmitting}
            type="email"
            {...register('email', { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Digite a senha</p>
          <CustomInput
            errors={errors.password?.message}
            disabled={isSubmitting}
            type="password"
            {...register('password', { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Confirme a senha</p>
          <CustomInput
            errors={errors.passwordConfirm?.message}
            disabled={isSubmitting}
            type="password"
            {...register('passwordConfirm', { required: true })}
          />
        </div>
        <Button disabled={isSubmitting}>Continuar</Button>
      </form>
    </>
  )
}
