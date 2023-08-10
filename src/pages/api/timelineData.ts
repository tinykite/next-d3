// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as d3 from "d3"

const randomAroundMean = (mean, deviation) => mean + boxMullerRandom() * deviation
const boxMullerRandom = () => (
  Math.sqrt(-2.0 * Math.log(Math.random())) *
  Math.cos(2.0 * Math.PI * Math.random())
)

const today = new Date()
const formatDate = d3.timeFormat("%m/%d/%Y")

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let lastTemperature = randomAroundMean(70, 20)
  const firstTemperature = d3.timeDay.offset(today, -100)

  const dummyData = new Array(100).fill(0).map((d, i) => {
    lastTemperature += randomAroundMean(0, 2)
    return {
      date: formatDate(d3.timeDay.offset(firstTemperature, i)),
      temperature: lastTemperature,
    }
  })
  res.status(200).json([...dummyData])
}
