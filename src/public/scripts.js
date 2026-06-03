const state = {
    currentStep: 1,
    company: {},
    forces: [],
    classification: null,
    axes: null,
    scenarios: null,
    windTunnelResult: null,
    sessionId: null,
    history: [],
    loading: false
};

const elements = {
    nodes: document.querySelectorAll('.step-node'),
    contents: document.querySelectorAll('.step-content'),
    forceInput: document.getElementById('force-input'),
    forcesContainer: document.getElementById('forces-container'),
    resultBox: document.getElementById('result-box'),
    jsonResult: document.getElementById('json-result')
};

// UI Helpers
const updateUI = () => {
    elements.nodes.forEach(node => {
        const s = parseInt(node.dataset.step);
        node.className = 'step-node';
        if (s === state.currentStep) node.classList.add('active');
        if (s < state.currentStep) node.classList.add('completed');
    });

    elements.contents.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`content-${state.currentStep}`).classList.add('active');
};

const setLoading = (step, isLoading) => {
    state.loading = isLoading;
    const btn = document.getElementById(`btn-${step}`);
    const loader = btn.querySelector('.loader');
    const span = btn.querySelector('span');
    
    if (isLoading) {
        loader.style.display = 'block';
        btn.disabled = true;
        span.style.opacity = '0.5';
    } else {
        loader.style.display = 'none';
        btn.disabled = false;
        span.style.opacity = '1';
    }
};

const showResult = (data) => {
    elements.resultBox.classList.add('active');
    elements.jsonResult.textContent = JSON.stringify(data, null, 2);
    elements.resultBox.scrollTop = 0;
};

// Force Tags Logic
elements.forceInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
        const force = e.target.value.trim();
        state.forces.push(force);
        const chip = document.createElement('div');
        chip.className = 'force-chip';
        chip.innerHTML = `${force} <span class="remove-force" data-force="${force}">×</span>`;
        elements.forcesContainer.appendChild(chip);
        e.target.value = '';
    }
});

// Event Delegation for Force Removal
elements.forcesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-force')) {
        const force = e.target.getAttribute('data-force');
        state.forces = state.forces.filter(f => f !== force);
        e.target.parentElement.remove();
    }
});

// API Logic
const callAPI = async (endpoint, body) => {
    try {
        const response = await fetch(`/api/v1/workshop/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        if (result.sessionId) state.sessionId = result.sessionId;
        if (result.success) return result;
        throw new Error(result.message || result.error || 'Request failed');
    } catch (error) {
        alert(`Error: ${error.message}`);
        return null;
    }
};

// Step Actions
document.getElementById('btn-1').onclick = async () => {
    state.company.name = document.getElementById('company-name').value;
    state.company.industry = document.getElementById('company-industry').value;
    state.company.summary = document.getElementById('company-summary').value;
    state.company.focalQuestion = document.getElementById('company-focal-question').value;
    
    setLoading(1, true);
    const res = await callAPI('classify', {
        sessionId: state.sessionId,
        company: state.company,
        forces: state.forces,
        conversationHistory: state.history
    });
    setLoading(1, false);

    if (res) {
        state.sessionId = res.sessionId;
        state.classification = res.data;
        state.history = res.history;
        showResult(res.data);
        state.currentStep = 2;
        updateUI();
    }
};

document.getElementById('btn-2').onclick = async () => {
    state.company.focalQuestion = document.getElementById('focal-question').value;
    state.company.horizonYear = document.getElementById('horizon-year').value;

    setLoading(2, true);
    const res = await callAPI('axes', {
        sessionId: state.sessionId,
        company: state.company,
        classification: state.classification,
        conversationHistory: state.history
    });
    setLoading(2, false);

    if (res) {
        state.axes = res.data;
        state.history = res.history;
        showResult(res.data);
        state.currentStep = 3;
        updateUI();
    }
};

document.getElementById('btn-3').onclick = async () => {
    setLoading(3, true);
    const res = await callAPI('scenarios', {
        sessionId: state.sessionId,
        company: state.company,
        axes: state.axes,
        forces: state.forces,
        existingScenarios: state.axes.scenarios, // Use preview names/summaries
        conversationHistory: state.history
    });
    setLoading(3, false);

    if (res) {
        state.scenarios = res.data;
        state.history = res.history;
        showResult(res.data);
        state.currentStep = 4;
        updateUI();
    }
};

document.getElementById('btn-4').onclick = async () => {
    const options = document.getElementById('options-input').value.split('\n').filter(o => o.trim());
    
    setLoading(4, true);
    const res = await callAPI('windtunnel', {
        sessionId: state.sessionId,
        company: state.company,
        scenarios: state.scenarios.scenarios,
        strategicOptions: options,
        conversationHistory: state.history
    });
    setLoading(4, false);

    if (res) {
        state.windTunnelResult = res.data;
        state.history = res.history;
        showResult(res.data);
        state.currentStep = 5;
        updateUI();
    }
};

document.getElementById('btn-5').onclick = async () => {
    setLoading(5, true);
    const res = await callAPI('report', {
        sessionId: state.sessionId,
        workshopState: {
            company: state.company,
            classification: state.classification,
            axes: state.axes,
            scenarios: state.scenarios,
            windTunnelResult: state.windTunnelResult
        }
    });
    setLoading(5, false);

    if (res) {
        showResult(res.data);
    }
};
