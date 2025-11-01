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

function AchievedGoals({data}) {
    const achievedGoals = data?.achieved_goals || []

if (!achievedGoals.length){
    return <></>
}
    return (
        <Card className="border-0" >
            <CardHeader>
                <CardTitle>Congratulations 🎉</CardTitle>
                <CardDescription>
                     You've achieved {achievedGoals.length} goal{achievedGoals.length > 1 ? "s" : ""}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CardFooter>
                    
                </CardFooter>
            </CardContent>
        </Card>
    )
}




export default AchievedGoals
