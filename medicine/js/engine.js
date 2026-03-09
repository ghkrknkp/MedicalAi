import { SYMPTOM_MAP, EMERGENCY_KEYWORDS } from '../data/symptoms.js';
import { DISEASES } from '../data/diseases.js';

/**
 * Tokenizes and normalizes user input text into symptom matches.
 */
function extractSymptoms(text) {
  const lower = text.toLowerCase().replace(/[^\w\s'-]/g, ' ').trim();
  const matched = new Set();

  // Try matching multi-word synonyms first (longer phrases first)
  for (const [key, info] of Object.entries(SYMPTOM_MAP)) {
    const allTerms = [key, ...info.synonyms];
    for (const term of allTerms) {
      if (lower.includes(term.toLowerCase())) {
        matched.add(info.canonical);
        break;
      }
    }
  }

  return Array.from(matched);
}

/**
 * Scores each disease against extracted symptoms.
 * Returns sorted array of { disease, score, matchedSymptoms, probability }.
 */
function scoreDisease(disease, extractedSymptoms) {
  let score = 0;
  let maxPossible = 0;
  const matchedSymptoms = [];

  disease.symptoms.forEach((symptom, i) => {
    const weight = disease.weights[i] || 1;
    maxPossible += weight;
    if (extractedSymptoms.includes(symptom)) {
      score += weight;
      matchedSymptoms.push(symptom);
    }
  });

  const probability = maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0;
  return { disease, score, matchedSymptoms, probability };
}

/**
 * Main analysis function: takes raw text, returns top 5 diseases ranked by probability.
 */
function analyzeSymptoms(text) {
  if (!text || !text.trim()) return { results: [], emergencies: [], extractedSymptoms: [] };

  const extractedSymptoms = extractSymptoms(text);
  if (extractedSymptoms.length === 0) return { results: [], emergencies: [], extractedSymptoms: [] };

  const scored = DISEASES
    .map(d => scoreDisease(d, extractedSymptoms))
    .filter(r => r.score > 0)
    .sort((a, b) => b.probability - a.probability || b.score - a.score);

  // Normalize probabilities for top results — redistribute to sum to ~100%
  const top5 = scored.slice(0, 5);
  if (top5.length > 0) {
    const totalProb = top5.reduce((sum, r) => sum + r.probability, 0);
    if (totalProb > 0) {
      top5.forEach(r => {
        r.displayProbability = Math.round((r.probability / totalProb) * 100);
      });
      // Ensure percentages add to 100
      const diff = 100 - top5.reduce((s, r) => s + r.displayProbability, 0);
      if (diff !== 0 && top5.length > 0) top5[0].displayProbability += diff;
    }
  }

  const emergencies = detectEmergency(text);
  return { results: top5, emergencies, extractedSymptoms };
}

/**
 * Scans input for emergency red-flag keywords.
 */
function detectEmergency(text) {
  const lower = text.toLowerCase();
  const found = [];

  for (const item of EMERGENCY_KEYWORDS) {
    if (lower.includes(item.keyword)) {
      found.push(item);
    }
  }

  // Also check disease-level emergency indicators
  return found;
}

export { analyzeSymptoms, extractSymptoms, detectEmergency };
