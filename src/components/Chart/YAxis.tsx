import React from "react"
import * as d3 from 'd3'
import { useDimensionsContext } from "./Chart";

interface AxisProps {
    scale: () => {},
    label: string,
    formatTick: (arg0: number) => string,
}

const YAxis = ({ scale, label, formatTick = d3.format(",") }: AxisProps) => {
    const dimensions = useDimensionsContext()

    if (dimensions) {
        return
    }
    const numberOfTicks = dimensions.boundedHeight / 70
  
    const ticks = scale.ticks(numberOfTicks)

    return (
      <g className="Axis AxisVertical">
        <line
          className="Axis__line"
          y2={dimensions.boundedHeight}
        />
  
        {ticks.map((tick, i) => (
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(-16, ${scale(tick)})`}
          >
            { formatTick(tick) }
          </text>
        ))}
  
        {label && (
          <text
            className="Axis__label"
            style={{
              transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`
            }}
          >
            { label }
          </text>
        )}
      </g>
    )
}

export default YAxis