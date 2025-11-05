import { useState, useEffect } from "react"
import { addEmotionService, checkEmotionSubmissionService } from "../../services/EmotionService"
import '../../styles/EmotionTab.css'
import sendIcon from '../../assets/send.png'

function EmotionForm() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [feelingText, setFeelingText] = useState("")
  const [loading, setLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState(null)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [todaySubmittedEmotion, setTodaySubmittedEmotion] = useState(null)


  useEffect(() => {
    async function checkToday() {
      try {
        const response = await checkEmotionSubmissionService();
        setAlreadySubmitted(response.data.already_submitted);
        if (response.data.already_submitted)
          setTodaySubmittedEmotion(response.data)
      } catch (error) {
        console.error("error in checking today submission", error);
      }
    }
    checkToday()
  }, []);

  const moods = [
    { emoji: "😄", label: "joyful" },
    { emoji: "😊", label: "happy" },
    { emoji: "😌", label: "calm" },
    { emoji: "😐", label: "neutral" },
    { emoji: "😢", label: "sad" },
    { emoji: "😠", label: "angry" },
    { emoji: "😰", label: "anxious" },

  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedMood || !feelingText) {
      alert("please select a mood and write your feeling.")
      return
    }

    try {
      setLoading(true);
      const response = await addEmotionService({
        emoji: selectedMood,
        feeling_text: feelingText,
      })


      setAiResponse(response.data.ai_response)
      setAlreadySubmitted(true)
    } catch (error) {
      console.error("error sending emotion:", error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emotions-big-container">
      <h1>{alreadySubmitted ? "You have already checked in today 🌞" : "How are you feeling today?"}</h1>

      <div>
        {moods.map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelectedMood(m.emoji)}
            disabled={alreadySubmitted}
            className={`emoji-btn ${selectedMood === m.emoji || todaySubmittedEmotion?.emoji === m.emoji ? "selected-emoji" : "unselected-emoji"}`}
            style={{
              cursor: alreadySubmitted ? "not-allowed" : "pointer",
            }}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      <form className="emotion-form" onSubmit={handleSubmit}>
        <div className="div-bubble-user">
          <textarea
            className={`bubble-user`}
            placeholder="Write how you feel..."
            value={alreadySubmitted ? todaySubmittedEmotion?.feeling_text : feelingText}
            onChange={(e) => setFeelingText(e.target.value)}
            disabled={alreadySubmitted}
          />
          <button
            type="submit"
            disabled={loading || alreadySubmitted}
            className='bubble-send-btn'
          >
            {loading ? "..." : <img src={sendIcon} alt="send icon" width={20} />}
          </button>
        </div>
      </form>

      {aiResponse ? (
        <div className="div-bubble-ai" >
          <h3>Beam's assistant</h3>
          <p className="bubble-ai">{aiResponse}</p>

        </div>
      )
        :
        alreadySubmitted ?
          < div className="div-bubble-ai" >
            <h3>Beam's Assistant</h3>
            <p className="bubble-ai">{todaySubmittedEmotion?.ai_response}</p>

          </div> : <></>
      }

      {alreadySubmitted ? <p>Come back tomorrow to share how you feel again 💬</p> : <></>}

    </div >

  );
}

export default EmotionForm;
