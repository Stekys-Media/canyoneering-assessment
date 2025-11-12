// Canyoneering Assessment - Complete Self-Contained Version
// No external dependencies needed - everything embedded
// Upload this to GitHub as: assessment.js

(function() {
    'use strict';
    
    // Simple state management
    const state = {
        view: 'home',
        expandedSections: {},
        currentSection: null,
        currentQuestion: 0,
        answers: {},
        showResults: false,
        completed: JSON.parse(localStorage.getItem('canyon-completed') || '{}')
    };

    // Section data with all content
    const sections = {
        'Risk Management': {
            description: 'Understanding hazards, decision-making, and safety protocols',
            content: `
                <h2 style="font-size: 1.75rem; font-weight: 700; margin: 1.5rem 0 1rem; color: #1f2937;">Risk Management</h2>
                
                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #374151;">The Dunning-Kruger Effect</h3>
                <p style="margin: 0.75rem 0;"><strong>What it means:</strong> The Dunning-Kruger effect is a psychological phenomenon where people with low ability or limited experience overestimate their competence. The less someone knows, the more confident they may feel, because they lack the knowledge to recognize their limitations.</p>
                
                <p style="margin: 0.75rem 0;"><strong>Implications for Canyoneering:</strong></p>
                <ul style="margin: 0.75rem 0; padding-left: 2rem;">
                    <li style="margin: 0.5rem 0;"><strong>Overconfidence of beginners</strong> – New participants might underestimate risks such as flash floods, rope handling errors, or terrain challenges</li>
                    <li style="margin: 0.5rem 0;"><strong>Underestimation of dangers</strong> – Without recognizing what they don't know, beginners may take shortcuts in safety checks</li>
                    <li style="margin: 0.5rem 0;"><strong>Importance of humility</strong> – Understanding this effect helps participants remain open to instruction and feedback</li>
                    <li style="margin: 0.5rem 0;"><strong>Role of instructors</strong> – Experienced leaders must be aware that beginners often have misplaced confidence</li>
                </ul>
                
                <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                
                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #374151;">Heuristic Traps</h3>
                <p style="margin: 0.75rem 0;"><strong>What Are Heuristic Traps?</strong> Mental shortcuts or rules of thumb that can lead to errors in judgment, especially under stress, fatigue, or time pressure.</p>
                
                <p style="margin: 0.75rem 0;"><strong>Common Heuristic Traps in Canyoneering:</strong></p>
                <ol style="margin: 0.75rem 0; padding-left: 2rem;">
                    <li style="margin: 0.5rem 0;"><strong>Familiarity Trap</strong> – "We've done this before; it's always been fine." Past success leads to complacency.</li>
                    <li style="margin: 0.5rem 0;"><strong>Social Proof (Herd Mentality)</strong> – "Everyone else is going, so it must be safe." Suppressing doubts to follow the group.</li>
                    <li style="margin: 0.5rem 0;"><strong>Commitment Trap (Sunk Cost Fallacy)</strong> – "We've come this far; we can't turn back." Continuing despite clear risks.</li>
                    <li style="margin: 0.5rem 0;"><strong>Expert Halo Trap</strong> – "The guide must be right." Blind trust in authority without verification.</li>
                    <li style="margin: 0.5rem 0;"><strong>Scarcity Trap</strong> – "We need to finish before dark." Rushing decisions due to limited time.</li>
                </ol>
                
                <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                
                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #374151;">Objective and Subjective Hazards</h3>
                <p style="margin: 0.75rem 0;"><strong>Objective Hazards:</strong> Dangers that exist independent of human behavior (flash floods, rockfall, cold water, unstable anchors).</p>
                <p style="margin: 0.75rem 0;"><strong>Subjective Hazards:</strong> Dangers arising from human factors (poor decisions, fatigue, overconfidence, inadequate communication).</p>
                <p style="margin: 0.75rem 0;"><strong>How They Combine:</strong> A canyon with flash flood potential (objective) becomes dangerous when a team underestimates weather changes (subjective). Managing risk means identifying objective hazards and reducing subjective hazards through training and judgment.</p>
                
                <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                
                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #374151;">Risk Matrix</h3>
                <p style="margin: 0.75rem 0;">A tool that combines <strong>Likelihood</strong> (how probable) and <strong>Consequence</strong> (how serious) to evaluate risk levels:</p>
                <ul style="margin: 0.75rem 0; padding-left: 2rem;">
                    <li style="margin: 0.5rem 0;"><strong>Low:</strong> Proceed as planned, monitor conditions</li>
                    <li style="margin: 0.5rem 0;"><strong>Medium:</strong> Apply extra precautions or backup systems</li>
                    <li style="margin: 0.5rem 0;"><strong>High:</strong> Modify the plan or delay the trip</li>
                    <li style="margin: 0.5rem 0;"><strong>Extreme:</strong> Do not proceed until conditions change</li>
                </ul>
            `,
            questions: [
                { q: 'What is the Dunning-Kruger effect in canyoneering?', options: ['A rappelling technique in wet conditions', 'When beginners overestimate their abilities due to lack of knowledge', 'A type of rope management system', 'A method for assessing anchor strength'], correct: 1, explanation: 'The Dunning-Kruger effect describes how people with limited experience overestimate their competence because they lack the knowledge to recognize their limitations.' },
                { q: 'Which is an example of an objective hazard?', options: ['Poor rope management by team members', 'Flash flood from upstream rainfall', 'Inadequate communication in the group', 'Overconfidence in technical skills'], correct: 1, explanation: 'Objective hazards exist independent of human behavior. Flash floods are environmental dangers that cannot be eliminated, only mitigated through planning.' },
                { q: 'What is the "Commitment Trap" heuristic?', options: ['Being too committed to safety protocols', 'Continuing despite risks because of time/effort already invested', 'Committing to help a team member in distress', 'Making a commitment to complete training'], correct: 1, explanation: 'The Commitment Trap (sunk cost fallacy) occurs when groups continue despite clear risks because they\'ve invested significant time or effort.' },
                { q: 'In a risk matrix, what creates an "EXTREME" risk level?', options: ['Rare likelihood + Minor consequence', 'Almost Certain likelihood + Catastrophic consequence', 'Possible likelihood + Insignificant consequence', 'Unlikely likelihood + Moderate consequence'], correct: 1, explanation: 'Extreme risk results from combining high likelihood (Almost Certain or Likely) with severe consequences (Catastrophic or Major).' },
                { q: 'What should you do with an "EXTREME" risk rating?', options: ['Proceed with extra caution', 'Apply backup systems', 'Do not proceed until conditions change', 'Monitor the situation closely'], correct: 2, explanation: 'Extreme risk ratings require not proceeding with the activity until conditions fundamentally change to reduce the risk level.' }
            ]
        },
        'Rope Knowledge': {
            description: 'Understanding rope construction, materials, and selection',
            content: `
                <h2 style="font-size: 1.75rem; font-weight: 700; margin: 1.5rem 0 1rem; color: #1f2937;">Rope Knowledge</h2>
                
                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #374151;">Rope Construction</h3>
                <p style="margin: 0.75rem 0;"><strong>Kernmantle Construction:</strong> Modern canyoneering ropes consist of a core (kern) and sheath (mantle).</p>
                <ul style="margin: 0.75rem 0; padding-left: 2rem;">
                    <li style="margin: 0.5rem 0;"><strong>Core:</strong> Carries 50-70% of the load, made from high-tensile synthetic fibers</li>
                    <li style="margin: 0.5rem 0;"><strong>Sheath:</strong> Provides abrasion resistance, UV protection, and handling comfort</li>
                </ul>
                
                <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                
                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #374151;">Rope Materials</h3>
                <ul style="margin: 0.75rem 0; padding-left: 2rem;">
                    <li style="margin: 0.5rem 0;"><strong>Polyester:</strong> Static, UV resistant, maintains strength when wet. Ideal for canyoneering.</li>
                    <li style="margin: 0.5rem 0;"><strong>Nylon (Polyamide):</strong> Dynamic, absorbs impact, good knotability. Used for climbing.</li>
                    <li style="margin: 0.5rem 0;"><strong>Polypropylene:</strong> Floats in water, lightweight, lower abrasion resistance.</li>
                    <li style="margin: 0.5rem 0;"><strong>Aramid (Technora/Kevlar):</strong> Excellent heat and cut resistance, 40-50 kN strength.</li>
                    <li style="margin: 0.5rem 0;"><strong>HMPE (Dyneema):</strong> Highest strength-to-weight ratio, 50-65 kN, ultra-low stretch.</li>
                </ul>
                
                <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
                
                <h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #374151;">Rope Selection</h3>
                <p style="margin: 0.75rem 0;"><strong>Rope Types:</strong></p>
                <ul style="margin: 0.75rem 0; padding-left: 2rem;">
                    <li style="margin: 0.5rem 0;"><strong>Static Rope:</strong> Less than 5% elongation - ideal for rappelling</li>
                    <li style="margin: 0.5rem 0;"><strong>Semi-Static:</strong> 5-10% elongation - used for rescue</li>
                    <li style="margin: 0.5rem 0;"><strong>Dynamic:</strong> Over 10% elongation - climbing only, not for canyoneering rappels</li>
                </ul>
                
                <p style="margin: 0.75rem 0;"><strong>Ideal Diameter:</strong> 9-10mm provides the best balance of durability, handling, and strength for most canyoneering applications.</p>
                
                <p style="margin: 0.75rem 0;"><strong>Buoyancy:</strong> Materials less dense than water (1 g/cm³) will float. Polypropylene (0.91) and HMPE (0.97) float, while Nylon (1.14), Polyester (1.38), and Aramid (1.44) sink.</p>
            `,
            questions: [
                { q: 'What percentage of a rope\'s strength does the core typically carry?', options: ['20-30%', '50-70%', '80-90%', '100%'], correct: 1, explanation: 'The core (kern) of a kernmantle rope carries the majority of the load, typically 50-70% of total strength.' },
                { q: 'Which rope material floats in water?', options: ['Polyester', 'Nylon (Polyamide)', 'Polypropylene', 'Aramid (Kevlar)'], correct: 2, explanation: 'Polypropylene (0.91 g/cm³) is less dense than water and will float.' },
                { q: 'What is the typical stretch percentage for static rope?', options: ['< 5%', '5-10%', '10-15%', '> 15%'], correct: 0, explanation: 'Static ropes have less than 5% elongation, making them ideal for rappelling.' },
                { q: 'Which material has the highest strength-to-weight ratio?', options: ['Nylon', 'Polyester', 'Aramid (Kevlar)', 'HMPE (Dyneema/Spectra)'], correct: 3, explanation: 'HMPE (Dyneema/Spectra) has the highest strength-to-weight ratio at 50-65 kN.' },
                { q: 'What is the ideal rope diameter for all-around canyoneering?', options: ['6-7 mm', '7-8 mm', '9-10 mm', '11-12 mm'], correct: 2, explanation: '9-10 mm ropes provide an ideal balance of durability, handling, and strength for most canyoneering applications.' }
            ]
        }
    };

    // Render functions
    function render() {
        const root = document.getElementById('canyoneering-root');
        if (!root) {
            console.error('Root element not found');
            return;
        }

        if (state.view === 'home') {
            renderHome(root);
        } else if (state.view === 'learning') {
            renderLearning(root);
        } else if (state.view === 'quiz') {
            renderQuiz(root);
        }
    }

    function renderHome(root) {
        root.innerHTML = `
            <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div style="text-align: center; color: white; margin-bottom: 3rem;">
                        <h1 style="font-size: 2.5rem; margin-bottom: 1rem; font-weight: 700;">🧗 Canyoneering Knowledge Assessment</h1>
                        <p style="font-size: 1.25rem; color: #cbd5e1;">Master essential canyoneering skills and safety knowledge</p>
                    </div>
                    
                    ${Object.entries(sections).map(([name, data]) => `
                        <div style="background: white; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-bottom: 1.5rem; overflow: hidden;">
                            <div onclick="window.canyonApp.toggleSection('${name}')" style="padding: 1.5rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; transition: background 0.2s;">
                                <div style="width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${state.completed[name] ? '#22c55e' : '#e5e7eb'}; color: ${state.completed[name] ? 'white' : '#6b7280'}; font-size: 1.5rem; flex-shrink: 0;">
                                    ${state.completed[name] ? '✓' : '📚'}
                                </div>
                                <div style="flex: 1;">
                                    <div style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 0.25rem;">${name}</div>
                                    <div style="color: #6b7280; font-size: 0.875rem;">${data.description}</div>
                                    ${state.completed[name] ? '<span style="display: inline-block; margin-top: 0.5rem; padding: 0.25rem 0.75rem; background: #dcfce7; color: #15803d; border-radius: 1rem; font-size: 0.75rem; font-weight: 600;">✓ Completed</span>' : ''}
                                </div>
                                <div style="font-size: 1.5rem; color: #9ca3af; flex-shrink: 0;">${state.expandedSections[name] ? '▲' : '▼'}</div>
                            </div>
                            
                            ${state.expandedSections[name] ? `
                                <div style="padding: 1.5rem; border-top: 1px solid #e5e7eb;">
                                    <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                                        <h4 style="color: #1e40af; margin-bottom: 0.5rem; font-size: 0.95rem; font-weight: 600;">Section Overview</h4>
                                        <p style="color: #1e40af; font-size: 0.875rem; margin: 0.25rem 0;">• Study comprehensive learning materials</p>
                                        <p style="color: #1e40af; font-size: 0.875rem; margin: 0.25rem 0;">• ${data.questions.length} quiz questions covering key concepts</p>
                                        <p style="color: #1e40af; font-size: 0.875rem; margin: 0;">• 80% required to pass</p>
                                    </div>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                                        <button onclick="window.canyonApp.startLearning('${name}')" style="padding: 1rem 1.5rem; background: #16a34a; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; font-size: 1rem;">📖 Study Material</button>
                                        <button onclick="window.canyonApp.startQuiz('${name}')" style="padding: 1rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; font-size: 1rem;">🎯 ${state.completed[name] ? 'Retake Quiz' : 'Take Quiz'}</button>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                    
                    <div style="margin-top: 3rem; background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                        <h3 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">About This Assessment</h3>
                        <div style="color: #374151; line-height: 1.8;">
                            <p style="margin-bottom: 0.75rem;">This knowledge assessment covers essential canyoneering skills and safety protocols based on professional training standards.</p>
                            <p style="margin-bottom: 0.5rem; font-weight: 600;">How it works:</p>
                            <ul style="margin: 0.5rem 0 1rem 1.5rem;">
                                <li style="margin: 0.25rem 0;">Each section contains multiple questions testing critical concepts</li>
                                <li style="margin: 0.25rem 0;">You must score 80% or higher to demonstrate competency</li>
                                <li style="margin: 0.25rem 0;">Your progress is automatically saved</li>
                                <li style="margin: 0.25rem 0;">Review explanations after completing each quiz</li>
                                <li style="margin: 0.25rem 0;">Retake quizzes as needed to achieve mastery</li>
                            </ul>
                            <p style="font-size: 0.875rem; color: #6b7280; font-style: italic;">Note: This tests knowledge only. Practical hands-on training with certified instructors is required to develop actual canyoneering competencies.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderLearning(root) {
        const section = sections[state.currentSection];
        root.innerHTML = `
            <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="max-width: 1000px; margin: 0 auto;">
                    <div style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                        <button onclick="window.canyonApp.backToHome()" style="padding: 0.75rem 1.5rem; background: #6b7280; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; margin-bottom: 1.5rem; font-family: inherit; font-size: 1rem;">← Back to Sections</button>
                        <h2 style="font-size: 2rem; margin-bottom: 0.5rem; font-weight: 700; color: #1f2937;">${state.currentSection}</h2>
                        <p style="color: #6b7280; margin-bottom: 2rem;">${section.description}</p>
                        <div style="line-height: 1.8; color: #374151;">
                            ${section.content}
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
                            <button onclick="window.canyonApp.backToHome()" style="padding: 1rem 1.5rem; background: #6b7280; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 1rem;">Back to Sections</button>
                            <button onclick="window.canyonApp.startQuiz('${state.currentSection}')" style="flex: 1; padding: 1rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 1rem;">Take Quiz Now →</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderQuiz(root) {
        const section = sections[state.currentSection];
        
        if (state.showResults) {
            const score = calculateScore();
            const passed = score >= 80;
            
            root.innerHTML = `
                <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <div style="max-width: 900px; margin: 0 auto;">
                        <div style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); text-align: center;">
                            <div style="font-size: 6rem; margin-bottom: 1rem;">${passed ? '🏆' : '📚'}</div>
                            <h2 style="font-size: 2rem; margin-bottom: 1rem; font-weight: 700; color: #1f2937;">${passed ? 'Congratulations!' : 'Keep Training'}</h2>
                            <div style="font-size: 3rem; font-weight: 700; color: #2563eb; margin: 1rem 0;">${score}%</div>
                            <p style="color: #6b7280; margin-bottom: 2rem; font-size: 1.125rem;">${passed ? 'You have demonstrated competency in this section!' : 'You need 80% to pass. Review the material and try again.'}</p>
                            
                            <div style="text-align: left; margin-top: 2rem;">
                                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #1f2937;">Review Your Answers:</h3>
                                ${section.questions.map((q, i) => {
                                    const userAnswer = state.answers[i];
                                    const correct = userAnswer === q.correct;
                                    return `
                                        <div style="padding: 1rem; border: 2px solid ${correct ? '#22c55e' : '#ef4444'}; background: ${correct ? '#f0fdf4' : '#fef2f2'}; border-radius: 0.5rem; margin-bottom: 1rem;">
                                            <div style="display: flex; gap: 0.75rem;">
                                                <div style="font-size: 1.5rem; flex-shrink: 0;">${correct ? '✅' : '❌'}</div>
                                                <div style="flex: 1;">
                                                    <div style="font-weight: 600; margin-bottom: 0.5rem; color: #1f2937;">${q.q}</div>
                                                    <div style="font-size: 0.875rem; margin: 0.25rem 0; color: #374151;"><strong>Your answer:</strong> ${q.options[userAnswer]}</div>
                                                    ${!correct ? `<div style="font-size: 0.875rem; color: #16a34a; margin: 0.25rem 0;"><strong>Correct answer:</strong> ${q.options[q.correct]}</div>` : ''}
                                                    <div style="font-size: 0.875rem; color: #6b7280; font-style: italic; margin-top: 0.5rem;">${q.explanation}</div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button onclick="window.canyonApp.backToHome()" style="flex: 1; padding: 1rem 1.5rem; background: #6b7280; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 1rem;">Back to Sections</button>
                                ${!passed ? '<button onclick="window.canyonApp.retakeQuiz()" style="flex: 1; padding: 1rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 1rem;">Retake Quiz</button>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const q = section.questions[state.currentQuestion];
            const progress = ((state.currentQuestion + 1) / section.questions.length) * 100;
            
            root.innerHTML = `
                <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                            <div style="margin-bottom: 2rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                                    <div style="font-size: 1.5rem; font-weight: 700; color: #1f2937;">${state.currentSection}</div>
                                    <div style="color: #6b7280; font-size: 0.875rem;">Question ${state.currentQuestion + 1} of ${section.questions.length}</div>
                                </div>
                                <div style="width: 100%; height: 0.5rem; background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
                                    <div style="height: 100%; background: #2563eb; width: ${progress}%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            
                            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem; color: #1f2937; line-height: 1.6;">${q.q}</h3>
                            
                            ${q.options.map((opt, i) => `
                                <div onclick="window.canyonApp.selectAnswer(${i})" style="padding: 1rem; border: 2px solid ${state.answers[state.currentQuestion] === i ? '#2563eb' : '#e5e7eb'}; background: ${state.answers[state.currentQuestion] === i ? '#eff6ff' : 'white'}; border-radius: 0.5rem; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                                    <div style="width: 1.5rem; height: 1.5rem; border: 2px solid ${state.answers[state.currentQuestion] === i ? '#2563eb' : '#d1d5db'}; background: ${state.answers[state.currentQuestion] === i ? '#2563eb' : 'white'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                        ${state.answers[state.currentQuestion] === i ? '<div style="width: 0.75rem; height: 0.75rem; background: white; border-radius: 50%;"></div>' : ''}
                                    </div>
                                    <div style="flex: 1;">${opt}</div>
                                </div>
                            `).join('')}
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button onclick="window.canyonApp.prevQuestion()" ${state.currentQuestion === 0 ? 'disabled' : ''} style="padding: 1rem 1.5rem; background: #e5e7eb; color: #1f2937; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 1rem; ${state.currentQuestion === 0 ? 'opacity: 0.5; cursor: not-allowed;' : ''}">Previous</button>
                                ${state.currentQuestion === section.questions.length - 1
                                    ? `<button onclick="window.canyonApp.submitQuiz()" ${Object.keys(state.answers).length !== section.questions.length ? 'disabled' : ''} style="flex: 1; padding: 1rem 1.5rem; background: #16a34a; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 1rem; ${Object.keys(state.answers).length !== section.questions.length ? 'opacity: 0.5; cursor: not-allowed;' : ''}">Submit Quiz</button>`
                                    : `<button onclick="window.canyonApp.nextQuestion()" ${state.answers[state.currentQuestion] === undefined ? 'disabled' : ''} style="flex: 1; padding: 1rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; font-family: inherit; font-size: 1rem; ${state.answers[state.currentQuestion] === undefined ? 'opacity: 0.5; cursor: not-allowed;' : ''}">Next Question</button>`
                                }
                            </div>
                            
                            <button onclick="window.canyonApp.backToHome()" style="width: 100%; padding: 0.75rem; background: transparent; color: #6b7280; border: none; cursor: pointer; margin-top: 1rem; font-family: inherit; font-size: 0.875rem;">Exit Quiz</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function calculateScore() {
        const section = sections[state.currentSection];
        let correct = 0;
        section.questions.forEach((q, i) => {
            if (state.answers[i] === q.correct) correct++;
        });
        return Math.round((correct / section.questions.length) * 100);
    }

    // Global functions exposed to window
    window.canyonApp = {
        toggleSection: function(name) {
            state.expandedSections[name] = !state.expandedSections[name];
            render();
        },
        
        startLearning: function(name) {
            state.view = 'learning';
            state.currentSection = name;
            render();
        },
        
        startQuiz: function(name) {
            state.view = 'quiz';
            state.currentSection = name;
            state.currentQuestion = 0;
            state.answers = {};
            state.showResults = false;
            render();
        },
        
        backToHome: function() {
            state.view = 'home';
            render();
        },
        
        selectAnswer: function(index) {
            state.answers[state.currentQuestion] = index;
            render();
        },
        
        nextQuestion: function() {
            if (state.currentQuestion < sections[state.currentSection].questions.length - 1) {
                state.currentQuestion++;
                render();
            }
        },
        
        prevQuestion: function() {
            if (state.currentQuestion > 0) {
                state.currentQuestion--;
                render();
            }
        },
        
        submitQuiz: function() {
            state.showResults = true;
            const score = calculateScore();
            if (score >= 80) {
                state.completed[state.currentSection] = true;
                localStorage.setItem('canyon-completed', JSON.stringify(state.completed));
            }
            render();
        },
        
        retakeQuiz: function() {
            state.currentQuestion = 0;
            state.answers = {};
            state.showResults = false;
            render();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
