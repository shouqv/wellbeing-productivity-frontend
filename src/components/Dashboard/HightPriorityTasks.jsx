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

function HightPriorityTasks({data}) {

    const hightPriorityTasks = data?.high_priority_tasks || []

    return (
        <Card className="border-0 bg-white/50 shadow-md rounded-lg p-4 w-[300px] h-[180px]" >
            <CardHeader>
                <CardTitle className="dashboard-widget-title">Today's High Priotiy Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                {hightPriorityTasks?.length
                    ? <><div className="linked-goals-container max-h-[500px] overflow-y-auto rounded  p-2">
                        <div className='linked-goals-items' style={{ height: "150px"}}>
                            {
                                hightPriorityTasks.map((HPTask, index) => {
                                    return (
                                        <div key={index} className={`linked-goals-item ${HPTask.status === 'completed' ? "completed-task-style" : ""}`}>
                
                                            {HPTask.content}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div></>
                    : <p className="dashboard-widget-desc">No high priority today 😮‍💨</p>}

                <CardFooter>

                </CardFooter>
            </CardContent>
        </Card>
    )
}



export default HightPriorityTasks
