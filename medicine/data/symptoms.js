// Symptom keyword lookup — canonical names, synonyms, body-system tags
const SYMPTOM_MAP = {
  // Head & Neurological
  "headache":       { canonical: "headache", system: "neurological", synonyms: ["head pain","head ache","migraine","cephalalgia"] },
  "dizziness":      { canonical: "dizziness", system: "neurological", synonyms: ["dizzy","lightheaded","vertigo","unsteady","giddiness"] },
  "confusion":      { canonical: "confusion", system: "neurological", synonyms: ["disoriented","confused","brain fog","altered mental status"] },
  "seizure":        { canonical: "seizure", system: "neurological", synonyms: ["convulsion","fits","epileptic","shaking uncontrollably"] },
  "fainting":       { canonical: "fainting", system: "neurological", synonyms: ["syncope","passed out","blacked out","lost consciousness"] },
  "numbness":       { canonical: "numbness", system: "neurological", synonyms: ["tingling","pins and needles","paresthesia","numb"] },
  "blurred vision": { canonical: "blurred vision", system: "neurological", synonyms: ["blurry vision","vision problems","can't see clearly","fuzzy vision"] },
  "memory loss":    { canonical: "memory loss", system: "neurological", synonyms: ["forgetfulness","amnesia","can't remember"] },
  "tremor":         { canonical: "tremor", system: "neurological", synonyms: ["shaking","shaky hands","trembling"] },

  // Respiratory
  "cough":          { canonical: "cough", system: "respiratory", synonyms: ["coughing","dry cough","wet cough","productive cough","hacking"] },
  "shortness of breath": { canonical: "shortness of breath", system: "respiratory", synonyms: ["breathless","dyspnea","difficulty breathing","can't breathe","breathing difficulty","trouble breathing","hard to breathe"] },
  "wheezing":       { canonical: "wheezing", system: "respiratory", synonyms: ["wheeze","whistling breath","noisy breathing"] },
  "sore throat":    { canonical: "sore throat", system: "respiratory", synonyms: ["throat pain","pharyngitis","scratchy throat","painful swallowing"] },
  "runny nose":     { canonical: "runny nose", system: "respiratory", synonyms: ["rhinorrhea","nasal discharge","stuffy nose","congestion","blocked nose","nasal congestion"] },
  "sneezing":       { canonical: "sneezing", system: "respiratory", synonyms: ["sneeze","sneezy"] },
  "chest tightness":{ canonical: "chest tightness", system: "respiratory", synonyms: ["tight chest","chest constriction"] },
  "blood in sputum":{ canonical: "blood in sputum", system: "respiratory", synonyms: ["hemoptysis","coughing blood","bloody mucus","blood in cough"] },

  // Cardiovascular
  "chest pain":     { canonical: "chest pain", system: "cardiovascular", synonyms: ["chest discomfort","chest pressure","angina","chest hurts","pain in chest","heart pain"] },
  "palpitations":   { canonical: "palpitations", system: "cardiovascular", synonyms: ["racing heart","heart pounding","rapid heartbeat","irregular heartbeat","heart flutter"] },
  "swelling legs":  { canonical: "swelling legs", system: "cardiovascular", synonyms: ["leg edema","swollen ankles","swollen feet","puffy legs","leg swelling","ankle swelling"] },
  "high blood pressure": { canonical: "high blood pressure", system: "cardiovascular", synonyms: ["hypertension","elevated bp","bp high"] },

  // Gastrointestinal
  "nausea":         { canonical: "nausea", system: "gastrointestinal", synonyms: ["nauseous","feeling sick","queasiness","queasy"] },
  "vomiting":       { canonical: "vomiting", system: "gastrointestinal", synonyms: ["throwing up","emesis","puking","vomit"] },
  "diarrhea":       { canonical: "diarrhea", system: "gastrointestinal", synonyms: ["loose stools","watery stools","frequent bowel","runny stomach"] },
  "constipation":   { canonical: "constipation", system: "gastrointestinal", synonyms: ["unable to pass stool","hard stool","difficulty passing stool","not pooping"] },
  "abdominal pain": { canonical: "abdominal pain", system: "gastrointestinal", synonyms: ["stomach pain","belly pain","tummy ache","stomach ache","stomach cramps","abdomen pain","stomach hurts"] },
  "bloating":       { canonical: "bloating", system: "gastrointestinal", synonyms: ["bloated","gas","flatulence","abdominal distension","gassy"] },
  "heartburn":      { canonical: "heartburn", system: "gastrointestinal", synonyms: ["acid reflux","indigestion","gerd","burning stomach","acidity"] },
  "blood in stool": { canonical: "blood in stool", system: "gastrointestinal", synonyms: ["rectal bleeding","bloody stool","melena","black stool","hematochezia"] },
  "loss of appetite":{ canonical: "loss of appetite", system: "gastrointestinal", synonyms: ["no appetite","not hungry","anorexia","appetite loss","don't want to eat"] },
  "difficulty swallowing":{ canonical: "difficulty swallowing", system: "gastrointestinal", synonyms: ["dysphagia","trouble swallowing","food stuck"] },
  "jaundice":       { canonical: "jaundice", system: "gastrointestinal", synonyms: ["yellow skin","yellow eyes","yellowing","yellowish skin","icterus"] },

  // Musculoskeletal
  "joint pain":     { canonical: "joint pain", system: "musculoskeletal", synonyms: ["arthralgia","aching joints","stiff joints","painful joints","joint ache"] },
  "back pain":      { canonical: "back pain", system: "musculoskeletal", synonyms: ["backache","lower back pain","lumbar pain","spine pain","back ache"] },
  "muscle pain":    { canonical: "muscle pain", system: "musculoskeletal", synonyms: ["myalgia","body aches","muscle ache","sore muscles","muscle soreness","body pain"] },
  "stiffness":      { canonical: "stiffness", system: "musculoskeletal", synonyms: ["stiff","rigidity","morning stiffness","difficulty moving"] },
  "swollen joints": { canonical: "swollen joints", system: "musculoskeletal", synonyms: ["joint swelling","puffy joints","inflamed joints"] },
  "weakness":       { canonical: "weakness", system: "musculoskeletal", synonyms: ["weak","muscle weakness","feeling weak","lack of strength"] },

  // Dermatological
  "rash":           { canonical: "rash", system: "dermatological", synonyms: ["skin rash","eruption","hives","urticaria","red spots","skin spots"] },
  "itching":        { canonical: "itching", system: "dermatological", synonyms: ["itchy","pruritus","scratching","itch","itchy skin"] },
  "skin lesion":    { canonical: "skin lesion", system: "dermatological", synonyms: ["sore","wound","ulcer","bump","lump on skin","skin growth"] },
  "bruising":       { canonical: "bruising", system: "dermatological", synonyms: ["bruise","contusion","black and blue","purple spots"] },
  "hair loss":      { canonical: "hair loss", system: "dermatological", synonyms: ["alopecia","balding","thinning hair","losing hair"] },
  "dry skin":       { canonical: "dry skin", system: "dermatological", synonyms: ["flaky skin","scaly skin","rough skin","xerosis"] },

  // Systemic / General
  "fever":          { canonical: "fever", system: "systemic", synonyms: ["high temperature","pyrexia","febrile","hot","temperature","chills and fever"] },
  "fatigue":        { canonical: "fatigue", system: "systemic", synonyms: ["tired","exhaustion","lethargy","tiredness","no energy","low energy","malaise","feeling weak"] },
  "chills":         { canonical: "chills", system: "systemic", synonyms: ["shivering","rigors","feeling cold","cold sweats"] },
  "night sweats":   { canonical: "night sweats", system: "systemic", synonyms: ["sweating at night","nocturnal sweating","waking up sweaty"] },
  "weight loss":    { canonical: "weight loss", system: "systemic", synonyms: ["losing weight","unintentional weight loss","unexplained weight loss","getting thinner"] },
  "weight gain":    { canonical: "weight gain", system: "systemic", synonyms: ["gaining weight","putting on weight","getting heavier"] },
  "swollen lymph nodes":{ canonical: "swollen lymph nodes", system: "systemic", synonyms: ["lymphadenopathy","swollen glands","enlarged lymph nodes","lumps in neck","lumps in armpit"] },
  "dehydration":    { canonical: "dehydration", system: "systemic", synonyms: ["dehydrated","dry mouth","thirsty","excessive thirst"] },

  // Urological
  "frequent urination":{ canonical: "frequent urination", system: "urological", synonyms: ["polyuria","peeing a lot","urinating often","need to pee","going to bathroom often"] },
  "painful urination":{ canonical: "painful urination", system: "urological", synonyms: ["dysuria","burning urination","hurts to pee","burning when peeing","pain when urinating"] },
  "blood in urine": { canonical: "blood in urine", system: "urological", synonyms: ["hematuria","bloody urine","red urine","pink urine"] },
  "dark urine":     { canonical: "dark urine", system: "urological", synonyms: ["brown urine","tea colored urine","cola colored urine"] },

  // ENT
  "ear pain":       { canonical: "ear pain", system: "ent", synonyms: ["earache","otalgia","ear ache","ear hurts"] },
  "hearing loss":   { canonical: "hearing loss", system: "ent", synonyms: ["can't hear","deaf","hard of hearing","reduced hearing"] },
  "ringing in ears":{ canonical: "ringing in ears", system: "ent", synonyms: ["tinnitus","buzzing in ears","ear ringing"] },

  // Ophthalmological
  "eye pain":       { canonical: "eye pain", system: "ophthalmological", synonyms: ["painful eyes","eye ache","eyes hurt"] },
  "red eyes":       { canonical: "red eyes", system: "ophthalmological", synonyms: ["bloodshot eyes","pink eye","conjunctivitis","eye redness"] },
  "eye discharge":  { canonical: "eye discharge", system: "ophthalmological", synonyms: ["watery eyes","eye crusting","sticky eyes","eye mucus"] },

  // Psychiatric
  "anxiety":        { canonical: "anxiety", system: "psychiatric", synonyms: ["anxious","nervousness","worry","panic","panic attack","nervous"] },
  "depression":     { canonical: "depression", system: "psychiatric", synonyms: ["depressed","sad","hopeless","feeling down","low mood"] },
  "insomnia":       { canonical: "insomnia", system: "psychiatric", synonyms: ["can't sleep","sleeplessness","trouble sleeping","difficulty sleeping","sleep problems"] },

  // Endocrine
  "excessive thirst":{ canonical: "excessive thirst", system: "endocrine", synonyms: ["polydipsia","very thirsty","always thirsty","drinking a lot of water"] },
  "excessive hunger":{ canonical: "excessive hunger", system: "endocrine", synonyms: ["polyphagia","always hungry","increased appetite","eating a lot"] },
  "heat intolerance":{ canonical: "heat intolerance", system: "endocrine", synonyms: ["can't stand heat","overheating","feeling hot all the time"] },
  "cold intolerance":{ canonical: "cold intolerance", system: "endocrine", synonyms: ["can't stand cold","always cold","feeling cold"] },

  // Hematological
  "easy bleeding":  { canonical: "easy bleeding", system: "hematological", synonyms: ["bleeding easily","excessive bleeding","prolonged bleeding","won't stop bleeding"] },
  "pale skin":      { canonical: "pale skin", system: "hematological", synonyms: ["pallor","looking pale","whitish skin","anemic looking"] }
};

// Emergency red-flag keywords
const EMERGENCY_KEYWORDS = [
  { keyword: "chest pain", message: "Chest pain may indicate a heart attack. Call emergency services (911) immediately.", severity: "critical" },
  { keyword: "difficulty breathing", message: "Severe breathing difficulty is a medical emergency. Seek immediate help.", severity: "critical" },
  { keyword: "can't breathe", message: "Inability to breathe is life-threatening. Call 911 immediately.", severity: "critical" },
  { keyword: "stroke", message: "Stroke symptoms require immediate emergency care. Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911.", severity: "critical" },
  { keyword: "seizure", message: "Seizures need urgent medical attention. Call emergency services.", severity: "critical" },
  { keyword: "unconscious", message: "Loss of consciousness is a medical emergency. Call 911.", severity: "critical" },
  { keyword: "severe bleeding", message: "Severe uncontrolled bleeding requires emergency care. Apply pressure and call 911.", severity: "critical" },
  { keyword: "suicidal", message: "If you or someone you know is having suicidal thoughts, call 988 (Suicide & Crisis Lifeline) or go to your nearest ER immediately.", severity: "critical" },
  { keyword: "anaphylaxis", message: "Anaphylaxis is life-threatening. Use epinephrine (EpiPen) if available and call 911.", severity: "critical" },
  { keyword: "severe allergic reaction", message: "Severe allergic reactions need emergency treatment. Call 911 immediately.", severity: "critical" },
  { keyword: "sudden numbness", message: "Sudden numbness, especially on one side, may indicate a stroke. Call 911.", severity: "critical" },
  { keyword: "blood in vomit", message: "Vomiting blood is a medical emergency. Go to the ER immediately.", severity: "high" },
  { keyword: "high fever", message: "Very high fever (above 103°F/39.4°C) needs urgent medical attention.", severity: "high" },
  { keyword: "severe headache", message: "A sudden severe headache ('worst headache of my life') may indicate a brain emergency. Seek immediate care.", severity: "high" },
  { keyword: "coughing blood", message: "Coughing up blood requires urgent medical evaluation.", severity: "high" },
  { keyword: "sudden vision loss", message: "Sudden vision loss may indicate a stroke or retinal emergency. Go to the ER.", severity: "critical" },
  { keyword: "paralysis", message: "Sudden paralysis is a medical emergency. Call 911 immediately.", severity: "critical" },
  { keyword: "poisoning", message: "If poisoning is suspected, call Poison Control (1-800-222-1222) or 911 immediately.", severity: "critical" },
  { keyword: "choking", message: "Choking is a life-threatening emergency. Perform the Heimlich maneuver and call 911.", severity: "critical" },
  { keyword: "heart attack", message: "If you suspect a heart attack, chew an aspirin (if not allergic) and call 911 immediately.", severity: "critical" }
];

export { SYMPTOM_MAP, EMERGENCY_KEYWORDS };
