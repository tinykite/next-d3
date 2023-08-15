import * as d3 from "d3"
import { useChartDimensions } from "@/lib/chart"
import Chart from '../components/Chart/Chart'
import Line from "./Chart/Line"
import XAxis from './Chart/XAxis'
import YAxis from './Chart/YAxis'
import type {temperatureData} from "@/lib/chart"
import type { NumberValue } from "d3"

const formatDate = d3.timeFormat("%-b %-d")
const gradientColors = ["rgb(226, 222, 243)", "#f8f9fa"]

interface TimelineProps {
    data: Array<temperatureData>
    xAccessor: () => string
    yAccessor: () => string
    label?: string
}

const Timeline = ({ data, xAccessor, yAccessor, label }: TimelineProps) => {
    const [ref, dimensions] = useChartDimensions()
    const domainRange = d3.extent(data, xAccessor)

    console.log(ref)

    const xScale = d3.scaleTime()
    .domain(domainRange as Iterable<Date | NumberValue>) 
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
        <XAxis
          dimension="x"
          scale={xScale}
          formatTick={formatDate}
        />
        <YAxis
          dimension="y"
          scale={yScale}
          label={label}
        />
            </Chart>
        </div>
    )
}

export default Timeline