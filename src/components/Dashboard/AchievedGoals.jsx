
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function AchievedGoals({ data }) {
    const achievedGoals = data?.achieved_goals || []

    if (!achievedGoals.length) {
        return <></>
    }
    return (
                <div className="dashboard-achieved-goals rounded-lg bg-white/50 shadow-md border-0 backdrop-blur-sm">
                    <CardTitle className="dashboard-widget-title">Congratulations 🎉</CardTitle>
                    <CardDescription className="dashboard-widget-desc">
                        You've achieved {achievedGoals.length} goal{achievedGoals.length > 1 ? "s" : ""}
                    </CardDescription>
                </div>
    )
}




export default AchievedGoals
