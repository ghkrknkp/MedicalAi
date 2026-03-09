import { analyzeSymptoms } from './engine.js';
import { InputHandler } from './input.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let inputHandler;

document.addEventListener('DOMContentLoaded', () => {
  inputHandler = new InputHandler(handleAnalysis);
  initTabs();
  initTextInput();
  initVoiceInput();
  initImageInput();
  initBodyMap();
});

/* ── Tab Switching ─────────────────────────────── */
function initTabs() {
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      $$('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      $(`#${btn.dataset.tab}`).classList.add('active');
    });
  });
}

/* ── Text Input ────────────────────────────────── */
function initTextInput() {
  const btn = $('#analyze-btn');
  const textarea = $('#symptom-input');
  const chips = $('#symptom-chips');

  btn.addEventListener('click', () => handleAnalysis(textarea.value));
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAnalysis(textarea.value); }
  });

  // Quick symptom chips
  chips?.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      e.target.classList.toggle('selected');
      updateTextFromChips();
    }
  });
}

function updateTextFromChips() {
  const selected = [...$$('.chip.selected')].map(c => c.textContent);
  const textarea = $('#symptom-input');
  const existing = textarea.value.split(',').map(s => s.trim()).filter(s => s && !$$('.chip').length);
  const combined = [...new Set([...existing, ...selected])];
  textarea.value = combined.join(', ');
}

/* ── Voice Input ───────────────────────────────── */
function initVoiceInput() {
  const micBtn = $('#mic-btn');
  const status = $('#voice-status');
  const transcript = $('#voice-transcript');

  if (!micBtn) return;

  const supported = inputHandler.initVoice((error, final, interim, ended) => {
    if (error) { status.textContent = error; status.className = 'voice-status error'; return; }
    transcript.innerHTML = final + '<span class="interim">' + (interim || '') + '</span>';
    if (ended) {
      micBtn.classList.remove('recording');
      status.textContent = 'Click the microphone to start speaking';
      status.className = 'voice-status';
    }
  });

  if (!supported) {
    micBtn.disabled = true;
    status.textContent = 'Voice not supported. Use Chrome or Edge.';
    return;
  }

  micBtn.addEventListener('click', () => {
    if (inputHandler.isListening) {
      inputHandler.stopListening();
      micBtn.classList.remove('recording');
      status.textContent = 'Processing...';
    } else {
      transcript.innerHTML = '';
      inputHandler.startListening();
      micBtn.classList.add('recording');
      status.textContent = 'Listening... speak your symptoms';
      status.className = 'voice-status active';
    }
  });

  $('#voice-analyze-btn')?.addEventListener('click', () => {
    const text = transcript.textContent || transcript.innerText;
    if (text.trim()) handleAnalysis(text.trim());
  });
}

/* ── Image Input ───────────────────────────────── */
function initImageInput() {
  const dropzone = $('#image-dropzone');
  const fileInput = $('#image-file');
  const preview = $('#image-preview');
  const descInput = $('#image-desc');
  const analyzeBtn = $('#image-analyze-btn');

  if (!dropzone) return;

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault(); dropzone.classList.remove('dragover');
    if (e.dataTransfer.files[0]) processImage(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', () => { if (fileInput.files[0]) processImage(fileInput.files[0]); });

  function processImage(file) {
    inputHandler.handleImageUpload(file, (dataUrl) => {
      preview.innerHTML = `<img src="${dataUrl}" alt="Uploaded symptom image"><div class="image-label">Image uploaded — please describe visible symptoms below</div>`;
      preview.style.display = 'block';
      descInput.style.display = 'block';
      analyzeBtn.style.display = 'inline-flex';
    });
  }

  analyzeBtn?.addEventListener('click', () => {
    const desc = descInput.value.trim();
    if (desc) handleAnalysis(desc);
  });
}

/* ── Body Map ──────────────────────────────────── */
function initBodyMap() {
  $$('.body-region').forEach(region => {
    region.addEventListener('click', () => {
      const symptoms = region.dataset.symptoms;
      if (symptoms) {
        const textarea = $('#symptom-input');
        // Switch to text tab
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        $$('.tab-panel').forEach(p => p.classList.remove('active'));
        $('.tab-btn[data-tab="text-panel"]').classList.add('active');
        $('#text-panel').classList.add('active');
        textarea.value = textarea.value ? textarea.value + ', ' + symptoms : symptoms;
        textarea.focus();
      }
    });
  });
}

/* ── Core Analysis Handler ─────────────────────── */
function handleAnalysis(text) {
  if (!text || !text.trim()) return;

  const resultsSection = $('#results-section');
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Show loading
  $('#results-container').innerHTML = '<div class="loading"><div class="spinner"></div><p>🔬 Analyzing symptoms against medical database...</p></div>';
  $('#emergency-alert').style.display = 'none';

  // Simulate brief processing time for UX
  setTimeout(() => {
    const { results, emergencies, extractedSymptoms } = analyzeSymptoms(text);
    renderEmergency(emergencies);
    renderExtracted(extractedSymptoms);
    renderResults(results);
  }, 1000);
}

/* ── Render Emergency Alerts ───────────────────── */
function renderEmergency(emergencies) {
  const el = $('#emergency-alert');
  if (!emergencies || emergencies.length === 0) { el.style.display = 'none'; return; }

  el.style.display = 'block';
  el.innerHTML = `
    <div class="emergency-header">
      <span class="emergency-icon">🚨</span>
      <h3>EMERGENCY ALERT — Seek Immediate Medical Attention</h3>
    </div>
    <ul>${emergencies.map(e => `<li><strong>${e.severity === 'critical' ? '⚠️ CRITICAL' : '⚠️ HIGH'}:</strong> ${e.message}</li>`).join('')}</ul>
    <p class="emergency-call">📞 <strong>Call Emergency Services (911) immediately if you are experiencing these symptoms.</strong></p>
  `;
  el.classList.add('animate-alert');
}

/* ── Render Extracted Symptoms ─────────────────── */
function renderExtracted(symptoms) {
  const el = $('#extracted-symptoms');
  if (!symptoms || symptoms.length === 0) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  el.innerHTML = `<h4>🔍 Detected Symptoms</h4><div class="symptom-tags">${symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}</div>`;
}

/* ── Render Disease Results ────────────────────── */
function renderResults(results) {
  const container = $('#results-container');
  if (!results || results.length === 0) {
    container.innerHTML = `<div class="no-results"><div class="no-results-icon">🔎</div><h3>No matching conditions found</h3><p>Try describing your symptoms in more detail. For example: "I have a headache, fever, and body aches for the past 3 days."</p></div>`;
    return;
  }

  container.innerHTML = results.map((r, i) => `
    <div class="disease-card animate-card" style="animation-delay: ${i * 0.1}s">
      <div class="card-header card-header-bg-${i + 1}">
        <div class="rank">#${i + 1}</div>
        <div class="card-title">
          <h3>${r.disease.name}</h3>
          <div class="codes">
            <span class="code icd">ICD-10: ${r.disease.icdCode}</span>
            <span class="code snomed">SNOMED: ${r.disease.snomedCode}</span>
          </div>
        </div>
        <div class="probability">
          <div class="prob-circle" style="--prob: ${r.displayProbability}">
            <svg viewBox="0 0 36 36"><path class="prob-bg" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="prob-fill" stroke-dasharray="${r.displayProbability}, 100" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
            <span>${r.displayProbability}%</span>
          </div>
          <small>Match</small>
        </div>
      </div>

      <div class="card-body">
        <div class="section">
          <h4>📋 About This Condition</h4>
          <p>${r.disease.description}</p>
        </div>

        <div class="section">
          <h4>✅ Matched Symptoms</h4>
          <div class="symptom-tags">${r.matchedSymptoms.map(s => `<span class="symptom-tag matched">${s}</span>`).join('')}</div>
        </div>

        <div class="card-grid">
          <div class="section">
            <h4>👨‍⚕️ Consult Specialist</h4>
            <p class="specialist">${r.disease.specialist}</p>
          </div>
          <div class="section">
            <h4>🧪 Recommended Lab Tests</h4>
            <ul>${r.disease.labTests.map(t => `<li>${t}</li>`).join('')}</ul>
          </div>
          <div class="section">
            <h4>🏠 First-Aid & Home Care</h4>
            <ul>${r.disease.firstAid.map(t => `<li>${t}</li>`).join('')}</ul>
          </div>
        </div>

        ${r.disease.emergencySymptoms.length > 0 ? `<div class="section warning-section"><h4>⚠️ Seek Emergency Care If</h4><ul>${r.disease.emergencySymptoms.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
      </div>
    </div>
  `).join('') + `
    <div class="disclaimer-box animate-card" style="animation-delay: ${results.length * 0.1}s">
      <div class="disclaimer-icon">⚕️</div>
      <h4>Medical Disclaimer</h4>
      <p>This tool is for <strong>informational purposes only</strong> and is <strong>not a substitute for professional medical advice</strong>, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it because of information provided by this system.</p>
      <p>If you think you may have a medical emergency, call your doctor or emergency services (911) immediately.</p>
    </div>
  `;
}
