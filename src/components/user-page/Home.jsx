import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import styled from 'styled-components'
import ReactECharts from 'echarts-for-react'

const StyledCard = styled(Card)`
  margin-bottom: 16px;
`

const ChartContainer = styled.div`
  height: 400px;
`

const Dashboard = () => {
  // ข้อมูลสำหรับกราฟ
  const option1 = {
    title: {
      text: 'กราฟ 1',
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [10, 15, 7, 18, 12],
        type: 'line',
      },
    ],
  }

  const option2 = {
    title: {
      text: 'กราฟ 2',
    },
    xAxis: {
      type: 'category',
      data: ['X', 'Y', 'Z'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [20, 30, 25],
        type: 'bar',
      },
    ],
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                รายจ่าย
              </Typography>
              <Typography variant="h5">$1,200</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Card 2
              </Typography>
              <Typography variant="h5">$800</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <ChartContainer>
                <ReactECharts option={option1} />
              </ChartContainer>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <ChartContainer>
                <ReactECharts option={option2} />
              </ChartContainer>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
