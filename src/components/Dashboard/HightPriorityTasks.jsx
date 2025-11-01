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

function HightPriorityTasks() {
    const [hightPriorityTasks, setHightPriorityTasks] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await authRequest({
                    method: "get",
                    url: "http://127.0.0.1:8000/api/dashboard/",
                })

                const allHPTasks = response.data.high_priority_tasks
                setHightPriorityTasks(allHPTasks)
                console.log(response.data)

            } catch (error) {
                console.error("error fetching progress data:", error)
            }
        }

        fetchData()
    }, [])

    return (
        <Card className="border-0 bg-blue-900 " >
            <CardHeader>
                <CardTitle>Today's High Priotiy Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                {hightPriorityTasks?.length
                    ? <><div className="max-h-[500px] overflow-y-auto rounded p-2">
                        <div style={{ height: "150px" }}>
                            {
                                hightPriorityTasks.map((HPTask, index) => {
                                    return (
                                        <div key={index} className={HPTask.status === 'completed'? "text-gray-500 bg-gray-700 line-through p-2 mb-2 rounded": "text-gray-300 p-2 mb-2 rounded bg-gray-800"}>
                                            {HPTask.content}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div></>
                    : <p>No high priority today 😮‍💨</p>}

                <CardFooter>

                </CardFooter>
            </CardContent>
        </Card>
    )
}



export default HightPriorityTasks
