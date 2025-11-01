import { useState, useEffect } from "react";
import axios from "axios";
import { addEmotionService, checkEmotionSubmissionService } from "../../services/EmotionService";

function EmotionForm() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [feelingText, setFeelingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [todaySubmittedEmotion, setTodaySubmittedEmotion] = useState(null);

  // TODO - remember when the user enter a new day the below code wont run becuase it wont know unless they refresh or navigate away and comde bac
  //  later on maybe link and chekc the today date if it changed to be adependency in the below 
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
      // i can make a popup later, or using toast
      alert("please select a mood and write your feeling.");
      return;
    }

    try {
      setLoading(true);
      const response = await addEmotionService({
        // user: 1,
        emoji: selectedMood,
        feeling_text: feelingText,
      })


      setAiResponse(response.data.ai_response);
      setAlreadySubmitted(true)
    } catch (error) {
      console.error("error sending emotion:", error);
    } finally {
      setLoading(false);
    }
  };
  if (todaySubmittedEmotion) {
    return (
      <div>
        <h2>You have already checked in today 🌞</h2>
        <p>Todays chosen mood: {todaySubmittedEmotion.emoji} </p>
        <p>Todays journal: {todaySubmittedEmotion.feeling_text} </p>
        <p>Message: {todaySubmittedEmotion.ai_response} </p>
        <p>Come back tomorrow to share how you feel again 💬</p>
      </div>
    );
  }

  return (
    <div>
      <h2>How are you feeling today?</h2>

      <div>
        {moods.map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelectedMood(m.emoji)}
            disabled={alreadySubmitted}
            style={{
              cursor: alreadySubmitted ? "not-allowed" : "pointer",
              backgroundColor: selectedMood === m.emoji ? "#e694ffff" : "#363636ff"
            }}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write how you feel..."
          value={feelingText}
          onChange={(e) => setFeelingText(e.target.value)}
          disabled={alreadySubmitted}
        />
        <button
          type="submit"
          disabled={loading || alreadySubmitted}

        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      {aiResponse && (
        <div >
          <h3 >Your Luna, your smart companion comfort message</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default EmotionForm;
