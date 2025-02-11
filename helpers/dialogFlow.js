// backend/services/dialogflowService.js
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

class DialogflowService {
  constructor() {
    this.sessionClient = new dialogflow.SessionsClient({
      credentials: {
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, '\n')
      }
    });
  }

  async detectIntent(text, sessionId, languageCode = 'en-US') {
    try {
      const sessionPath = this.sessionClient.projectAgentSessionPath(
        process.env.GOOGLE_PROJECT_ID,
        sessionId || uuidv4()
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: text,
            languageCode: languageCode
          }
        }
      };

      const [response] = await this.sessionClient.detectIntent(request);
      
      return {
        text: response.queryResult.fulfillmentText,
        intent: response.queryResult.intent.displayName,
        parameters: this.parseParameters(response.queryResult.parameters),
        confidence: response.queryResult.intentDetectionConfidence,
        context: response.queryResult.outputContexts,
        needsWebhook: response.queryResult.webhookPayload !== null
      };
    } catch (error) {
      console.error('Dialogflow Error:', error);
      return this.getFallbackResponse();
    }
  }

  parseParameters(parameters) {
    const parsed = {};
    for (const [key, value] of Object.entries(parameters.fields)) {
      parsed[key] = this.getValueFromProto(value);
    }
    return parsed;
  }

  getValueFromProto(value) {
    if (value.stringValue) return value.stringValue;
    if (value.numberValue) return value.numberValue;
    if (value.boolValue !== undefined) return value.boolValue;
    if (value.listValue) return value.listValue.values.map(v => this.getValueFromProto(v));
    if (value.structValue) {
      const struct = {};
      for (const [k, v] of Object.entries(value.structValue.fields)) {
        struct[k] = this.getValueFromProto(v);
      }
      return struct;
    }
    return null;
  }

  getFallbackResponse() {
    return {
      text: "I'm having trouble understanding that. Could you rephrase?",
      intent: 'fallback',
      parameters: {},
      confidence: 0,
      context: []
    };
  }
}

export default new DialogflowService();