// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as d3 from "d3"
import { randomAroundMean } from '@/lib/math'

const today = new Date()
const formatDate = d3.timeFormat("%m/%d/%Y")

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let lastTemperature = randomAroundMean({mean: 70, deviation:20})
  const firstTemperature = d3.timeDay.offset(today, -100)

  const dummyData = new Array(100).fill(0).map((d, i) => {
    lastTemperature += randomAroundMean({mean: 0, deviation: 2})
    return {
      date: formatDate(d3.timeDay.offset(firstTemperature, i)),
      temperature: lastTemperature,
    }
  })
  res.status(200).json([...dummyData])
}
