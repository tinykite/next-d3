import React from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

import Chart from "./Chart/Chart"
import Circles from "./Chart/Circles"
import XAxis from "./Chart/XAxis"
import YAxis from "./Chart/YAxis"
import { useChartDimensions, accessorPropsType } from "../lib/chart"

const ScatterPlot = ({ data, xAccessor, yAccessor, xLabel, yLabel }) => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  })

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  return (
    <div className="ScatterPlot" ref={ref}>
      <Chart dimensions={dimensions}>
        <XAxis
          dimensions={dimensions}
          dimension="x"
          scale={xScale}
          label={xLabel}
        />
        <YAxis
          dimensions={dimensions}
          dimension="y"
          scale={yScale}
          label={yLabel}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div>
  )
}

// ScatterPlot.propTypes = {
//   xAccessor: accessorPropsType,
//   yAccessor: accessorPropsType,
//   xLabel: PropTypes.string,
//   yLabel: PropTypes.string,
// }

// ScatterPlot.defaultProps = {
//   xAccessor: d => d.x,
//   yAccessor: d => d.y,
// }
export default ScatterPlot
