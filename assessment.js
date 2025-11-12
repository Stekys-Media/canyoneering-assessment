// Canyoneering Assessment System - Complete Code
// Upload this file to GitHub as: assessment.js

const { useState, useEffect } = React;
const { BookOpen, CheckCircle, XCircle, Award, ChevronDown, ChevronUp, AlertCircle } = lucide.react;

const CanyoneeringAssessment = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showLearning, setShowLearning] = useState(false);
  const [learningSection, setLearningSection] = useState(null);
  const [completedSections, setCompletedSections] = useState({});

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const result = await window.storage.get('canyon-progress');
        if (result) {
          const data = JSON.parse(result.value);
          setCompletedSections(data.completed || {});
        }
      } catch (error) {
        console.log('No previous progress found');
      }
    };
    loadProgress();
  }, []);

  const saveProgress = async (section, passed) => {
    const updated = { ...completedSections, [section]: passed };
    setCompletedSections(updated);
    try {
      await window.storage.set('canyon-progress', JSON.stringify({ completed: updated }));
    } catch (error) {
      console.error('Failed to save progress');
    }
  };

  const sections = {
    'Risk Management': {
      description: 'Understanding hazards, decision-making, and safety protocols',
      content: `# Risk Management\n\n## The Dunning-Kruger Effect\n\n**What it means:**\nThe Dunning-Kruger effect is a psychological phenomenon where people with low ability or limited experience in a certain area overestimate their competence.\n\n**Implications for Canyoneering:**\n1. Overconfidence of beginners\n2. Underestimation of dangers\n3. Importance of humility in learning\n4. Role of instructors and guides`,
      questions: [
        { q: 'What is the Dunning-Kruger effect in canyoneering?', options: ['A technique for rappelling', 'When beginners overestimate their abilities due to lack of knowledge', 'A rope management system', 'A method for assessing anchors'], correct: 1, explanation: 'The Dunning-Kruger effect describes how people with limited experience overestimate their competence.' },
        { q: 'Which is an example of an objective hazard?', options: ['Poor rope management', 'Flash flood from upstream rainfall', 'Inadequate communication', 'Overconfidence'], correct: 1, explanation: 'Objective hazards exist independent of human behavior.' },
        { q: 'What is the "Commitment Trap" heuristic?', options: ['Being too committed to safety', 'Continuing despite risks because of time/effort invested', 'Committing to help team members', 'Making training commitments'], correct: 1, explanation: 'The Commitment Trap occurs when groups continue despite risks.' },
        { q: 'In a risk matrix, what creates "EXTREME" risk?', options: ['Rare + Minor', 'Almost Certain + Catastrophic', 'Possible + Insignificant', 'Unlikely + Moderate'], correct: 1, explanation: 'Extreme risk combines high likelihood with severe consequences.' },
        { q: 'What should you do with an "EXTREME" risk rating?', options: ['Proceed with caution', 'Apply backup systems', 'Do not proceed until conditions change', 'Monitor closely'], correct: 2, explanation: 'Extreme ratings require not proceeding until conditions change.' },
        { q: 'Which trap involves following the group when sensing danger?', options: ['Familiarity Trap', 'Social Proof (Herd Mentality)', 'Scarcity Trap', 'Expert Halo Trap'], correct: 1, explanation: 'Social Proof occurs when individuals suppress doubts to follow consensus.' },
        { q: 'What is a subjective hazard?', options: ['Rockfall', 'Cold water', 'Poor rope management or rigging errors', 'Flash flood potential'], correct: 2, explanation: 'Subjective hazards arise from human factors like decisions and skills.' },
        { q: 'Why are experienced canyoneers more cautious?', options: ['Naturally more fearful', 'Understand complexity and recognize what they don\'t know', 'Had more accidents', 'Follow stricter regulations'], correct: 1, explanation: 'Experience brings awareness of complexity and limitations.' },
        { q: 'What is the "Expert Halo Trap"?', options: ['Experts refusing to listen', 'Blind trust in authority without verification', 'Only experts can lead', 'A safety system'], correct: 1, explanation: 'Expert Halo Trap is blind trust instead of group discussion.' },
        { q: 'For "MEDIUM" risk, what action to take?', options: ['Cancel trip', 'Proceed as normal', 'Apply extra precautions or backup systems', 'Wait for better conditions'], correct: 2, explanation: 'Medium risk requires extra precautions while proceeding.' },
        { q: 'What is the "Familiarity Trap"?', options: ['Too familiar with team', 'Assuming past success means current safety', 'Knowing canyon too well', 'Using familiar gear without inspection'], correct: 1, explanation: 'Past success can lead to complacency about current conditions.' },
        { q: 'How do objective and subjective hazards combine?', options: ['They cancel out', 'Only objective matter', 'They interact - environmental dangers become critical with poor decisions', 'Subjective are more dangerous'], correct: 2, explanation: 'Risk emerges from interaction of both hazard types.' },
        { q: 'What is the "Scarcity Trap"?', options: ['Not enough gear', 'Running out of water', 'Rushing decisions due to limited time or resources', 'Too few team members'], correct: 2, explanation: 'Scarcity Trap causes rushed decisions from time pressure.' },
        { q: 'Why recognize heuristic traps?', options: ['Slows group down', 'Encourages open dialogue and shared safety responsibility', 'Makes leadership easier', 'Eliminates need for experience'], correct: 1, explanation: 'Awareness encourages critical thinking and shared responsibility.' },
        { q: 'What are the two key risk matrix factors?', options: ['Speed and difficulty', 'Likelihood and consequence', 'Experience and training', 'Weather and terrain'], correct: 1, explanation: 'Risk matrices combine likelihood and consequence severity.' }
      ]
    },
    'Rope Knowledge': {
      description: 'Understanding rope construction, materials, and selection',
      content: `# Rope Knowledge\n\n## Rope Construction\nKernmantle construction: core (kern) carries 50-70% of load, sheath (mantle) provides protection.\n\n## Materials\n- Polyester: Static, UV resistant\n- Nylon: Dynamic, absorbs impact\n- Polypropylene: Floats\n- HMPE: Highest strength-to-weight`,
      questions: [
        { q: 'What percentage of strength does the core carry?', options: ['20-30%', '50-70%', '80-90%', '100%'], correct: 1, explanation: 'The core carries 50-70% of total rope strength.' },
        { q: 'Which rope material floats?', options: ['Polyester', 'Nylon', 'Polypropylene', 'Aramid'], correct: 2, explanation: 'Polypropylene is less dense than water and floats.' },
        { q: 'Typical stretch for static rope?', options: ['< 5%', '5-10%', '10-15%', '> 15%'], correct: 0, explanation: 'Static ropes have less than 5% elongation.' },
        { q: 'Highest strength-to-weight material?', options: ['Nylon', 'Polyester', 'Aramid', 'HMPE (Dyneema)'], correct: 3, explanation: 'HMPE has the highest strength-to-weight ratio.' },
        { q: 'Ideal rope diameter for canyoneering?', options: ['6-7 mm', '7-8 mm', '9-10 mm', '11-12 mm'], correct: 2, explanation: '9-10 mm provides ideal balance of durability and handling.' },
        { q: 'What does kernmantle mean?', options: ['No core', 'Core and sheath construction', 'Climbing harness type', 'Storage method'], correct: 1, explanation: 'Kernmantle is core (kern) and sheath (mantle) construction.' },
        { q: 'Typical sheath-to-core ratio?', options: ['10-20%', '35-45%', '60-70%', '80-90%'], correct: 1, explanation: 'Sheath typically comprises 35-45% of rope weight.' },
        { q: 'Why use Polyester for sheaths?', options: ['Cheapest', 'UV resistance and maintains strength when wet', 'Highest stretch', 'Floats'], correct: 1, explanation: 'Polyester offers UV resistance and wet strength retention.' },
        { q: 'Aramid strength rating?', options: ['18-27 kN', '29-38 kN', '40-50 kN', '50-65 kN'], correct: 2, explanation: 'Aramid fibers have 40-50 kN strength with excellent properties.' },
        { q: 'Main disadvantage of Polypropylene?', options: ['Sinks', 'Too expensive', 'Lower abrasion resistance', 'Too much stretch'], correct: 2, explanation: 'Polypropylene has lower abrasion resistance than Polyester.' },
        { q: 'Why not dry ropes in direct sunlight?', options: ['UV radiation degrades fibers', 'Will shrink', 'Become too stiff', 'Lose color'], correct: 0, explanation: 'UV radiation degrades synthetic rope fibers over time.' },
        { q: 'Static elongation of 10mm rope at 150kg?', options: ['1.0%', '3.2%', '8.5%', '12.0%'], correct: 1, explanation: 'Quality static ropes have around 3.2% elongation at 150kg.' },
        { q: 'When to retire a rope immediately?', options: ['After 100 uses', 'When wet', 'Core visible or significant stiffness', 'After one year'], correct: 2, explanation: 'Retire rope if core is visible or significant stiffness exists.' },
        { q: 'Advantage of floating ropes?', options: ['Stronger', 'Prevent snagging and improve visibility', 'More abrasion resistant', 'Less stretch'], correct: 1, explanation: 'Floating ropes prevent snagging and improve retrieval visibility.' },
        { q: 'What certification to verify?', options: ['OSHA', 'EN 1891 Type A or B, CE', 'ISO 9000', 'ASTM F1772'], correct: 1, explanation: 'Verify EN 1891 Type A or B certification with CE marking.' }
      ]
    },
    'Knot Craft': {
      description: 'Essential knots for anchors, rigging, and safety',
      content: `# Knot Craft\n\n## Essential Knots\n- Figure 8 family: tying in, loops, bends\n- Webbing knots: water knot + Frost backup\n- Friction hitches: Prusik, VT Prusik\n- Advanced: Alpine butterfly, munter-mule-overhand`,
      questions: [
        { q: 'Knot for tying into harness?', options: ['Bowline', 'Clove hitch', 'Rethreaded figure 8', 'Alpine butterfly'], correct: 2, explanation: 'Rethreaded figure 8 is the foundational harness tie-in knot.' },
        { q: 'What is Frost knot used for?', options: ['Joining ropes', 'Creating loop', 'Backing up water knot in webbing', 'Ascending rope'], correct: 2, explanation: 'Frost knot backs up the water knot in webbing.' },
        { q: 'Which creates releasable anchor system?', options: ['Figure 8 on bight', 'Munter-mule-overhand', 'Prusik hitch', 'Clove hitch'], correct: 1, explanation: 'Munter-mule-overhand creates releasable systems for lowering.' },
        { q: 'What type is valdotain tress?', options: ['Bend', 'Loop knot', 'Friction hitch for ascending', 'Anchor knot'], correct: 2, explanation: 'Valdotain tress is a VT Prusik friction hitch.' },
        { q: 'Which creates isolated mid-rope loop?', options: ['Figure 8 on bight', 'Bowline', 'Alpine butterfly', 'Overhand on bight'], correct: 2, explanation: 'Alpine butterfly creates isolated loop without using ends.' },
        { q: 'Minimum tail length after tying?', options: ['1 inch', '2 inches', '3-4 inches', '6 inches'], correct: 2, explanation: 'Leave minimum 3-4 inches tail after tying any knot.' },
        { q: 'Proper name for water knot?', options: ['Overhand bend', 'Rethreaded overhand bend', 'Figure 8 bend', 'Double fisherman\'s'], correct: 1, explanation: 'Water knot is properly called rethreaded overhand bend.' },
        { q: 'Wraps in standard Prusik hitch?', options: ['2 wraps', '3 wraps', '4 wraps', '5 wraps'], correct: 1, explanation: 'Standard Prusik uses 3 wraps for optimal grip.' },
        { q: 'What must accompany bowline?', options: ['Backup carabiner', 'Yosemite finish', 'Double webbing', 'Two-person check'], correct: 1, explanation: 'Bowline requires Yosemite finish backup.' },
        { q: 'Best knot for low-profile rope joining?', options: ['Figure 8 bend', 'Water knot', 'Flat overhand', 'Double fisherman\'s'], correct: 2, explanation: 'Flat overhand has lower profile for easier retrieval.' },
        { q: 'Clove hitch primarily used for?', options: ['Permanent anchor', 'Joining ropes', 'Adjustable anchor attachment', 'Creating loop'], correct: 2, explanation: 'Clove hitch provides adjustable anchor attachment.' },
        { q: 'Which hitch ties with webbing?', options: ['Prusik', 'Valdotain tress', 'Klemheist', 'French Prusik'], correct: 2, explanation: 'Klemheist can be tied with webbing or cord.' },
        { q: 'What to check when inspecting knots?', options: ['Only tail length', 'Form, dressed, tight, tail, backups', 'Just tightness', 'Only knot type'], correct: 1, explanation: 'Check form, dressing, tightness, tail length, and backups.' },
        { q: 'Practice new knot how many times?', options: ['5-10 times', '20-30 times', '50+ times until automatic', 'Once if understood'], correct: 2, explanation: 'Practice 50+ times until automatic under stress.' },
        { q: 'Purpose of "dressing" a knot?', options: ['Making it pretty', 'Ensuring strands lie parallel in proper form', 'Adding decoration', 'Cleaning dirt'], correct: 1, explanation: 'Dressing arranges strands parallel for proper knot form.' }
      ]
    },
    'Anchors & Rigging': {
      description: 'Building and evaluating anchor systems',
      content: `# Anchors & Rigging\n\n## EARNEST Principles\n- Equalized\n- Angle-conscious\n- Redundant\n- No Extension\n- Strong\n- Timely\n\n## Rigging Systems\n- Static: carabiner block, knot block\n- Contingency: releasable systems\n- Twin rope rigging`,
      questions: [
        { q: 'What does EARNEST stand for?', options: ['Equalized, Angle-conscious, Redundant, No Extension, Strong, Timely', 'Easy, Anchored, Reliable, Natural, Efficient, Safe, Tested', 'Evaluate, Anchor, Rappel, Navigate, Emergency, Safety, Training', 'Equalized, Assessed, Rigged, Natural, Extended, Secure, Tensioned'], correct: 0, explanation: 'EARNEST: Equalized, Angle-conscious, Redundant, No Extension, Strong, Timely.' },
        { q: 'What is "wrap 2 pull 1"?', options: ['Rope retrieval method', 'Cinching wrap for single point anchors', 'Friction hitch', 'Belaying technique'], correct: 1, explanation: 'Wrap 2 pull 1 is cinching wrap for natural anchors.' },
        { q: 'What is carabiner block?', options: ['Locking mechanism', 'Static rigging using carabiners for friction', 'Block rope retrieval', 'Anchor hardware type'], correct: 1, explanation: 'Carabiner block uses carabiners for friction on static rigging.' },
        { q: 'When use releasable contingency?', options: ['Only in water', 'For last person assistance', 'To lower someone in distress', 'All rappels over 30m'], correct: 2, explanation: 'Releasable systems allow lowering someone in distress.' },
        { q: 'What is twin rope rigging?', options: ['Two ropes for redundancy', 'Two separate rappels', 'Both strands as independent lines', 'Backup rope system'], correct: 2, explanation: 'Twin rope rigging treats both strands as independent lines.' },
        { q: 'Never exceed what angle between anchors?', options: ['45 degrees', '60 degrees', '90 degrees', '120 degrees'], correct: 2, explanation: 'Never exceed 90-degree total angle between anchor points.' },
        { q: 'What does "No Extension" mean?', options: ['Cannot extend with webbing', 'Won\'t shock load if one point fails', 'Rope cannot lengthen', 'No extension devices allowed'], correct: 1, explanation: 'No Extension prevents shock loading when point fails.' },
        { q: 'What is Supplemental Anchor System (SAS)?', options: ['Extra anchors for backup', 'Link two bolts temporarily without webbing', 'Rope storage system', 'Secondary safety equipment'], correct: 1, explanation: 'SAS links two bolts temporarily using rope without webbing.' },
        { q: 'Mechanical bolts used for?', options: ['Temporary only', 'Fixed bolt anchors using expansion bolts', 'Connecting carabiners', 'Rope adjustment'], correct: 1, explanation: 'Mechanical bolts create fixed anchors when properly installed.' },
        { q: 'Purpose of tensioned guide rope?', options: ['Add anchor strength', 'Guide descent path away from hazards', 'Retrieve ropes easier', 'Create rappel friction'], correct: 1, explanation: 'Guide ropes control descent path away from hazards.' },
        { q: 'Check first when inspecting anchor?', options: ['Webbing color', 'Anchor strength (rock, bolt, tree)', 'Build time', 'Who built it'], correct: 1, explanation: 'Always first check fundamental anchor strength.' },
        { q: 'What is "yo-yo" system for?', options: ['Entertainment', 'Efficient lowering of multiple people', 'Ascending technique', 'Rope retrieval'], correct: 1, explanation: 'Yo-yo system efficiently lowers multiple people.' },
        { q: 'What is static courtesy rigging?', options: ['Permanent anchor', 'Extra safety line for psychological comfort', 'Rope type', 'Required for all rappels'], correct: 1, explanation: 'Courtesy rigging provides extra safety line for comfort.' },
        { q: 'Why is redundancy important?', options: ['Faster rigging', 'If one point fails, others hold', 'Looks professional', 'Regulations require'], correct: 1, explanation: 'Redundancy ensures backup if one anchor point fails.' },
        { q: 'Inspect webbing for?', options: ['Only color', 'Wear, cuts, sun damage, condition', 'Just knots', 'Manufacturer label'], correct: 1, explanation: 'Inspect webbing for wear, cuts, UV damage, and condition.' }
      ]
    },
    'Rating Systems': {
      description: 'Understanding ACA and European canyon rating systems',
      content: `# Rating Systems\n\n## ACA System\n- Technical: 1-4\n- Water: A-C\n- Time: I-VI\n- Risk: R, X\n\n## European (FFME)\n- Vertical: v1-v7\n- Aquatic: a1-a7\n- Commitment: I-VI`,
      questions: [
        { q: 'In ACA, what does "3B IV" mean?', options: ['Basic, moving water, half-day', 'Intermediate rappelling, still/light water, long full-day', 'Advanced, dry, multi-day', 'Expert, swift water, short'], correct: 1, explanation: '3=Intermediate rappels, B=still/light water, IV=long full-day.' },
        { q: 'What does "R" suffix indicate?', options: ['Rope required', 'Risky - extraordinary risk factors', 'Retreat possible', 'Rescue skills needed'], correct: 1, explanation: 'R indicates risky/extraordinary exposure factors.' },
        { q: 'European "v4 a3 III" represents?', options: ['Very easy, no water, short', 'Difficult vertical, moderate aquatic, full day', 'Basic, swift water, half day', 'Expert, calm pools, multi-day'], correct: 1, explanation: 'v4=difficult vertical, a3=moderate aquatic, III=full day.' },
        { q: 'Which system for desert slot canyons?', options: ['European FFME', 'UIAA', 'American Canyoneering Association (ACA)', 'French Federation'], correct: 2, explanation: 'ACA was developed for Colorado Plateau desert canyons.' },
        { q: 'What does "a7" indicate?', options: ['No water', 'Simple swimming', 'Moderate current', 'Strong current with severe cold and hydraulics'], correct: 3, explanation: 'a7 is highest aquatic difficulty with dangerous conditions.' },
        { q: 'ACA rating "2" means?', options: ['No rope needed', 'Basic canyoneering with scrambling', 'Intermediate with rappels', 'Advanced multi-pitch'], correct: 1, explanation: 'Rating 2 is basic canyoneering with scrambling and easy climbing.' },
        { q: 'In ACA water rating, "C" indicates?', options: ['Completely dry', 'Calm water only', 'Moving water with strong current', 'Cold water temperature'], correct: 2, explanation: 'C means moving water with current requiring swiftwater skills.' },
        { q: 'European "v2" indicates?', options: ['No rappels', 'Easy rappels ≤ 10m', 'Rappels up to 30m', 'Multi-pitch rappels'], correct: 1, explanation: 'v2 indicates easy rappels of 10m or less.' },
        { q: 'Roman "V" or "VI" in ACA means?', options: ['Very short, 1-2 hours', 'Half-day', 'Full-day', 'Multi-day trips'], correct: 3, explanation: 'V and VI indicate multi-day trips requiring camping.' },
        { q: 'What does "X" suffix mean?', options: ['Extra equipment', 'Expert climbers only', 'Extreme - errors likely fatal', 'Exit difficult'], correct: 2, explanation: 'X indicates extreme risk where errors likely cause serious injury.' },
        { q: 'European "a1" means?', options: ['No water or calm, swimming optional', 'Short swims required', 'Long swims with current', 'Dangerous aquatic hazards'], correct: 0, explanation: 'a1 is no water or calm water, swimming optional.' },
        { q: 'ACA rating "4" indicates?', options: ['Easy hiking', 'Basic rappelling', 'Intermediate technical', 'Advanced/Expert with complex rope work'], correct: 3, explanation: 'Rating 4 is advanced/expert with difficult climbing and multi-pitch.' },
        { q: 'Purpose of star rating in European?', options: ['Technical difficulty', 'Water volume', 'Scenic quality and fun factor', 'Danger level'], correct: 2, explanation: 'Stars indicate scenic quality and overall fun of canyon.' },
        { q: 'ACA time "III" indicates?', options: ['Short, 1-3 hours', 'Half-day, 4-6 hours', 'Full-day, 7-12 hours', 'Multi-day'], correct: 2, explanation: 'III indicates full-day trip of 7-12 hours.' },
        { q: 'Which has more granular water ratings?', options: ['ACA with A,B,C', 'European FFME with a1-a7', 'Both equally granular', 'Neither rates water'], correct: 1, explanation: 'European FFME has precise a1-a7 aquatic ratings.' }
      ]
    },
    'Techniques on Rope': {
      description: 'Rappelling, ascending, and rope work skills',
      content: `# Techniques on Rope\n\n## Essential Skills\n- Communication commands\n- Soft rappel starts\n- Lock-off techniques\n- Passing knots\n- Ascending systems\n- Transitions`,
      questions: [
        { q: 'What is "soft" rappel start?', options: ['Starting slowly', 'Using friction to minimize anchor load', 'Seated position', 'Having assistance'], correct: 1, explanation: 'Soft start uses friction to gradually transfer weight to anchor.' },
        { q: 'Purpose of fireman belay?', options: ['Rescue from above', 'Bottom belay by pulling rope to stop', 'Assist anchor building', 'Help rope retrieval'], correct: 1, explanation: 'Fireman belay stops/slows rappeller from below by pulling rope.' },
        { q: 'When ascending, what creates progress capture?', options: ['Rappel device', 'Carabiner', 'Friction hitch or mechanical ascender', 'Figure 8'], correct: 2, explanation: 'Friction hitches and ascenders grip rope preventing downward movement.' },
        { q: 'What is "passing a knot" while rappelling?', options: ['Removing a knot', 'Transitioning past knot in rope during descent', 'Tying knot on rappel', 'Bypassing anchor knot'], correct: 1, explanation: 'Passing a knot means moving past a knot in the rope while descending.' },
        { q: 'Why rig rappel device with appropriate friction?', options: ['Prevent rope damage', 'Ensure controlled descent speed', 'Reduce weight', 'Easier rope retrieval'], correct: 1, explanation: 'Proper friction ensures safe, controlled descent speed.' },
        { q: 'Command before starting rappel?', options: ['On rope!', 'Rappelling!', 'Going down!', 'Clear!'], correct: 1, explanation: 'Standard command is "Rappelling!" to alert team.' },
        { q: 'Why are hard rappel starts dangerous?', options: ['Damage rope', 'Create shock loads multiplying forces 2-3x', 'Too slow', 'Require more strength'], correct: 1, explanation: 'Hard starts create shock loads multiplying anchor forces.' },
        { q: 'Leg wrap method used for?', options: ['Ascending faster', 'Locking off mid-rappel to free hands', 'Adding friction', 'Emergency brake'], correct: 1, explanation: 'Leg wrap locks off rappel temporarily freeing both hands.' },
        { q: 'Never let go of what during rappel?', options: ['The anchor', 'The brake hand', 'The guide hand', 'Rope above'], correct: 1, explanation: 'Never let go of brake hand - it controls descent.' },
        { q: 'What is "changeover" or transition?', options: ['Changing ropes', 'Switching rappel to ascend or vice versa', 'Moving to new canyon', 'Changing leaders'], correct: 1, explanation: 'Changeover switches between rappelling and ascending modes.' },
        { q: 'Recommended Prusik for passing knots?', options: ['Standard 3-wrap', 'VT Prusik (valdotain tress)', 'Klemheist', 'French Prusik'], correct: 1, explanation: 'VT Prusik recommended for passing knots while rappelling.' },
        { q: 'What does "clipping short" mean?', options: ['Using shorter slings', 'Closer carabiner placement when passing knot', 'Cutting rope shorter', 'Taking shortcuts'], correct: 1, explanation: 'Clipping short means closer carabiner placement at knots.' },
        { q: 'If ropes become uneven while rappelling?', options: ['Continue anyway', 'Lock off and assess situation', 'Jump to ground', 'Cut longer side'], correct: 1, explanation: 'Lock off immediately and assess before continuing.' },
        { q: 'Purpose of pre-rigging less competent partners?', options: ['Go faster', 'Reduce decision-making and provide extra safety', 'No gear', 'Practice rescue'], correct: 1, explanation: 'Pre-rigging provides extra safety by reducing decisions.' },
        { q: 'Critical during transitions?', options: ['Work quickly', 'Never be completely unattached', 'Use only one hand', 'Keep talking'], correct: 1, explanation: 'Always maintain at least one attachment point during transitions.' }
      ]
    }
  };

  const startLearning = (section) => {
    setLearningSection(section);
    setShowLearning(true);
  };

  const startQuiz = (section) => {
    setSelectedSection(section);
    setQuizActive(true);
    setShowLearning(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < sections[selectedSection].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
    const score = calculateScore();
    const passed = score >= 80;
    saveProgress(selectedSection, passed);
  };

  const calculateScore = () => {
    const questions = sections[selectedSection].questions;
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setShowLearning(false);
    setLearningSection(null);
    setSelectedSection(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showLearning && learningSection) {
    const sectionData = sections[learningSection];
    
    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6" },
      React.createElement('div', { className: "max-w-4xl mx-auto" },
        React.createElement('div', { className: "bg-white rounded-2xl shadow-2xl p-8" },
          React.createElement('div', { className: "mb-6" },
            React.createElement('button', {
              onClick: () => setShowLearning(false),
              className: "text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
            }, '← Back to Sections'),
            React.createElement('h2', { className: "text-3xl font-bold text-gray-800 mb-2" }, learningSection),
            React.createElement('p', { className: "text-gray-600" }, sectionData.description)
          ),
          React.createElement('div', { 
            className: "prose prose-lg max-w-none mb-8",
            dangerouslySetInnerHTML: { __html: sectionData.content.replace(/\n/g, '<br/>') }
          }),
          React.createElement('div', { className: "flex gap-4 sticky bottom-0 bg-white pt-6 border-t border-gray-200" },
            React.createElement('button', {
              onClick: () => setShowLearning(false),
              className: "px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            }, 'Back to Sections'),
            React.createElement('button', {
              onClick: () => startQuiz(learningSection),
              className: "flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            }, 
              React.createElement(BookOpen, { className: "w-5 h-5" }),
              'Take Quiz Now'
            )
          )
        )
      )
    );
  }

  if (quizActive && selectedSection) {
    const questions = sections[selectedSection].questions;
    const question = questions[currentQuestion];
    const isAnswered = answers[currentQuestion] !== undefined;

    if (showResults) {
      const score = calculateScore();
      const passed = score >= 80;

      return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6" },
        React.createElement('div', { className: "max-w-3xl mx-auto" },
          React.createElement('div', { className: "bg-white rounded-2xl shadow-2xl p-8" },
            React.createElement('div', { className: "text-center mb-8" },
              passed ? React.createElement(Award, { className: "w-24 h-24 text-green-500 mx-auto mb-4" }) : React.createElement(AlertCircle, { className: "w-24 h-24 text-orange-500 mx-auto mb-4" }),
              React.createElement('h2', { className: "text-3xl font-bold text-gray-800 mb-2" }, passed ? 'Congratulations!' : 'Keep Training'),
              React.createElement('p', { className: "text-xl text-gray-600 mb-4" },
                'Your Score: ',
                React.createElement('span', { className: "font-bold text-2xl" }, score + '%')
              ),
              React.createElement('p', { className: "text-gray-600" }, passed ? 'You have demonstrated competency in this section!' : 'You need 80% to pass. Review the material and try again.')
            ),
            React.createElement('div', { className: "space-y-4 mb-8" },
              React.createElement('h3', { className: "text-xl font-semibold text-gray-800" }, 'Review Your Answers:'),
              questions.map((q, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer === q.correct;
                return React.createElement('div', { 
                  key: i, 
                  className: `p-4 rounded-lg border-2 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`
                },
                  React.createElement('div', { className: "flex items-start gap-3 mb-2" },
                    isCorrect ? React.createElement(CheckCircle, { className: "w-6 h-6 text-green-600 flex-shrink-0 mt-1" }) : React.createElement(XCircle, { className: "w-6 h-6 text-red-600 flex-shrink-0 mt-1" }),
                    React.createElement('div', { className: "flex-1" },
                      React.createElement('p', { className: "font-medium text-gray-800 mb-2" }, q.q),
                      React.createElement('p', { className: "text-sm text-gray-700" },
                        React.createElement('span', { className: "font-semibold" }, 'Your answer: '),
                        q.options[userAnswer]
                      ),
                      !isCorrect && React.createElement('p', { className: "text-sm text-green-700 mt-1" },
                        React.createElement('span', { className: "font-semibold" }, 'Correct answer: '),
                        q.options[q.correct]
                      ),
                      React.createElement('p', { className: "text-sm text-gray-600 mt-2 italic" }, q.explanation)
                    )
                  )
                );
              })
            ),
            React.createElement('div', { className: "flex gap-4" },
              React.createElement('button', {
                onClick: resetQuiz,
                className: "flex-1 bg-slate-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition"
              }, 'Back to Sections'),
              !passed && React.createElement('button', {
                onClick: () => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                },
                className: "flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
              }, 'Retake Quiz')
            )
          )
        )
      );
    }

    return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6" },
      React.createElement('div', { className: "max-w-3xl mx-auto" },
        React.createElement('div', { className: "bg-white rounded-2xl shadow-2xl p-8" },
          React.createElement('div', { className: "mb-6" },
            React.createElement('div', { className: "flex justify-between items-center mb-4" },
              React.createElement('h2', { className: "text-2xl font-bold text-gray-800" }, selectedSection),
              React.createElement('span', { className: "text-sm text-gray-600" }, `Question ${currentQuestion + 1} of ${questions.length}`)
            ),
            React.createElement('div', { className: "w-full bg-gray-200 rounded-full h-2" },
              React.createElement('div', { 
                className: "bg-blue-600 h-2 rounded-full transition-all duration-300",
                style: { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
              })
            )
          ),
          React.createElement('div', { className: "mb-8" },
            React.createElement('h3', { className: "text-xl font-semibold text-gray-800 mb-6" }, question.q),
            React.createElement('div', { className: "space-y-3" },
              question.options.map((option, i) =>
                React.createElement('button', {
                  key: i,
                  onClick: () => handleAnswer(currentQuestion, i),
                  className: `w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion] === i ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`
                },
                  React.createElement('div', { className: "flex items-center gap-3" },
                    React.createElement('div', { 
                      className: `w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === i ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                      }`
                    },
                      answers[currentQuestion] === i && React.createElement('div', { className: "w-3 h-3 bg-white rounded-full" })
                    ),
                    React.createElement('span', { className: "text-gray-700" }, option)
                  )
                )
              )
            )
          ),
          React.createElement('div', { className: "flex gap-4" },
            React.createElement('button', {
              onClick: prevQuestion,
              disabled: currentQuestion === 0,
              className: "px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            }, 'Previous'),
            currentQuestion === questions.length - 1 ?
              React.createElement('button', {
                onClick: submitQuiz,
                disabled: Object.keys(answers).length !== questions.length,
                className: "flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
              }, 'Submit Quiz') :
              React.createElement('button', {
                onClick: nextQuestion,
                disabled: !isAnswered,
                className: "flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              }, 'Next Question')
          ),
          React.createElement('button', {
            onClick: resetQuiz,
            className: "w-full mt-4 text-gray-600 hover:text-gray-800 py-2"
          }, 'Exit Quiz')
        )
      )
    );
  }

  return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6" },
    React.createElement('div', { className: "max-w-6xl mx-auto" },
      React.createElement('div', { className: "text-center mb-12" },
        React.createElement('div', { className: "flex items-center justify-center gap-3 mb-4" },
          React.createElement(BookOpen, { className: "w-12 h-12 text-blue-400" }),
          React.createElement('h1', { className: "text-4xl font-bold text-white" }, 'Canyoneering Knowledge Assessment')
        ),
        React.createElement('p', { className: "text-xl text-gray-300" }, 'Master essential canyoneering skills and safety knowledge')
      ),
      React.createElement('div', { className: "space-y-4" },
        Object.entries(sections).map(([sectionName, sectionData]) => {
          const isCompleted = completedSections[sectionName];
          const isExpanded = expandedSections[sectionName];

          return React.createElement('div', { key: sectionName, className: "bg-white rounded-xl shadow-lg overflow-hidden" },
            React.createElement('button', {
              onClick: () => toggleSection(sectionName),
              className: "w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
            },
              React.createElement('div', { className: "flex items-center gap-4 flex-1 text-left" },
                React.createElement('div', { 
                  className: `w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`
                },
                  isCompleted ? React.createElement(CheckCircle, { className: "w-7 h-7 text-white" }) : React.createElement(BookOpen, { className: "w-7 h-7 text-gray-600" })
                ),
                React.createElement('div', { className: "flex-1" },
                  React.createElement('h3', { className: "text-xl font-bold text-gray-800" }, sectionName),
                  React.createElement('p', { className: "text-gray-600 text-sm" }, sectionData.description),
                  isCompleted && React.createElement('span', { className: "inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full" }, '✓ Completed')
                )
              ),
              isExpanded ? React.createElement(ChevronUp, { className: "w-6 h-6 text-gray-400" }) : React.createElement(ChevronDown, { className: "w-6 h-6 text-gray-400" })
            ),
            isExpanded && React.createElement('div', { className: "px-6 pb-6 border-t border-gray-200" },
              React.createElement('div', { className: "pt-6 space-y-4" },
                React.createElement('div', { className: "bg-blue-50 border-l-4 border-blue-500 p-4 rounded" },
                  React.createElement('h4', { className: "font-semibold text-blue-900 mb-2" }, 'Section Overview'),
                  React.createElement('p', { className: "text-blue-800 text-sm mb-2" }, '• Study comprehensive learning materials'),
                  React.createElement('p', { className: "text-blue-800 text-sm mb-2" }, `• ${sectionData.questions.length} quiz questions covering key concepts`),
                  React.createElement('p', { className: "text-blue-800 text-sm" }, '• 80% required to pass')
                ),
                React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                  React.createElement('button', {
                    onClick: () => startLearning(sectionName),
                    className: "bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  },
                    React.createElement(BookOpen, { className: "w-5 h-5" }),
                    'Study Material'
                  ),
                  React.createElement('button', {
                    onClick: () => startQuiz(sectionName),
                    className: "bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  },
                    React.createElement(Award, { className: "w-5 h-5" }),
                    isCompleted ? 'Retake Quiz' : 'Take Quiz'
                  )
                )
              )
            )
          );
        })
      ),
      React.createElement('div', { className: "mt-12 bg-white rounded-xl p-8 shadow-lg" },
        React.createElement('h3', { className: "text-2xl font-bold text-gray-800 mb-4" }, 'About This Assessment'),
        React.createElement('div', { className: "space-y-3 text-gray-700" },
          React.createElement('p', null, 'This knowledge assessment covers essential canyoneering skills and safety protocols.'),
          React.createElement('p', null, React.createElement('strong', null, 'How it works:')),
          React.createElement('ul', { className: "list-disc list-inside space-y-2 ml-4" },
            React.createElement('li', null, 'Each section contains 15 questions testing critical concepts'),
            React.createElement('li', null, 'You must score 80% or higher to demonstrate competency'),
            React.createElement('li', null, 'Your progress is automatically saved'),
            React.createElement('li', null, 'Review explanations after completing each quiz'),
            React.createElement('li', null, 'Retake quizzes as needed to achieve mastery')
          ),
          React.createElement('p', { className: "text-sm text-gray-600 italic mt-4" }, 'Note: This tests knowledge only. Practical hands-on training with certified instructors is required to develop actual canyoneering competencies.')
        )
      )
    )
  );
};

// Render the app
const root = document.getElementById('canyoneering-root');
if (root) {
  ReactDOM.render(React.createElement(CanyoneeringAssessment), root);
}
