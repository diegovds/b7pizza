import { cookies } from 'next/headers'
import Link from 'next/link'
import { CartButton } from '../cart/cart-button'
import { LoginAreaButton } from '../login-area/login-area-button'

export const Header = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return (
    <header className="bg-secondary container mx-auto my-4 flex items-center justify-between rounded-md p-5">
      <Link href="/">
        <div className="text-2xl font-bold">B7Pizza</div>
      </Link>
      <div className="flex gap-2">
        <LoginAreaButton initialState={!!token} />
        <CartButton />
      </div>
    </header>
  )
}
