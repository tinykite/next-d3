import React from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

const Line = ({ type = "line", data, xAccessor, yAccessor, y0Accessor = 0, interpolation = d3.curveMonotoneX, ...props }) => {
  const lineGenerator = d3[type]()
    .x(xAccessor)
    .y(yAccessor)
    .curve(interpolation)

  if (type === "area") {
    lineGenerator
      .y0(y0Accessor)
      .y1(yAccessor)
  }

  return (
    <path {...props}
      className={`Line Line--type-${type}`}
      d={lineGenerator(data)}
    />
  )
}

export default Line
