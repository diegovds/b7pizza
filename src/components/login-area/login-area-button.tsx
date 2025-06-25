'use client'

import { useAuth } from '@/stores/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  initialState: boolean
}

export const LoginAreaButton = ({ initialState }: Props) => {
  const router = useRouter()
  const auth = useAuth()
  const [authState, setAuthState] = useState<boolean>(initialState)

  useEffect(() => {
    setAuthState(!!auth.token)
  }, [auth])

  const handleLogout = () => {
    auth.setToken(null)
    router.refresh()
  }

  if (authState) {
    return (
      <>
        <Link href="/orders">
          <Button>Meus Pedidos</Button>
        </Link>
        <Button onClick={handleLogout}>Sair</Button>
      </>
    )
  } else {
    return <Button onClick={() => auth.setOpen(true)}>Login / Cadastro</Button>
  }
}
