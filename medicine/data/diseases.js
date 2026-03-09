const DISEASES = [
  {
    name: "Common Cold", icdCode: "J00", snomedCode: "82272006",
    symptoms: ["cough","runny nose","sneezing","sore throat","fever","headache","fatigue","chills"],
    weights:  [3, 4, 4, 3, 2, 2, 1, 1],
    description: "A viral infection of the upper respiratory tract causing sneezing, runny nose, and mild cough. Usually resolves on its own within 7–10 days.",
    specialist: "General Practitioner (GP)",
    labTests: ["Usually none needed", "Rapid flu test if symptoms are severe"],
    firstAid: ["Rest and stay hydrated", "Use saline nasal spray", "Take over-the-counter decongestants", "Gargle warm salt water for sore throat"],
    isEmergency: false, emergencySymptoms: []
  },
  {
    name: "Influenza (Flu)", icdCode: "J11.1", snomedCode: "6142004",
    symptoms: ["fever","muscle pain","fatigue","cough","headache","chills","sore throat","runny nose"],
    weights:  [4, 4, 3, 3, 3, 3, 2, 1],
    description: "A contagious respiratory illness caused by influenza viruses. More severe than a cold, with sudden onset of high fever and body aches.",
    specialist: "General Practitioner (GP)",
    labTests: ["Rapid influenza diagnostic test (RIDT)", "RT-PCR for influenza"],
    firstAid: ["Rest completely", "Drink plenty of fluids", "Take acetaminophen for fever", "Isolate from others to prevent spread"],
    isEmergency: false, emergencySymptoms: ["shortness of breath","persistent chest pain"]
  },
  {
    name: "COVID-19", icdCode: "U07.1", snomedCode: "840539006",
    symptoms: ["fever","cough","fatigue","shortness of breath","loss of appetite","muscle pain","sore throat","headache"],
    weights:  [4, 4, 3, 4, 3, 2, 2, 2],
    description: "A respiratory illness caused by the SARS-CoV-2 virus. Symptoms range from mild cold-like illness to severe breathing difficulties.",
    specialist: "Pulmonologist / Infectious Disease Specialist",
    labTests: ["COVID-19 RT-PCR test", "Rapid antigen test", "Chest X-ray if severe"],
    firstAid: ["Isolate immediately", "Monitor oxygen levels with pulse oximeter", "Stay hydrated", "Seek ER if oxygen drops below 94%"],
    isEmergency: false, emergencySymptoms: ["shortness of breath","chest pain","confusion"]
  },
  {
    name: "Pneumonia", icdCode: "J18.9", snomedCode: "233604007",
    symptoms: ["cough","fever","shortness of breath","chest pain","fatigue","chills","blood in sputum"],
    weights:  [4, 4, 4, 3, 2, 3, 2],
    description: "An infection that inflames the air sacs in your lungs, which may fill with fluid. Can range from mild to life-threatening.",
    specialist: "Pulmonologist",
    labTests: ["Chest X-ray", "Complete blood count (CBC)", "Sputum culture", "Blood culture"],
    firstAid: ["Seek medical attention promptly", "Rest and drink warm fluids", "Use a humidifier", "Take prescribed antibiotics as directed"],
    isEmergency: false, emergencySymptoms: ["severe shortness of breath","high fever","confusion"]
  },
  {
    name: "Asthma", icdCode: "J45.9", snomedCode: "195967001",
    symptoms: ["wheezing","shortness of breath","cough","chest tightness"],
    weights:  [5, 4, 3, 4],
    description: "A chronic condition where airways narrow and swell, producing extra mucus. This makes breathing difficult and triggers coughing and wheezing.",
    specialist: "Pulmonologist / Allergist",
    labTests: ["Spirometry (lung function test)", "Peak flow measurement", "Allergy testing"],
    firstAid: ["Use rescue inhaler (albuterol)", "Sit upright and stay calm", "Remove allergen triggers", "Call 911 if inhaler doesn't help"],
    isEmergency: false, emergencySymptoms: ["severe shortness of breath","lips turning blue"]
  },
  {
    name: "Allergic Rhinitis", icdCode: "J30.9", snomedCode: "61582004",
    symptoms: ["sneezing","runny nose","itching","red eyes","fatigue"],
    weights:  [4, 4, 4, 3, 1],
    description: "An allergic response causing sneezing, itching, and a runny nose. Triggered by pollen, dust mites, pet dander, or mold.",
    specialist: "Allergist / Immunologist",
    labTests: ["Skin prick allergy test", "Blood IgE levels", "Nasal smear for eosinophils"],
    firstAid: ["Take antihistamines (cetirizine, loratadine)", "Use nasal saline rinse", "Avoid known allergens", "Keep windows closed during pollen season"],
    isEmergency: false, emergencySymptoms: []
  },
  {
    name: "Migraine", icdCode: "G43.9", snomedCode: "37796009",
    symptoms: ["headache","nausea","blurred vision","dizziness","sensitivity to light"],
    weights:  [5, 3, 3, 2, 3],
    description: "A neurological condition causing intense, throbbing headaches often on one side of the head, sometimes with nausea and sensitivity to light/sound.",
    specialist: "Neurologist",
    labTests: ["Usually clinical diagnosis", "MRI brain if first-time or atypical", "CT scan to rule out other causes"],
    firstAid: ["Rest in a dark, quiet room", "Apply cold compress to forehead", "Take OTC pain relievers early", "Stay hydrated"],
    isEmergency: false, emergencySymptoms: ["worst headache ever","sudden onset","fever with stiff neck"]
  },
  {
    name: "Hypertension", icdCode: "I10", snomedCode: "38341003",
    symptoms: ["headache","dizziness","blurred vision","chest pain","shortness of breath","nausea"],
    weights:  [3, 3, 3, 2, 2, 1],
    description: "Persistently elevated blood pressure that forces the heart to work harder. Often called the 'silent killer' because it may have no symptoms until damage occurs.",
    specialist: "Cardiologist / Internal Medicine",
    labTests: ["Blood pressure monitoring", "ECG", "Kidney function tests", "Lipid profile"],
    firstAid: ["Sit down and rest calmly", "Take prescribed BP medications", "Avoid salt and caffeine", "Seek ER if BP exceeds 180/120"],
    isEmergency: false, emergencySymptoms: ["severe headache","chest pain","vision changes","confusion"]
  },
  {
    name: "Type 2 Diabetes", icdCode: "E11", snomedCode: "44054006",
    symptoms: ["frequent urination","excessive thirst","fatigue","blurred vision","weight loss","numbness"],
    weights:  [4, 4, 3, 3, 3, 2],
    description: "A chronic metabolic condition where your body doesn't use insulin properly, causing high blood sugar levels. Manageable with lifestyle changes and medication.",
    specialist: "Endocrinologist",
    labTests: ["Fasting blood glucose", "HbA1c (glycated hemoglobin)", "Oral glucose tolerance test", "Lipid profile"],
    firstAid: ["Monitor blood sugar regularly", "Follow a balanced, low-sugar diet", "Exercise regularly", "Take prescribed medications"],
    isEmergency: false, emergencySymptoms: ["confusion","loss of consciousness","fruity breath odor"]
  },
  {
    name: "Gastroesophageal Reflux (GERD)", icdCode: "K21.0", snomedCode: "235595009",
    symptoms: ["heartburn","chest pain","difficulty swallowing","cough","sore throat","nausea","bloating"],
    weights:  [5, 3, 3, 2, 2, 2, 2],
    description: "A digestive disorder where stomach acid frequently flows back into the esophagus, causing a burning sensation in your chest (heartburn).",
    specialist: "Gastroenterologist",
    labTests: ["Upper GI endoscopy", "Esophageal pH monitoring", "Barium swallow X-ray"],
    firstAid: ["Avoid spicy, fatty, acidic foods", "Don't lie down after eating", "Elevate head of bed", "Take antacids (Tums, Pepcid)"],
    isEmergency: false, emergencySymptoms: ["severe chest pain","vomiting blood","difficulty breathing"]
  },
  {
    name: "Urinary Tract Infection (UTI)", icdCode: "N39.0", snomedCode: "68566005",
    symptoms: ["painful urination","frequent urination","abdominal pain","fever","blood in urine","dark urine"],
    weights:  [5, 4, 3, 2, 2, 2],
    description: "An infection in any part of the urinary system — kidneys, bladder, or urethra. Most commonly affects the bladder and urethra.",
    specialist: "Urologist / General Practitioner",
    labTests: ["Urinalysis", "Urine culture and sensitivity", "Complete blood count"],
    firstAid: ["Drink plenty of water", "Avoid caffeine and alcohol", "Use a heating pad on abdomen", "See a doctor for antibiotics"],
    isEmergency: false, emergencySymptoms: ["high fever","severe back pain","vomiting"]
  },
  {
    name: "Iron-Deficiency Anemia", icdCode: "D50.9", snomedCode: "87522002",
    symptoms: ["fatigue","pale skin","shortness of breath","dizziness","weakness","headache","cold intolerance"],
    weights:  [4, 4, 3, 3, 3, 2, 2],
    description: "A condition where your blood lacks enough healthy red blood cells due to insufficient iron, leading to tiredness and weakness.",
    specialist: "Hematologist / Internal Medicine",
    labTests: ["Complete blood count (CBC)", "Serum ferritin", "Serum iron and TIBC", "Peripheral blood smear"],
    firstAid: ["Eat iron-rich foods (spinach, red meat, lentils)", "Take vitamin C to boost iron absorption", "Avoid tea/coffee with meals", "See a doctor for iron supplements"],
    isEmergency: false, emergencySymptoms: ["severe shortness of breath","fainting","rapid heartbeat"]
  },
  {
    name: "Acute Gastroenteritis", icdCode: "K52.9", snomedCode: "25374005",
    symptoms: ["diarrhea","vomiting","abdominal pain","nausea","fever","dehydration","loss of appetite"],
    weights:  [4, 4, 3, 3, 2, 2, 2],
    description: "Inflammation of the stomach and intestines, usually caused by a viral or bacterial infection. Commonly called 'stomach flu'.",
    specialist: "Gastroenterologist / General Practitioner",
    labTests: ["Stool culture", "Stool ova and parasites", "Electrolyte panel", "Complete blood count"],
    firstAid: ["Stay hydrated with ORS (oral rehydration salts)", "Eat bland foods (BRAT diet)", "Avoid dairy and fatty foods", "Rest and monitor for dehydration"],
    isEmergency: false, emergencySymptoms: ["severe dehydration","bloody diarrhea","high fever in children"]
  },
  {
    name: "Rheumatoid Arthritis", icdCode: "M06.9", snomedCode: "69896004",
    symptoms: ["joint pain","swollen joints","stiffness","fatigue","fever","weakness"],
    weights:  [5, 4, 4, 2, 1, 2],
    description: "An autoimmune disorder that causes chronic inflammation of the joints, especially small joints of hands and feet, leading to pain and swelling.",
    specialist: "Rheumatologist",
    labTests: ["Rheumatoid Factor (RF)", "Anti-CCP antibodies", "ESR and CRP", "X-rays of affected joints"],
    firstAid: ["Apply warm/cold compresses to joints", "Gentle stretching exercises", "Rest affected joints", "Take OTC anti-inflammatory medication"],
    isEmergency: false, emergencySymptoms: []
  },
  {
    name: "Hypothyroidism", icdCode: "E03.9", snomedCode: "40930008",
    symptoms: ["fatigue","weight gain","cold intolerance","constipation","dry skin","hair loss","depression","stiffness"],
    weights:  [4, 4, 3, 3, 3, 2, 2, 2],
    description: "A condition where your thyroid gland doesn't produce enough hormones, slowing down your metabolism and causing tiredness, weight gain, and feeling cold.",
    specialist: "Endocrinologist",
    labTests: ["TSH (thyroid-stimulating hormone)", "Free T4", "Free T3", "Thyroid antibodies"],
    firstAid: ["There is no home cure — see a doctor", "Take prescribed thyroid medication daily", "Eat a balanced diet with iodine", "Exercise regularly to boost metabolism"],
    isEmergency: false, emergencySymptoms: ["severe fatigue with confusion","very slow heart rate"]
  },
  {
    name: "Hyperthyroidism", icdCode: "E05.9", snomedCode: "34486009",
    symptoms: ["weight loss","palpitations","tremor","heat intolerance","anxiety","fatigue","diarrhea","insomnia"],
    weights:  [4, 4, 3, 3, 3, 2, 2, 2],
    description: "An overactive thyroid that makes too much hormone, speeding up your metabolism. Causes rapid heartbeat, weight loss, and nervousness.",
    specialist: "Endocrinologist",
    labTests: ["TSH", "Free T4 and Free T3", "Thyroid scan and uptake", "Thyroid antibodies"],
    firstAid: ["See a doctor — requires treatment", "Avoid caffeine and stimulants", "Practice stress-reduction techniques", "Eat regular balanced meals"],
    isEmergency: false, emergencySymptoms: ["very rapid heartbeat","high fever","confusion"]
  },
  {
    name: "Sinusitis", icdCode: "J32.9", snomedCode: "36971009",
    symptoms: ["headache","runny nose","fever","cough","sore throat","fatigue"],
    weights:  [4, 4, 2, 2, 2, 1],
    description: "Inflammation or swelling of the sinuses (air-filled spaces behind your forehead, cheeks, and eyes), causing congestion, facial pain, and headache.",
    specialist: "ENT Specialist (Otolaryngologist)",
    labTests: ["Usually clinical diagnosis", "CT scan of sinuses if chronic", "Nasal endoscopy"],
    firstAid: ["Use steam inhalation", "Apply warm compress to face", "Use saline nasal spray", "Take OTC decongestants"],
    isEmergency: false, emergencySymptoms: ["severe headache","high fever","swelling around eyes"]
  },
  {
    name: "Bronchitis", icdCode: "J20.9", snomedCode: "32398004",
    symptoms: ["cough","fatigue","shortness of breath","chest tightness","fever","sore throat"],
    weights:  [5, 3, 3, 3, 2, 2],
    description: "Inflammation of the bronchial tubes that carry air to your lungs. Causes persistent cough with mucus, chest discomfort, and fatigue.",
    specialist: "Pulmonologist / General Practitioner",
    labTests: ["Chest X-ray", "Sputum culture", "Pulmonary function test"],
    firstAid: ["Rest and stay hydrated", "Use a humidifier", "Avoid smoke and irritants", "Take OTC cough suppressants at night"],
    isEmergency: false, emergencySymptoms: ["coughing blood","very high fever","severe breathing difficulty"]
  },
  {
    name: "Coronary Artery Disease", icdCode: "I25.1", snomedCode: "53741008",
    symptoms: ["chest pain","shortness of breath","fatigue","palpitations","dizziness","swelling legs","nausea"],
    weights:  [5, 4, 3, 2, 2, 2, 1],
    description: "A condition where the major blood vessels supplying the heart become damaged or diseased, usually due to cholesterol buildup (plaque).",
    specialist: "Cardiologist",
    labTests: ["ECG / EKG", "Echocardiogram", "Cardiac stress test", "Coronary angiography", "Lipid profile", "Troponin levels"],
    firstAid: ["If chest pain occurs, chew aspirin (if not allergic)", "Rest and avoid exertion", "Call 911 if pain is severe or persistent", "Keep nitroglycerin handy if prescribed"],
    isEmergency: true, emergencySymptoms: ["chest pain","shortness of breath","jaw pain","left arm pain"]
  },
  {
    name: "Depression (Major Depressive Disorder)", icdCode: "F32.9", snomedCode: "35489007",
    symptoms: ["depression","fatigue","insomnia","loss of appetite","headache","anxiety","weight loss","memory loss"],
    weights:  [5, 4, 3, 3, 2, 2, 2, 1],
    description: "A mental health disorder characterized by persistently depressed mood, loss of interest in activities, and feelings of sadness that affect daily life.",
    specialist: "Psychiatrist / Psychologist",
    labTests: ["Clinical assessment (PHQ-9 questionnaire)", "Thyroid function tests (to rule out thyroid issues)", "CBC and metabolic panel"],
    firstAid: ["Talk to someone you trust", "Maintain a regular routine", "Exercise even if briefly", "Seek professional help — call 988 if in crisis"],
    isEmergency: false, emergencySymptoms: ["suicidal thoughts","self-harm","psychosis"]
  },
  {
    name: "Kidney Stones", icdCode: "N20.0", snomedCode: "95570007",
    symptoms: ["abdominal pain","back pain","painful urination","blood in urine","nausea","vomiting","fever"],
    weights:  [4, 4, 3, 3, 3, 2, 1],
    description: "Hard mineral and salt deposits that form inside your kidneys. Passing them can cause severe, sharp pain in the side and lower back.",
    specialist: "Urologist / Nephrologist",
    labTests: ["Urinalysis", "CT scan of abdomen", "Kidney ultrasound", "24-hour urine collection", "Blood calcium and uric acid"],
    firstAid: ["Drink lots of water (2-3 liters/day)", "Take OTC pain relievers (ibuprofen)", "Apply heating pad to back/side", "See a doctor if pain is unbearable or there's fever"],
    isEmergency: false, emergencySymptoms: ["severe unrelenting pain","high fever with chills","inability to urinate"]
  },
  {
    name: "Appendicitis", icdCode: "K35.8", snomedCode: "74400008",
    symptoms: ["abdominal pain","nausea","vomiting","fever","loss of appetite","diarrhea"],
    weights:  [5, 3, 3, 2, 3, 1],
    description: "Inflammation of the appendix causing severe pain in the lower right abdomen. Usually requires surgical removal.",
    specialist: "General Surgeon",
    labTests: ["Complete blood count (CBC)", "CT scan abdomen", "Ultrasound abdomen", "Urinalysis (to rule out UTI)"],
    firstAid: ["Do NOT eat or drink anything", "Do NOT take laxatives or pain meds before diagnosis", "Go to the ER immediately", "Lie still and avoid sudden movements"],
    isEmergency: true, emergencySymptoms: ["severe abdominal pain","fever","vomiting"]
  },
  {
    name: "Tuberculosis (TB)", icdCode: "A15.0", snomedCode: "56717001",
    symptoms: ["cough","fever","night sweats","weight loss","blood in sputum","fatigue","chills","loss of appetite"],
    weights:  [4, 3, 4, 3, 3, 2, 2, 2],
    description: "A serious infectious disease that mainly affects the lungs. Caused by bacteria that spread through airborne droplets when infected people cough or sneeze.",
    specialist: "Pulmonologist / Infectious Disease Specialist",
    labTests: ["Tuberculin skin test (Mantoux)", "Chest X-ray", "Sputum AFB smear and culture", "GeneXpert MTB/RIF test"],
    firstAid: ["Seek medical attention immediately", "Cover mouth when coughing", "Isolate from others", "Complete full course of prescribed antibiotics"],
    isEmergency: false, emergencySymptoms: ["massive hemoptysis","severe breathing difficulty"]
  },
  {
    name: "Dengue Fever", icdCode: "A90", snomedCode: "38362002",
    symptoms: ["fever","headache","muscle pain","joint pain","rash","nausea","fatigue","easy bleeding"],
    weights:  [5, 4, 3, 4, 3, 2, 2, 2],
    description: "A mosquito-borne viral infection causing high fever, severe headache, pain behind the eyes, and joint/muscle pain. Also called 'breakbone fever'.",
    specialist: "Infectious Disease Specialist / Internal Medicine",
    labTests: ["Dengue NS1 antigen test", "Dengue IgM/IgG antibodies", "Complete blood count (platelet count)", "Liver function tests"],
    firstAid: ["Rest completely", "Drink plenty of fluids and ORS", "Take acetaminophen only (avoid aspirin/ibuprofen)", "Monitor platelet count — seek ER if below 50,000"],
    isEmergency: false, emergencySymptoms: ["severe abdominal pain","persistent vomiting","bleeding gums","difficulty breathing"]
  },
  {
    name: "Malaria", icdCode: "B54", snomedCode: "61462000",
    symptoms: ["fever","chills","headache","muscle pain","nausea","vomiting","fatigue","sweating"],
    weights:  [5, 4, 3, 3, 2, 2, 2, 2],
    description: "A serious disease caused by parasites transmitted through mosquito bites. Causes recurring episodes of fever, chills, and sweating.",
    specialist: "Infectious Disease Specialist",
    labTests: ["Peripheral blood smear for malaria parasites", "Rapid diagnostic test (RDT)", "Complete blood count", "Liver and kidney function tests"],
    firstAid: ["Seek medical treatment immediately", "Take antimalarial drugs as prescribed", "Stay hydrated", "Use mosquito nets and repellents"],
    isEmergency: false, emergencySymptoms: ["confusion","seizures","severe anemia","dark urine"]
  },
  {
    name: "Chickenpox (Varicella)", icdCode: "B01.9", snomedCode: "38907003",
    symptoms: ["rash","fever","itching","fatigue","headache","loss of appetite"],
    weights:  [5, 3, 4, 2, 2, 2],
    description: "A highly contagious viral infection causing an itchy, blister-like rash all over the body, along with fever and tiredness.",
    specialist: "General Practitioner / Dermatologist",
    labTests: ["Usually clinical diagnosis", "Varicella-zoster IgM/IgG if needed", "PCR of vesicle fluid"],
    firstAid: ["Apply calamine lotion for itching", "Take lukewarm baths with oatmeal", "Trim fingernails to prevent scratching", "Take acetaminophen for fever (avoid aspirin in children)"],
    isEmergency: false, emergencySymptoms: ["difficulty breathing","high fever","confusion","rash near eyes"]
  },
  {
    name: "Conjunctivitis (Pink Eye)", icdCode: "H10.9", snomedCode: "9826008",
    symptoms: ["red eyes","eye discharge","itching","blurred vision","eye pain"],
    weights:  [5, 4, 3, 2, 2],
    description: "Inflammation of the clear membrane covering the white of the eye. Causes redness, itching, and discharge. Can be viral, bacterial, or allergic.",
    specialist: "Ophthalmologist",
    labTests: ["Usually clinical diagnosis", "Eye swab culture if bacterial suspected"],
    firstAid: ["Apply warm compress to affected eye", "Clean discharge with damp cloth", "Avoid touching/rubbing eyes", "Wash hands frequently to prevent spread"],
    isEmergency: false, emergencySymptoms: ["severe eye pain","sudden vision loss","sensitivity to light"]
  },
  {
    name: "Peptic Ulcer Disease", icdCode: "K27.9", snomedCode: "13200003",
    symptoms: ["abdominal pain","heartburn","nausea","bloating","vomiting","loss of appetite","weight loss"],
    weights:  [5, 4, 3, 2, 2, 2, 1],
    description: "Open sores that develop on the inner lining of the stomach or upper small intestine. Causes burning stomach pain that may worsen when hungry.",
    specialist: "Gastroenterologist",
    labTests: ["H. pylori breath test", "Upper GI endoscopy", "Stool antigen test", "Complete blood count"],
    firstAid: ["Avoid spicy, acidic foods and alcohol", "Eat smaller, frequent meals", "Take prescribed antacids or PPIs", "Avoid NSAIDs like aspirin/ibuprofen"],
    isEmergency: false, emergencySymptoms: ["vomiting blood","black tarry stools","severe abdominal pain","fainting"]
  },
  {
    name: "Sciatica", icdCode: "M54.3", snomedCode: "23056005",
    symptoms: ["back pain","numbness","weakness","muscle pain","stiffness"],
    weights:  [5, 4, 3, 3, 2],
    description: "Pain that radiates along the sciatic nerve from your lower back through your hip and down each leg. Usually affects only one side.",
    specialist: "Orthopedist / Neurologist",
    labTests: ["MRI of lumbar spine", "X-ray of spine", "Nerve conduction study", "EMG"],
    firstAid: ["Apply ice pack for first 48 hours, then heat", "Gentle stretching exercises", "Avoid prolonged sitting", "Take OTC anti-inflammatory medication"],
    isEmergency: false, emergencySymptoms: ["loss of bowel/bladder control","progressive weakness in legs"]
  },
  {
    name: "Otitis Media (Ear Infection)", icdCode: "H66.9", snomedCode: "65363002",
    symptoms: ["ear pain","fever","hearing loss","headache","irritability"],
    weights:  [5, 3, 3, 2, 2],
    description: "An infection of the middle ear, very common in children. Causes ear pain, sometimes fever, and temporary hearing difficulties.",
    specialist: "ENT Specialist (Otolaryngologist)",
    labTests: ["Otoscopic examination", "Tympanometry", "Audiometry if hearing loss persists"],
    firstAid: ["Apply warm compress to the ear", "Take acetaminophen or ibuprofen for pain", "Keep head elevated while sleeping", "See a doctor — antibiotics may be needed"],
    isEmergency: false, emergencySymptoms: ["high fever","severe headache","swelling behind ear","stiff neck"]
  }
];

export { DISEASES };
