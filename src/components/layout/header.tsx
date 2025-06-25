import { Pizza } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { CartButton } from '../cart/cart-button'
import { LoginAreaButton } from '../login-area/login-area-button'

export const Header = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return (
    <header className="container mx-auto my-4 flex items-center justify-between rounded-md bg-yellow-300 p-5">
      <Link href="/">
        <div className="flex items-center gap-2 rounded-md bg-stone-100 px-4 py-2 text-2xl text-black hover:bg-stone-300">
          Pizzaria <Pizza />
        </div>
      </Link>
      <div className="flex gap-2">
        <LoginAreaButton initialState={!!token} />
        <CartButton />
      </div>
    </header>
  )
}
