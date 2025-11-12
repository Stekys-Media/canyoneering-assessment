// Canyoneering Assessment - Complete Self-Contained Version
// No external dependencies needed - everything embedded

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

    // Section data
    const sections = {
        'Risk Management': {
            description: 'Understanding hazards, decision-making, and safety protocols',
            content: `
                <h2>Risk Management</h2>
                <h3>The Dunning-Kruger Effect</h3>
                <p><strong>What it means:</strong> The Dunning-Kruger effect is a psychological phenomenon where people with low ability or limited experience overestimate their competence.</p>
                <p><strong>Implications for Canyoneering:</strong></p>
                <ul>
                    <li><strong>Overconfidence of beginners</strong> – New participants might underestimate risks</li>
                    <li><strong>Underestimation of dangers</strong> – Beginners may take shortcuts in safety checks</li>
                    <li><strong>Importance of humility</strong> – Understanding this effect helps participants remain open to instruction</li>
                </ul>
                
                <h3>Heuristic Traps</h3>
                <p><strong>What Are Heuristic Traps?</strong> Mental shortcuts that can lead to errors in high-risk environments.</p>
                <p><strong>Common Traps:</strong></p>
                <ol>
                    <li><strong>Familiarity Trap</strong> – Past success leads to complacency</li>
                    <li><strong>Social Proof</strong> – Following group consensus even when sensing danger</li>
                    <li><strong>Commitment Trap</strong> – Continuing despite risks due to invested time</li>
                    <li><strong>Expert Halo</strong> – Blind trust in authority</li>
                    <li><strong>Scarcity Trap</strong> – Rushing decisions due to time pressure</li>
                </ol>
                
                <h3>Objective and Subjective Hazards</h3>
                <p><strong>Objective Hazards:</strong> Environmental dangers (flash floods, rockfall, cold water)</p>
                <p><strong>Subjective Hazards:</strong> Human factors (poor decisions, fatigue, overconfidence)</p>
                <p>Risk emerges from the interaction of both types.</p>
            `,
            questions: [
                { q: 'What is the Dunning-Kruger effect?', options: ['A rappelling technique', 'When beginners overestimate abilities due to lack of knowledge', 'Rope management system', 'Anchor assessment method'], correct: 1, explanation: 'The Dunning-Kruger effect describes how people with limited experience overestimate their competence.' },
                { q: 'Which is an objective hazard?', options: ['Poor rope management', 'Flash flood from upstream rainfall', 'Inadequate communication', 'Overconfidence in skills'], correct: 1, explanation: 'Objective hazards exist independent of human behavior.' },
                { q: 'What is the Commitment Trap?', options: ['Being too committed to safety', 'Continuing despite risks because of time/effort invested', 'Committing to help team members', 'Making training commitments'], correct: 1, explanation: 'The Commitment Trap occurs when groups continue despite clear risks because of sunk costs.' },
                { q: 'In a risk matrix, what creates EXTREME risk?', options: ['Rare + Minor', 'Almost Certain + Catastrophic', 'Possible + Insignificant', 'Unlikely + Moderate'], correct: 1, explanation: 'Extreme risk combines high likelihood with severe consequences.' },
                { q: 'What should you do with an EXTREME risk rating?', options: ['Proceed with caution', 'Apply backup systems', 'Do not proceed until conditions change', 'Monitor closely'], correct: 2, explanation: 'Extreme ratings require not proceeding until conditions fundamentally change.' }
            ]
        },
        'Rope Knowledge': {
            description: 'Understanding rope construction, materials, and selection',
            content: `
                <h2>Rope Knowledge</h2>
                <h3>Rope Construction</h3>
                <p><strong>Kernmantle:</strong> Core (kern) carries 50-70% of load, sheath (mantle) provides protection</p>
                
                <h3>Materials</h3>
                <ul>
                    <li><strong>Polyester:</strong> Static, UV resistant, maintains strength when wet</li>
                    <li><strong>Nylon:</strong> Dynamic, absorbs impact, good for climbing</li>
                    <li><strong>Polypropylene:</strong> Floats in water, lightweight</li>
                    <li><strong>HMPE (Dyneema):</strong> Highest strength-to-weight ratio</li>
                </ul>
                
                <h3>Selection</h3>
                <p><strong>Ideal diameter:</strong> 9-10mm for all-around canyoneering</p>
                <p><strong>Static rope:</strong> Less than 5% elongation</p>
            `,
            questions: [
                { q: 'What percentage of strength does the core carry?', options: ['20-30%', '50-70%', '80-90%', '100%'], correct: 1, explanation: 'The core carries 50-70% of total rope strength.' },
                { q: 'Which rope material floats?', options: ['Polyester', 'Nylon', 'Polypropylene', 'Aramid'], correct: 2, explanation: 'Polypropylene is less dense than water and floats.' },
                { q: 'Typical stretch for static rope?', options: ['< 5%', '5-10%', '10-15%', '> 15%'], correct: 0, explanation: 'Static ropes have less than 5% elongation.' },
                { q: 'Highest strength-to-weight material?', options: ['Nylon', 'Polyester', 'Aramid', 'HMPE (Dyneema)'], correct: 3, explanation: 'HMPE has the highest strength-to-weight ratio.' },
                { q: 'Ideal rope diameter for canyoneering?', options: ['6-7 mm', '7-8 mm', '9-10 mm', '11-12 mm'], correct: 2, explanation: '9-10 mm provides ideal balance of durability and handling.' }
            ]
        }
    };

    // Render functions
    function render() {
        const root = document.getElementById('canyoneering-root');
        if (!root) return;

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
            <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div style="text-align: center; color: white; margin-bottom: 3rem;">
                        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">🧗 Canyoneering Knowledge Assessment</h1>
                        <p style="font-size: 1.25rem; color: #cbd5e1;">Master essential canyoneering skills and safety knowledge</p>
                    </div>
                    
                    ${Object.entries(sections).map(([name, data]) => `
                        <div style="background: white; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-bottom: 1.5rem; overflow: hidden;">
                            <div onclick="window.toggleSection('${name}')" style="padding: 1.5rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; transition: background 0.2s;">
                                <div style="width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${state.completed[name] ? '#22c55e' : '#e5e7eb'}; color: ${state.completed[name] ? 'white' : '#6b7280'}; font-size: 1.5rem;">
                                    ${state.completed[name] ? '✓' : '📚'}
                                </div>
                                <div style="flex: 1;">
                                    <div style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 0.25rem;">${name}</div>
                                    <div style="color: #6b7280; font-size: 0.875rem;">${data.description}</div>
                                    ${state.completed[name] ? '<span style="display: inline-block; margin-top: 0.5rem; padding: 0.25rem 0.75rem; background: #dcfce7; color: #15803d; border-radius: 1rem; font-size: 0.75rem; font-weight: 600;">✓ Completed</span>' : ''}
                                </div>
                                <div style="font-size: 1.5rem; color: #9ca3af;">${state.expandedSections[name] ? '▲' : '▼'}</div>
                            </div>
                            
                            ${state.expandedSections[name] ? `
                                <div style="padding: 1.5rem; border-top: 1px solid #e5e7eb;">
                                    <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                                        <h4 style="color: #1e40af; margin-bottom: 0.5rem; font-size: 0.95rem;">Section Overview</h4>
                                        <p style="color: #1e40af; font-size: 0.875rem; margin: 0.25rem 0;">• Study comprehensive learning materials</p>
                                        <p style="color: #1e40af; font-size: 0.875rem; margin: 0.25rem 0;">• ${data.questions.length} quiz questions</p>
                                        <p style="color: #1e40af; font-size: 0.875rem; margin: 0;">• 80% required to pass</p>
                                    </div>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                                        <button onclick="window.startLearning('${name}')" style="padding: 1rem; background: #16a34a; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">📖 Study Material</button>
                                        <button onclick="window.startQuiz('${name}')" style="padding: 1rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">🎯 Take Quiz</button>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderLearning(root) {
        const section = sections[state.currentSection];
        root.innerHTML = `
            <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem;">
                <div style="max-width: 1000px; margin: 0 auto;">
                    <div style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                        <button onclick="window.backToHome()" style="padding: 0.75rem 1.5rem; background: #6b7280; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; margin-bottom: 1rem;">← Back to Sections</button>
                        <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${state.currentSection}</h2>
                        <p style="color: #6b7280; margin-bottom: 2rem;">${section.description}</p>
                        <div style="line-height: 1.8; color: #374151;">
                            ${section.content}
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button onclick="window.backToHome()" style="padding: 1rem; background: #6b7280; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">Back</button>
                            <button onclick="window.startQuiz('${state.currentSection}')" style="flex: 1; padding: 1rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">Take Quiz Now</button>
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
                <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem;">
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); text-align: center;">
                            <div style="font-size: 6rem; margin-bottom: 1rem;">${passed ? '🏆' : '📚'}</div>
                            <h2 style="font-size: 2rem; margin-bottom: 1rem;">${passed ? 'Congratulations!' : 'Keep Training'}</h2>
                            <div style="font-size: 3rem; font-weight: 700; color: #2563eb; margin: 1rem 0;">${score}%</div>
                            <p style="color: #6b7280; margin-bottom: 2rem;">${passed ? 'You have demonstrated competency in this section!' : 'You need 80% to pass. Review the material and try again.'}</p>
                            
                            <div style="text-align: left; margin-top: 2rem;">
                                ${section.questions.map((q, i) => {
                                    const userAnswer = state.answers[i];
                                    const correct = userAnswer === q.correct;
                                    return `
                                        <div style="padding: 1rem; border: 2px solid ${correct ? '#22c55e' : '#ef4444'}; background: ${correct ? '#f0fdf4' : '#fef2f2'}; border-radius: 0.5rem; margin-bottom: 1rem;">
                                            <div style="display: flex; gap: 0.75rem;">
                                                <div style="font-size: 1.5rem;">${correct ? '✅' : '❌'}</div>
                                                <div style="flex: 1;">
                                                    <div style="font-weight: 600; margin-bottom: 0.5rem;">${q.q}</div>
                                                    <div style="font-size: 0.875rem; margin: 0.25rem 0;"><strong>Your answer:</strong> ${q.options[userAnswer]}</div>
                                                    ${!correct ? `<div style="font-size: 0.875rem; color: #16a34a; margin: 0.25rem 0;"><strong>Correct answer:</strong> ${q.options[q.correct]}</div>` : ''}
                                                    <div style="font-size: 0.875rem; color: #6b7280; font-style: italic; margin-top: 0.5rem;">${q.explanation}</div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button onclick="window.backToHome()" style="flex: 1; padding: 1rem; background: #6b7280; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">Back to Sections</button>
                                ${!passed ? '<button onclick="window.retakeQuiz()" style="flex: 1; padding: 1rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">Retake Quiz</button>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const q = section.questions[state.currentQuestion];
            const progress = ((state.currentQuestion + 1) / section.questions.length) * 100;
            
            root.innerHTML = `
                <div style="min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%); padding: 2rem;">
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div style="background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                            <div style="margin-bottom: 2rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                                    <div style="font-size: 1.5rem; font-weight: 700;">${state.currentSection}</div>
                                    <div style="color: #6b7280;">Question ${state.currentQuestion + 1} of ${section.questions.length}</div>
                                </div>
                                <div style="width: 100%; height: 0.5rem; background: #e5e7eb; border-radius: 1rem; overflow: hidden;">
                                    <div style="height: 100%; background: #2563eb; width: ${progress}%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            
                            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem;">${q.q}</h3>
                            
                            ${q.options.map((opt, i) => `
                                <div onclick="window.selectAnswer(${i})" style="padding: 1rem; border: 2px solid ${state.answers[state.currentQuestion] === i ? '#2563eb' : '#e5e7eb'}; background: ${state.answers[state.currentQuestion] === i ? '#eff6ff' : 'white'}; border-radius: 0.5rem; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.75rem;">
                                    <div style="width: 1.5rem; height: 1.5rem; border: 2px solid ${state.answers[state.currentQuestion] === i ? '#2563eb' : '#d1d5db'}; background: ${state.answers[state.currentQuestion] === i ? '#2563eb' : 'white'}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                        ${state.answers[state.currentQuestion] === i ? '<div style="width: 0.75rem; height: 0.75rem; background: white; border-radius: 50%;"></div>' : ''}
                                    </div>
                                    <div>${opt}</div>
                                </div>
                            `).join('')}
                            
                            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                                <button onclick="window.prevQuestion()" ${state.currentQuestion === 0 ? 'disabled' : ''} style="padding: 1rem 1.5rem; background: #e5e7eb; color: #1f2937; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; ${state.currentQuestion === 0 ? 'opacity: 0.5; cursor: not-allowed;' : ''}">Previous</button>
                                ${state.currentQuestion === section.questions.length - 1
                                    ? `<button onclick="window.submitQuiz()" ${Object.keys(state.answers).length !== section.questions.length ? 'disabled' : ''} style="flex: 1; padding: 1rem; background: #16a34a; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; ${Object.keys(state.answers).length !== section.questions.length ? 'opacity: 0.5; cursor: not-allowed;' : ''}">Submit Quiz</button>`
                                    : `<button onclick="window.nextQuestion()" ${state.answers[state.currentQuestion] === undefined ? 'disabled' : ''} style="flex: 1; padding: 1rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; ${state.answers[state.currentQuestion] === undefined ? 'opacity: 0.5; cursor: not-allowed;' : ''}">Next Question</button>`
                                }
                            </div>
                            
                            <button onclick="window.backToHome()" style="width: 100%; padding: 0.75rem; background: transparent; color: #6b7280; border: none; cursor: pointer; margin-top: 1rem;">Exit Quiz</button>
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

    // Global functions
    window.toggleSection = (name) => {
        state.expandedSections[name] = !state.expandedSections[name];
        render();
    };

    window.startLearning = (name) => {
        state.view = 'learning';
        state.currentSection = name;
        render();
    };

    window.startQuiz = (name) => {
        state.view = 'quiz';
        state.currentSection = name;
        state.currentQuestion = 0;
        state.answers = {};
        state.showResults = false;
        render();
    };

    window.backToHome = () => {
        state.view = 'home';
        render();
    };

    window.selectAnswer = (index) => {
        state.answers[state.currentQuestion] = index;
        render();
    };

    window.nextQuestion = () => {
        if (state.currentQuestion < sections[state.currentSection].questions.length - 1) {
            state.currentQuestion++;
            render();
        }
    };

    window.prevQuestion = () => {
        if (state.currentQuestion > 0) {
            state.currentQuestion--;
            render();
        }
    };

    window.submitQuiz = () => {
        state.showResults = true;
        const score = calculateScore();
        if (score >= 80) {
            state.completed[state.currentSection] = true;
            localStorage.setItem('canyon-completed', JSON.stringify(state.completed));
        }
        render();
    };

    window.retakeQuiz = () => {
        state.currentQuestion = 0;
        state.answers = {};
        state.showResults = false;
        render();
    };

    // Initialize
    render();
})();
