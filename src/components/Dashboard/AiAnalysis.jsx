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

function AiAnalysis({ data }) {
    // const [weeklyEntries, setWeeklyEntries] = useState([])
    // const [aiAnalysis, setAiAnalysis] = useState("")

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await authRequest({
    //                 method: "get",
    //                 url: "http://127.0.0.1:8000/api/dashboard/",
    //             })

    //             const weeklyEntries = response.data.weekly_emotions
    //             const aiAnalysisResponse = response.data.ai_analytics
    //             setWeeklyEntries(weeklyEntries)
    //             setAiAnalysis(aiAnalysisResponse)
    //             console.log(response.data)

    //         } catch (error) {
    //             console.error("error fetching progress data:", error)
    //         }
    //     }

    //     fetchData()
    // }, [])
    const weeklyEntries = data?.weekly_emotions || [];
    const aiAnalysis = data?.ai_analytics || "";

    return (
        <Card className="border-0 bg-blue-900 " >
            <CardHeader>
                <CardTitle>Insights of this week:</CardTitle>
            </CardHeader>
            <CardContent>
                {weeklyEntries?.length
                    ? <><div className="max-h-[500px] overflow-y-auto rounded p-2">
                        <div style={{ height: "150px" }}>
                            <p>
                                {aiAnalysis}
                            </p>
                        </div>
                    </div></>
                    : <p>No Emotion entries yet😌</p>}

                <CardFooter>

                </CardFooter>
            </CardContent>
        </Card>
    )
}



export default AiAnalysis
