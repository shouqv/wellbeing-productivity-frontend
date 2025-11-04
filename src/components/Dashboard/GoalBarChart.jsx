import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import axios from "axios"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { authRequest } from "@/services/auth"
import noDataIcon from '../../assets/noData.png'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"




const chartConfig = {
    goal: { label: "Goal", color: "var(--chart-2)" },
    completed: { label: "Completed", color: "var(--chart-1)" },
}

// crediting https://ui.shadcn.com/charts/bar#charts
export function GoalBarChart({ data }) {


    const goalsInfo = data?.goals_info || []

    const chartData = goalsInfo.map((goal, index) => ({
        label: `Goal ${index + 1}`,
        goal: goal.goal_content,
        completed: goal.completed_linked_tasks_count,
    }))
    const chartWidth = Math.max(400, chartData.length * 50)


    return (
        <Card className="max-w-[500px] bg-white/50 shadow-md rounded-lg ">
            <CardHeader  >
                <CardTitle className='dashboard-widget-title'>Goals Progress</CardTitle>
                <CardDescription className='dashboard-widget-desc'>
                    Number of completed tasks per goal✨
                </CardDescription>
            </CardHeader>


            <CardContent className="overflow-x-auto">
                <div style={{ width: 500 }}>
                    <ChartContainer config={chartConfig} style={{ width: chartWidth, minWidth: '100%', height: "200px" }}>
                        {
                            goalsInfo.length === 0 ? <div style={{
                                backgroundColor: "#dfdfdf",
                                margin:"20px 120px",
                                pading: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: '0.5rem',


                            }} >
                                <p style={{ padding: '20px 20px 10px 20px', }}>No goals entries yet</p>
                                <img src={noDataIcon} width={50} />
                            </div>

                                : <BarChart
                                    data={chartData}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                                    width={chartWidth}
                                >
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="label"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        interval={0}
                                    />
                                    <YAxis allowDecimals={false} />
                                    {/* crediting https://github.com/shadcn-ui/ui/discussions/4423#discussioncomment-12625157 */}
                                    <ChartTooltip
                                        cursor={false}
                                        content={(props) => {
                                            if (!props.active || !props.payload?.length) return null;
                                            const data = props.payload[0].payload;
                                            return (
                                                <div className="p-2 border rounded shadow-sm bg-white/80">
                                                    <div><strong>Goal: </strong>{data.goal}</div>
                                                    <div><strong>Completed: </strong>{data.completed}</div>
                                                </div>
                                            );
                                        }}
                                    />
                                    <Bar
                                        dataKey="completed"
                                        fill="#000000"
                                        radius={6}
                                        barSize={40}
                                    />
                                </BarChart>
                        }


                    </ChartContainer>
                </div>
            </CardContent>

            <CardFooter className="dashboard-widget-footer">

                Hover to see full goal details

            </CardFooter>
        </Card>
    )
}

export default GoalBarChart
