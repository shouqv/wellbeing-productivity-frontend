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
        <Card className="border-0" >
            <CardHeader>
                <CardTitle>Today's High Priotiy Tasks</CardTitle>
                <CardDescription>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {hightPriorityTasks?.length
                    ? <><div>
                        {
                            hightPriorityTasks.map(HPTask => {
                                return (
                                    <div>
                                        {HPTask.content}
                                    </div>
                                )
                            })
                        }
                    </div></>
                    : <p>No high priority today 😮‍💨</p>}

                <CardFooter>

                </CardFooter>
            </CardContent>
        </Card>
    )
}



export default HightPriorityTasks
