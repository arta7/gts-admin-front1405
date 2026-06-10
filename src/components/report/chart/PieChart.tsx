import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'

import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const PieChart = (props: any) => {
 const { title,data } = props
  const seriesRef = useRef(null)
  const root2Ref = useRef(null)

  const [height, setHeight] = useState('250px')
  useLayoutEffect(() => {
    /* Chart code */
    // Create root2 element
    // https://www.amcharts.com/docs/v5/getting-started/#root2_element
    let root2 = am5.Root.new(title)

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root2.setThemes([am5themes_Animated.new(root2)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    let chart = root2.container.children.push(
      am5percent.PieChart.new(root2, {
        layout: root2.gridLayout,
      }),
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    let series = chart.series.push(
      am5percent.PieSeries.new(root2, {
        valueField: 'value',
        categoryField: 'category',
      }),
    )

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(data)

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    let legend = chart.children.push(am5.Legend.new(root2, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: am5.GridLayout.new(root2, {
        maxColumns: 3,
        fixedWidthGrid: true
      })
    }))
    // chart.children.push(
    //   am5.Legend.new(root2, {
    //     centerX: am5.percent(40),
    //     x: am5.percent(40),
    //     marginTop: 15,
    //     marginBottom: 15,
    //     layout: root2.gridLayout
    //   }),
    // )

    legend.data.setAll(series.dataItems)

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100)
  }, [])

  return (
    <React.Fragment>
        <CardContent className="d-flex justify-content-center align-items-center mt-2" style={{margin:10}}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <div id={title} style={{ width: 'auto',padding:10, height }}></div>
        </CardContent>
    </React.Fragment>
  )
}

export default PieChart
