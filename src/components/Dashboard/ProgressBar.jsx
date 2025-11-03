import { useEffect, useState } from "react"
import { authRequest } from "@/services/auth"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function ProgressBar({ data }) {
    // const [progress, setProgress] = useState(0)
    // const [totalTasks, setTotalTasks] = useState(0)

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await authRequest({
    //                 method: "get",
    //                 url: "http://127.0.0.1:8000/api/dashboard/",
    //             })

    //             const total = response.data.total_tasks
    //             setTotalTasks(total)
    //             const completed = response.data.completed_tasks

    //             if (total > 0) {
    //                 const percentage = Math.round((completed / total) * 100)
    //                 setProgress(percentage)
    //             } else {
    //                 setProgress(0)
    //             }
    //         } catch (error) {
    //             console.error("Error fetching progress data:", error)
    //         }
    //     }

    //     fetchData()
    // }, [])
    const totalTasks = data?.total_tasks || 0
    const completed = data?.completed_tasks || 0
    const progress = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0

    return (
        <Card className="w-[250px] h-[120px] bg-white/50 shadow-md rounded-lg p-4 flex flex-col border-0" >
            <CardHeader>
                <CardTitle className="dashboard-widget-title">Today’s Task Progress</CardTitle>
                <CardDescription className="dashboard-widget-desc">
                    {progress === 100
                        ? "All tasks completed 🎉"
                        : `${progress}% of today's tasks completed`}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-0">
                <div className="w-[200px] bg-gray-200 rounded-full h-4 dark:bg-gray-800">
                    <div
                        className="h-4 rounded-full transition-all duration-700 ease-in-out"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: '#c2c2c2ff',
                            boxShadow: "rgba(255, 255, 255, 0.35) 0px 30px 60px -12px inset, rgba(255, 255, 255, 0.5) 0px 18px 36px -18px inset"
                            ,
                        }}
                    ></div>
                </div>
                <p className="dashboard-widget-footer text-[#5a5a5a] self-start">Total tasks: {totalTasks}</p>
            </CardContent>
            <CardFooter>
                
            </CardFooter>

        </Card>
    )
}

export default ProgressBar
