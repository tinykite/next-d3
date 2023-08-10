// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as d3 from "d3"

const randomAroundMean = (mean, deviation) => mean + boxMullerRandom() * deviation
const boxMullerRandom = () => (
  Math.sqrt(-2.0 * Math.log(Math.random())) *
  Math.cos(2.0 * Math.PI * Math.random())
)

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const getScatterData = (count = 100) => (
    new Array(count).fill(0).map((d, i) => ({
      temperature: randomAroundMean(70, 20),
      humidity: randomAroundMean(0.5, 0.1),
    }))
  )

  const data = getScatterData()
  res.status(200).json([...data])
}
