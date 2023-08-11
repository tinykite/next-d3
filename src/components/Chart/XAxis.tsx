import React from "react"
import * as d3 from 'd3'
import { useDimensionsContext } from "./Chart";

interface AxisProps {
    scale: () => {},
    label: string,
    formatTick: (arg0: number) => string,
}

const XAxis = ({ scale, label, formatTick = d3.format(",") }: AxisProps) => {
  const dimensions = useDimensionsContext()

const numberOfTicks = dimensions.boundedWidth < 600
        ? dimensions.boundedWidth / 100
        : dimensions.boundedWidth / 250

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g className="Axis AxisHorizontal" transform={`translate(0, ${dimensions.boundedHeight})`}>
      <line
        className="Axis__line"
        x2={dimensions.boundedWidth}
      />

      {ticks.map((tick, i) => (
        <text
          key={tick}
          className="Axis__tick"
          transform={`translate(${scale(tick)}, 25)`}
        >
          { formatTick(tick) }
        </text>
      ))}

      {label && (
        <text
          className="Axis__label"
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          { label }
        </text>
      )}
    </g>
  )
}

export default XAxis