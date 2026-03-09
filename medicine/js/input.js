/**
 * Input Handlers — Text, Voice (Web Speech API), Image upload
 */

class InputHandler {
  constructor(onResult) {
    this.onResult = onResult; // callback(text)
    this.recognition = null;
    this.isListening = false;
  }

  /** Initialize Voice Recognition */
  initVoice(statusCallback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      statusCallback('Voice input is not supported in this browser. Please use Chrome or Edge.');
      return false;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    let finalTranscript = '';

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      statusCallback(null, finalTranscript, interimTranscript);
    };

    this.recognition.onerror = (event) => {
      statusCallback('Voice error: ' + event.error);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (finalTranscript.trim()) {
        this.onResult(finalTranscript.trim());
      }
      statusCallback(null, finalTranscript, '', true);
    };

    return true;
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /** Handle Image Upload — prompts user to describe visible symptoms */
  handleImageUpload(file, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result, file.name);
    };
    reader.readAsDataURL(file);
  }
}

export { InputHandler };
