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
    const weeklyEntries = data?.weekly_emotions || [];
    const aiAnalysis = data?.ai_analytics || "";
    return (
        <Card className="w-[500px] bg-white/50 shadow-md rounded-lg border-0" >
            <CardHeader>
                <CardTitle className="dashboard-widget-title">Insights of this week:</CardTitle>
            </CardHeader>
            <CardContent className = "dashboard-ai-widget">
                {weeklyEntries?.length
                    ? <><div className="overflow-y-auto rounded p-2">
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
