import * as d3 from "d3"
import { useChartDimensions } from "@/lib/chart"
import Chart from '../components/Chart/Chart'
import Line from "./Chart/Line"
import Axis from './Chart/Axis'

const formatDate = d3.timeFormat("%-b %-d")
const gradientColors = ["rgb(226, 222, 243)", "#f8f9fa"]

const Timeline = ({ data, xAccessor, yAccessor, label }) => {
    const [ref, dimensions] = useChartDimensions()

    const xScale = d3.scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const y0AccessorScaled = yScale(yScale.domain()[0])

    return (
        <div className="Timeline" ref={ref}>
            <Chart dimensions={dimensions}>
            <Line

          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          y0Accessor={y0AccessorScaled}
        />
        <Axis
          dimension="x"
          scale={xScale}
          formatTick={formatDate}
        />
        <Axis
          dimension="y"
          scale={yScale}
          label={label}
        />
            </Chart>
        </div>
    )
}

export default Timeline