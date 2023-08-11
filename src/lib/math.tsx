const boxMullerRandom = () => (
    Math.sqrt(-2.0 * Math.log(Math.random())) *
    Math.cos(2.0 * Math.PI * Math.random())
  )
export const randomAroundMean = ({mean, deviation}: {mean: number, deviation: number}) => mean + boxMullerRandom() * deviation