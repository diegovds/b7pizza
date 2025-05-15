import Link from 'next/link'
import { CartButton } from '../cart/cart-button'
import { Button } from '../ui/button'

export const Header = () => {
  return (
    <header className="bg-secondary container mx-auto my-4 flex items-center justify-between rounded-md p-5">
      <Link href="/">
        <div className="text-2xl font-bold">B7Pizza</div>
      </Link>
      <div className="flex gap-2">
        <Button>Login / Cadastro</Button>
        <CartButton />
      </div>
    </header>
  )
}
