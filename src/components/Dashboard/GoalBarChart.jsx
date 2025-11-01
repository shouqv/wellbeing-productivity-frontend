import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import axios from "axios"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { authRequest } from "@/services/auth"

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

// const chartConfig = {
//     completed: {
//         label: "Completed Tasks",
//         color: "var(--chart-1)",
//     },
// }


const chartConfig = {
    goal: { label: "Goal", color: "var(--chart-2)" },
    completed: { label: "Completed", color: "var(--chart-1)" },
}

// crediting https://ui.shadcn.com/charts/bar#charts
export function GoalBarChart() {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authRequest({
                    method: "get",
                    url: "http://127.0.0.1:8000/api/dashboard/",
                })

                const goalsInfo = response.data.goals_info || []


                console.log(goalsInfo)

                const formattedData = goalsInfo.map((goal, index) => ({
                    label: `Goal ${index + 1}`,
                    goal: goal.goal_content, // first line
                    completed: goal.completed_linked_tasks_count, // second line
                }))

                setChartData(formattedData)
            } catch (error) {
                console.error("error fetching chart data", error)
            }
        }

        fetchData()
    }, [])

    const chartWidth = Math.max(400, chartData.length * 50)


    return (
        <Card className="w-full">
            <CardHeader >
                <CardTitle>Goals Progress</CardTitle>
                <CardDescription>
                    Number of completed tasks per goal
                </CardDescription>
            </CardHeader>


            <CardContent className="overflow-x-auto">
                <div style={{ width: 500 }}>
                    <ChartContainer config={chartConfig} style={{ width: chartWidth, minWidth: '100%', height: "200px" }}>
                        <BarChart
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
                                        <div className="p-2 border rounded shadow-sm">
                                            <div><strong>Goal: </strong>{data.goal}</div>
                                            <div><strong>Completed: </strong>{data.completed}</div>
                                        </div>
                                    );
                                }}
                            />
                            <Bar
                                dataKey="completed"
                                fill="var(--chart-1)"
                                radius={6}
                                barSize={40}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Hover to see full goal details
                </div>
            </CardFooter>
        </Card>
    )
}

export default GoalBarChart
