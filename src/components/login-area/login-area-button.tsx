'use client'

import { useAuth } from '@/stores/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  initialState: boolean
}

export const LoginAreaButton = ({ initialState }: Props) => {
  const auth = useAuth()
  const [authState, setAuthState] = useState<boolean>(initialState)

  useEffect(() => {
    setAuthState(!!auth.token)
  }, [auth])

  const handleLogout = () => {
    auth.setToken(null)
  }

  if (authState) {
    return (
      <>
        <Link href="/pedidos">
          <Button>Meus Pedidos</Button>
        </Link>
        <Button onClick={handleLogout}>Sair</Button>
      </>
    )
  } else {
    return <Button onClick={() => auth.setOpen(true)}>Login / Cadastro</Button>
  }
}
