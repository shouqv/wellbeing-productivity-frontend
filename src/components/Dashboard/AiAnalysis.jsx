import noDataIcon from '../../assets/noData.png'
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
            <CardContent className="dashboard-ai-widget">
                {weeklyEntries?.length
                    ? <><div className="overflow-y-auto rounded p-2">
                        <div style={{ height: "150px" }}>
                            <p>
                                {aiAnalysis}
                            </p>
                        </div>
                    </div></>
                    : <div style={{
                        backgroundColor: "#dfdfdf",
                        margin:"20px 100px",
                        pading: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: '0.5rem',
                        
                    }} >
                        <p style={{ padding: '20px 20px 10px 20px', }}>No emotions entries yet</p>
                        <img src={noDataIcon} width={50} />
                    </div>
                }

                <CardFooter>

                </CardFooter>
            </CardContent>
        </Card>
    )
}



export default AiAnalysis
