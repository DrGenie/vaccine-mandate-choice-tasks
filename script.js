// Tasks definition – four blocks with 9 scenarios each.
// For demonstration, blocks 2, 3, and 4 duplicate block 1's scenarios.
const block1 = {
  block: 1,
  scenarios: [
    {
      scenario: 1,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "Medical exemptions only",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Low vaccine coverage (50%)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "Medical and religious exemptions",
        threshold: "100 cases per 100k, 15% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      scenario: 2,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "Medical exemptions only",
        threshold: "200 cases per 100k, 20% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "10% discount on government services",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "Medical and religious exemptions",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Low vaccine coverage (50%)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      scenario: 3,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "Medical and religious exemptions",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Low vaccine coverage (50%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "Medical exemptions only",
        threshold: "100 cases per 100k, 15% increase",
        coverage: "High vaccine coverage (90%)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      scenario: 4,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "Medical and religious exemptions",
        threshold: "100 cases per 100k, 15% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "Medical exemptions only",
        threshold: "200 cases per 100k, 20% increase",
        coverage: "High vaccine coverage (90%)",
        incentives: "10% discount on government services",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      scenario: 5,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "Medical, religious, and broad personal belief",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "Medical and religious exemptions",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Low vaccine coverage (50%)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      scenario: 6,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "Medical exemptions only",
        threshold: "100 cases per 100k, 15% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "Medical, religious, and broad personal belief",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Low vaccine coverage (50%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      scenario: 7,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "Medical and religious exemptions",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Low vaccine coverage (50%)",
        incentives: "10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "Medical and religious exemptions",
        threshold: "200 cases per 100k, 20% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      scenario: 8,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "Medical exemptions only",
        threshold: "200 cases per 100k, 20% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "Medical and religious exemptions",
        threshold: "100 cases per 100k, 15% increase",
        coverage: "High vaccine coverage (90%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      scenario: 9,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "Medical exemptions only",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Low vaccine coverage (50%)",
        incentives: "Paid time off for vaccination (1–3 days)",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "Medical, religious, and broad personal belief",
        threshold: "50 cases per 100k, 10% increase",
        coverage: "Moderate vaccine coverage (70%)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      }
    }
  ]
};

// For demonstration purposes, duplicate block1 for blocks 2–4.
const tasks = [
  block1,
  { block: 2, scenarios: block1.scenarios },
  { block: 3, scenarios: block1.scenarios },
  { block: 4, scenarios: block1.scenarios }
];

// Randomly select one block so that each respondent gets 9 tasks.
const availableBlocks = tasks;
const selectedBlock = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
const scenarios = selectedBlock.scenarios;

let currentScenarioIndex = 0;
const responses = [];

document.addEventListener("DOMContentLoaded", () => {
  renderScenario(currentScenarioIndex);
});

function renderScenario(index) {
  const container = document.getElementById("choice-task-container");
  container.innerHTML = ""; // clear previous content
  const scenarioData = scenarios[index];

  const scenarioDiv = document.createElement("div");
  scenarioDiv.className = "scenario-page active";
  scenarioDiv.id = `scenario-${scenarioData.scenario}`;

  // Scenario Title
  const title = document.createElement("h2");
  title.textContent = `Scenario ${scenarioData.scenario}`;
  scenarioDiv.appendChild(title);

  // Table for attributes
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Attribute", "Mandate A", "Mandate B"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  const attributes = ["scope", "exemption", "threshold", "coverage", "incentives", "cost"];
  attributes.forEach(attr => {
    const row = document.createElement("tr");

    const tdAttr = document.createElement("td");
    tdAttr.textContent = capitalize(attr);
    tdAttr.title = getAttributeDescription(attr);
    row.appendChild(tdAttr);

    const tdA = document.createElement("td");
    tdA.innerHTML = getIcon(attr, scenarioData.mandateA[attr]) + " " + scenarioData.mandateA[attr];
    row.appendChild(tdA);

    const tdB = document.createElement("td");
    tdB.innerHTML = getIcon(attr, scenarioData.mandateB[attr]) + " " + scenarioData.mandateB[attr];
    row.appendChild(tdB);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  scenarioDiv.appendChild(table);

  // Form with required questions
  const form = document.createElement("form");
  form.id = `form-${scenarioData.scenario}`;
  form.innerHTML = `
    <div class="questions">
      <fieldset required>
        <legend>Which vaccine mandate option would you prefer? (pick only one option)</legend>
        <label>
          <input type="radio" name="choice" value="A" required>
          I prefer Vaccine Mandate A
        </label>
        <label>
          <input type="radio" name="choice" value="B" required>
          I prefer Vaccine Mandate B
        </label>
      </fieldset>
      <fieldset required>
        <legend>If you have the option not to choose any of these vaccine mandates, will your choice remain the same?</legend>
        <label>
          <input type="radio" name="not_choose" value="same" required>
          Yes, my choice will remain the same.
        </label>
        <label>
          <input type="radio" name="not_choose" value="change" required>
          No, my choice will change, now I prefer not to choose any of these vaccine mandates.
        </label>
      </fieldset>
    </div>
  `;
  scenarioDiv.appendChild(form);

  // Next/Submit button
  const nextButton = document.createElement("button");
  nextButton.textContent = (index === scenarios.length - 1) ? "Submit" : "Next";
  nextButton.className = "next-button";
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    saveResponse(scenarioData.scenario, new FormData(form));
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
      renderScenario(currentScenarioIndex);
    } else {
      submitResponses();
    }
  });
  scenarioDiv.appendChild(nextButton);

  container.appendChild(scenarioDiv);
}

function saveResponse(scenarioNumber, formData) {
  const choice = formData.get("choice");
  const notChoose = formData.get("not_choose");
  responses.push({
    block: selectedBlock.block,
    scenario: scenarioNumber,
    choice: choice,
    not_choose: notChoose
  });
}

function submitResponses() {
  // Prepare email content
  let emailContent = "Survey Responses:\n";
  responses.forEach(resp => {
    emailContent += `Block: ${resp.block}, Scenario: ${resp.scenario}, Choice: ${resp.choice}, Not Choose: ${resp.not_choose}\n`;
  });

  const templateParams = {
    to_email: "mesfin.genie@newcastle.edu.au",
    subject: "Vaccine Mandate Survey Responses",
    message: emailContent
  };

  // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your EmailJS service/template IDs
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then((response) => {
      showThankYou();
    }, (error) => {
      console.error("FAILED...", error);
      alert("There was an error submitting your responses. Please try again.");
    });
}

function showThankYou() {
  const container = document.getElementById("choice-task-container");
  container.innerHTML = `<div class="message">Thank you for completing the survey!</div>`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getAttributeDescription(attr) {
  const desc = {
    scope: "2 = All occupations and public spaces; 1 = High-risk occupations only",
    exemption: "2 = Medical and religious exemptions; 3 = Medical, religious, and broad personal belief; 1 = Medical exemptions only",
    threshold: "2 = 100 cases/100k with 15% increase; 3 = 200 cases/100k with 20% increase; 1 = 50 cases/100k with 10% increase",
    coverage: "2 = Moderate (70%); 3 = High (90%); 1 = Low (50%)",
    incentives: "2 = Paid time off (1–3 days); 3 = 10% discount; 1 = None",
    cost: "2 = Moderate (AUD20); 3 = High (AUD50); 4 = No cost (AUD0); 1 = Low (AUD5)"
  };
  return desc[attr] || "";
}

function getIcon(attr, value) {
  if (attr === "scope") {
    if (value.includes("High-risk")) {
      return `<svg width="16" height="16"><circle cx="8" cy="8" r="6" fill="#ff6f61"/></svg>`;
    } else {
      return `<svg width="16" height="16"><rect width="12" height="12" x="2" y="2" fill="#6b5b95"/></svg>`;
    }
  }
  if (attr === "exemption") {
    if (value.includes("Medical exemptions only")) {
      return `<svg width="16" height="16"><polygon points="8,2 14,14 2,14" fill="#88b04b"/></svg>`;
    } else if (value.includes("Medical and religious exemptions")) {
      return `<svg width="16" height="16"><polygon points="8,2 14,14 2,14" fill="#f7cac9"/></svg>`;
    } else if (value.toLowerCase().includes("broad")) {
      return `<svg width="16" height="16"><polygon points="8,2 14,14 2,14" fill="#92a8d1"/></svg>`;
    }
  }
  if (attr === "threshold") {
    if (value.includes("50")) {
      return `<svg width="16" height="16"><ellipse cx="8" cy="8" rx="6" ry="4" fill="#f4a261"/></svg>`;
    } else if (value.includes("100")) {
      return `<svg width="16" height="16"><ellipse cx="8" cy="8" rx="6" ry="4" fill="#e76f51"/></svg>`;
    } else if (value.includes("200")) {
      return `<svg width="16" height="16"><ellipse cx="8" cy="8" rx="6" ry="4" fill="#2a9d8f"/></svg>`;
    }
  }
  if (attr === "coverage") {
    let percentage = 0;
    if (value.includes("50")) percentage = 50;
    else if (value.includes("70")) percentage = 70;
    else if (value.includes("90")) percentage = 90;
    return `<svg width="50" height="10">
              <rect width="50" height="10" fill="#ddd"/>
              <rect width="${50 * percentage / 100}" height="10" fill="#4caf50"/>
            </svg>`;
  }
  if (attr === "incentives") {
    if (value.includes("None")) {
      return `<svg width="16" height="16"><rect width="12" height="12" x="2" y="2" fill="#d3d3d3"/></svg>`;
    } else if (value.includes("Paid time off")) {
      return `<svg width="16" height="16"><rect width="12" height="12" x="2" y="2" fill="#a1cfff"/></svg>`;
    } else if (value.includes("10% discount")) {
      return `<svg width="16" height="16"><rect width="12" height="12" x="2" y="2" fill="#b5e7a0"/></svg>`;
    }
  }
  if (attr === "cost") {
    // Display dollar signs based on cost level
    if (value.includes("AUD5")) {
      return `<span class="dollar-icon">$</span>`;
    } else if (value.includes("AUD20")) {
      return `<span class="dollar-icon">$</span><span class="dollar-icon">$</span>`;
    } else if (value.includes("AUD50")) {
      return `<span class="dollar-icon">$</span><span class="dollar-icon">$</span><span class="dollar-icon">$</span>`;
    } else if (value.includes("AUD0")) {
      return `<span class="dollar-icon" style="color:#32cd32;">$0</span>`;
    }
  }
  return "";
}
