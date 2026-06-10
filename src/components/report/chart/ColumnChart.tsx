import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5xy from '@amcharts/amcharts5/xy'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const ColumnChart = (props: any) => {
  const { title,data } = props
  const seriesRef = useRef(null)
  const rootRef = useRef(null)
  const xAxisRef = useRef(null)
  const yAxisRef = useRef(null)

  const [height, setHeight] = useState('500px')
  useLayoutEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new(title)

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart: any = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      }),
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
    cursor.lineY.set('visible', false)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
    xRenderer.labels.template.setAll({
      rotation: 90,
      direction:'rtl',
      centerY: am5.p50,
      centerX: am5.p100,
      paddingLeft: 15,
    })

    xRenderer.grid.template.setAll({
      location: 1,
    })

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    )

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      }),
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      }),
    )

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    })
    series.columns.template.adapters.add('fill', function (fill:any, target:any) {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    series.columns.template.adapters.add('stroke', function (stroke:any, target:any) {
      return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    xAxis.data.setAll(data)
    series.data.setAll(data)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000)
    chart.appear(1000, 100)
  }, [])

  return (
    <React.Fragment>
        <CardContent className="d-flex justify-content-center align-items-center mt-2 " style={{position:'relative',marginBottom:'10%'}}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <div id={title} style={{ width: '90%', height }}></div>
        </CardContent>
    </React.Fragment>
  )
}

export default ColumnChart
