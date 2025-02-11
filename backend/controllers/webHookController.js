// backend/controllers/webhookController.js
import dialogFlow from "../helpers/dialogFlow.js";

export const processMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    // Get base response from Dialogflow
    let response = await dialogFlow.detectIntent(message, sessionId);

    // // Handle webhook required intents
    // if(response.needsWebhook) {
    //   switch(response.intent) {
    //     case 'Hostel.Query':
    //       response = await handleHostelQuery(response.parameters);
    //       break;
    //     case 'Course.Info':
    //       response = await handleCourseQuery(response.parameters);
    //       break;
    //     // Add more intents as needed
    //   }
    // }

    res.json({
      success: true,
      ...response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      text: "Sorry, I'm experiencing technical difficulties.",
      error: error.message
    });
  }
};