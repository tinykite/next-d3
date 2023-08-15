import React from "react"

interface CircleProps {
    data: Array<>,
    keyAccessor: () => string,
    xAccessor: () => string,
    yAccessor: () => string,
    radius: ((arg0: number) => number) | number
}

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius = 5 }: CircleProps) => (
  <>
    {data.map((d, i) => (
      <circle
        className="Circles__circle"
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        r={typeof radius == "function" ? radius(d) : radius}
      />
    ))}
  </>
)

export default Circles
