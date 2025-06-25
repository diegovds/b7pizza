import { Header } from '@/components/layout/header'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const sessionId = (await searchParams).session_id as string
  if (!sessionId) return redirect('/')

  const paymentSession = await stripe.checkout.sessions.retrieve(sessionId)
  if (!paymentSession) return redirect('/')

  const custumerEmail = paymentSession.customer_email

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10 text-center text-stone-100">
        <h1 className="text-2xl">Parabéns pela compra!</h1>
        <h3 className="text-xl">
          Em breve enviaremos um e-mail para <strong>{custumerEmail}</strong>{' '}
          com mais informações.
        </h3>
      </main>
    </div>
  )
}
