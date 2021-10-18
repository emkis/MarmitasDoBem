import { useState, useEffect } from 'react';

type PackedLunch = {
  id: string
  name: string
  description: string
}

type Props = {
  lunches: PackedLunch[]
}

export async function getStaticProps() {
  async function fetchLunches() {
    const lunchesResponse = await fetch('https://run.mocky.io/v3/374924fd-429c-4b8d-9620-ff3df832fed6')
    const lunches = await lunchesResponse.json() as PackedLunch[]
    return lunches
  }

  return {
    props: {
      lunches: await fetchLunches()
    }
  }
}

function Orders(props: Props) {
  const [count, setCount] = useState(1)
  const [lunches, setLunches] = useState<PackedLunch[] | null>(null)

  async function fetchLunches() {
    const lunchesResponse = await fetch('https://run.mocky.io/v3/374924fd-429c-4b8d-9620-ff3df832fed6')
    const lunches = await lunchesResponse.json() as PackedLunch[]
    setLunches(lunches)
  }

  useEffect(() => {
    fetchLunches()
  }, [])

  return (
    <div>
      <h1>Orders</h1>
      <p> {count} </p>

      <button onClick={() => setCount(current => current + 1)}>increse</button>

      <code>{JSON.stringify(lunches)}</code>
      <h4>{JSON.stringify(props.lunches)}</h4>

      {lunches ? <ul>
        {lunches.map(lunch => {
          <li key={lunch.id}>
            {lunch.name}
          </li>
        })}
      </ul> : <h1>Carregando ...</h1>}
    </div>
  )
}

export default Orders