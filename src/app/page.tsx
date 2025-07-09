import { PizzaList } from '@/components/home/pizza-list'
import { api } from '@/lib/axios'

export default async function Home() {
  const pizzaReq = await api.get('/pizzas')
  const pizzas = pizzaReq.data.pizzas ?? []

  return (
    <div>
      <main className="container mx-auto mb-10 text-center">
        <h1 className="mb-4 text-2xl text-stone-100">Nossos produtos:</h1>
        <PizzaList pizzas={pizzas} />
      </main>
    </div>
  )
}
