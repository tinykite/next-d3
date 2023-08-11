// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { randomAroundMean } from '@/lib/math'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const getScatterData = (count = 100) => (
    new Array(count).fill(0).map((d, i) => ({
      temperature: randomAroundMean({mean: 70, deviation: 20}),
      humidity: randomAroundMean({mean: 0.5, deviation: 0.1}),
    }))
  )

  const data = getScatterData()
  res.status(200).json([...data])
}
