import { PizzaList } from '@/components/home/pizza-list'
import { api } from '@/lib/axios'

export default async function Home() {
  const pizzaReq = await api.get('/pizzas')
  const pizzas = pizzaReq.data.pizzas ?? []

  return (
    <div>
      <main className="container mx-auto mb-10">
        <PizzaList pizzas={pizzas} />
      </main>
    </div>
  )
}
