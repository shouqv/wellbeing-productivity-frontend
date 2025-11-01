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

function ProgressBar({data}) {
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
        <Card className="border-0" >
            <CardHeader>
                <CardTitle>Today’s Task Progress</CardTitle>
                <CardDescription>
                    {progress === 100
                        ? "All tasks completed 🎉"
                        : `${progress}% of today's tasks completed`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-800">
                    <div
                        className="h-4 rounded-full transition-all duration-700 ease-in-out"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: '#6B4DBE',
                        }}
                    ></div>
                </div>
                <CardFooter>
                    <p>Total tasks: {totalTasks}</p>
                </CardFooter>
            </CardContent>
        </Card>
    )
}

export default ProgressBar
