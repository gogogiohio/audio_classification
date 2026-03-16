# Context Before Sound
Name: Context Before Sound
Date: 1 March 2026
Author: Zhang Yuxin (Giogio) and Lexin Li (Lexin)


## 1. Project Overview

This project explores how sound classification changes when *context* is prioritised over acoustic similarity.

Rather than classifying audio recordings according to their physical characteristics (frequency, loudness, waveform similarity), the sounds were grouped based on the real-life situations in which they were recorded.

After manual categorisation, the dataset was uploaded to **Teachable Machine** for supervised learning. The trained model produces real-time predictions that control the background colour of the interface.

Each colour represents a contextual category.

---

## 2. Conceptual Approach

We did not initially classify sounds based on what they merely *seemed* to resemble acoustically. Instead, we referred back to memory and the circumstances of recording, grouping sounds according to their lived contexts.

For example:

- A noisy beach recording was classified as “environment,” even if voices dominated the audio.
- A dog-related recording was labelled “dog” based on context, even if barking was not clearly present.

This approach foregrounds **human annotation** over acoustic resemblance.

When uploaded to Teachable Machine, the model does not truly understand context. It analyses acoustic features such as:

- Frequency distribution  
- Amplitude patterns  
- Temporal structure  

However, because we pre-labelled the dataset according to lived experience, we embed contextual framing into the training process.

Through this method, the machine approximates meaning through human-defined categories rather than purely signal-based similarity.

---

## 3. Data Collection

The dataset was manually collected from personal recordings.

Categories included:

- Environment  
- Voice  
- Dog  
- Petting  
- Counting Game  

Before training, all audio files were standardised:

- WAV format  
- PCM 16-bit  
- 44100 Hz  
- Mono  
- Trimmed to 3 seconds  

No sensitive or personal data is stored online. All files remain local.

---

## 4. Technical Pipeline

Data pipeline:

Collect → Annotate → Clean → Train → Represent

1. Sounds were recorded in daily life.
2. Files were manually renamed and categorised according to recording context.
3. Audio files were normalised to a consistent technical format.
4. The dataset was uploaded to Teachable Machine.
5. A supervised audio classification model was trained.
6. The exported TensorFlow.js model was integrated into a p5.js sketch.
7. Real-time microphone input triggers predictions.
8. The predicted category changes the background colour.

---

## 5. Interaction

The system continuously listens through the microphone.

When a sound is detected, the model outputs a predicted label. The interface responds by changing the background colour accordingly.

The visual output is intentionally minimal.

This reduction reflects how machine learning compresses complex soundscapes into discrete categorical decisions.

---

## 6. Challenges

Some audio files failed to import successfully after format conversion, for reasons that remain unclear. As a result, we manually reprocessed and reintroduced audio samples for training.

This revealed the technical fragility and constraints embedded within accessible machine learning tools.
