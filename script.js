// Global variables
let currentSlideIndex = 0;
let slides = [];
let responses = [];
let taskStartTime = 0;
let userBlock = null;

document.addEventListener("DOMContentLoaded", () => {
  // Next-button event listeners for the static slides
  document.getElementById("intro-next").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-2").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-3").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-4").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-5").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-6").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-7").addEventListener("click", nextSlide);
  document.getElementById("scenario-next").addEventListener("click", nextSlide);
  document.getElementById("example-next").addEventListener("click", nextSlide);

  // Back-button event listeners
  document.getElementById("tutorial-back-2").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-3").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-4").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-5").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-6").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-7").addEventListener("click", prevSlide);
  document.getElementById("scenario-back").addEventListener("click", prevSlide);
  document.getElementById("example-back").addEventListener("click", prevSlide);
  document.getElementById("instr-back").addEventListener("click", prevSlide);

  // Start tasks button
  document.getElementById("start-tasks").addEventListener("click", onStartTasks);

  // SpeechSynthesis example
  document.getElementById("play-explanation").addEventListener("click", () => {
    const explanationText =
      "This example shows how each mandate attribute can influence your preference. Consider scope, threshold, coverage, incentives, exemptions, and cost. Decide whether you'd keep the same preference or choose no mandate at all.";
    const utterance = new SpeechSynthesisUtterance(explanationText);
    const voices = speechSynthesis.getVoices();
    const auVoice = voices.find(v => v.lang === "en-AU");
    if (auVoice) {
      utterance.voice = auVoice;
    }
    speechSynthesis.speak(utterance);
  });

  // Block selection to enable "Start Tasks" button
  const blockSelect = document.getElementById("block-select");
  blockSelect.addEventListener("change", () => {
    document.getElementById("start-tasks").disabled = (blockSelect.value === "");
  });

  // Collect all static slides
  slides = Array.from(document.querySelectorAll(".slide"));
  showSlide(currentSlideIndex);
});

/**
 * Show the slide at currentSlideIndex
 */
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  // If this is a dynamic task slide, record the start time
  if (slides[index] && slides[index].classList.contains("task-slide")) {
    taskStartTime = Date.now();
  }
}

/**
 * Move to the next slide
 */
function nextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
  }
}

/**
 * Move to the previous slide
 */
function prevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
  }
}

/**
 * Called when user clicks "Start Tasks" after selecting a block
 */
function onStartTasks() {
  userBlock = document.getElementById("block-select").value;
  if (!userBlock) return;
  nextSlide(); // move forward from the block selection slide
  generateTaskSlides(userBlock);
  // Re-collect slides including newly generated tasks
  slides = Array.from(document.querySelectorAll(".slide"));
  showSlide(currentSlideIndex);
}

/**
 * Generate exactly 9 tasks for the chosen block
 */
function generateTaskSlides(chosenBlock) {
  const allScenarios = fullScenarioList();
  const scenarios = allScenarios.filter(s => s.block.toString() === chosenBlock);

  const taskContainer = document.getElementById("task-slides");

  scenarios.forEach((scenarioData, idx) => {
    const taskSlide = document.createElement("div");
    taskSlide.className = "slide task-slide";
    taskSlide.id = `task-slide-${scenarioData.block}-${scenarioData.scenario}`;

    const title = document.createElement("h2");
    title.textContent = `Block ${scenarioData.block}, Scenario ${scenarioData.scenario}`;
    taskSlide.appendChild(title);

    // Create a table for the two mandates
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Attribute", "Vaccine Mandate A", "Vaccine Mandate B"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const attributes = ["scope", "exemption", "threshold", "coverage", "incentives", "cost"];
    const tbody = document.createElement("tbody");
    attributes.forEach(attr => {
      const row = document.createElement("tr");

      // Left-most cell: attribute name + info icon
      const tdAttr = document.createElement("td");
      tdAttr.innerHTML = `
        <strong>${capitalize(attr)}</strong><br>
        <span class="info-icon" data-tooltip="${getAttributeDescription(attr)}">ℹ️</span>
      `;
      row.appendChild(tdAttr);

      // Mandate A cell
      const tdA = document.createElement("td");
      let valA = scenarioData.mandateA[attr];
      if (attr === "exemption") valA = interpretExemption(valA);
      tdA.innerHTML = `${getIcon(attr, valA)} ${valA}`;
      row.appendChild(tdA);

      // Mandate B cell
      const tdB = document.createElement("td");
      let valB = scenarioData.mandateB[attr];
      if (attr === "exemption") valB = interpretExemption(valB);
      tdB.innerHTML = `${getIcon(attr, valB)} ${valB}`;
      row.appendChild(tdB);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    taskSlide.appendChild(table);

    // Create a form for user’s preference
    const form = document.createElement("form");
    form.id = `form-task-${scenarioData.block}-${scenarioData.scenario}`;
    form.innerHTML = `
      <div class="questions">
        <fieldset>
          <legend>Which vaccine mandate option would you prefer? (pick only one option)</legend>
          <label>
            <input type="radio" name="choice" value="Vaccine Mandate A" required>
            I prefer Vaccine Mandate A
          </label>
          <br>
          <label>
            <input type="radio" name="choice" value="Vaccine Mandate B" required>
            I prefer Vaccine Mandate B
          </label>
        </fieldset>
        <fieldset>
          <legend>If you have the option not to choose any of these vaccine mandates, will your choice remain the same?</legend>
          <label>
            <input type="radio" name="not_choose" value="same" required>
            Yes, my choice will remain the same.
          </label>
          <br>
          <label>
            <input type="radio" name="not_choose" value="change" required>
            No, my choice will change, now I prefer not to choose any of these vaccine mandates.
          </label>
        </fieldset>
      </div>
    `;
    taskSlide.appendChild(form);

    // Nav buttons
    const navDiv = document.createElement("div");
    navDiv.className = "navigation-buttons";

    const backBtn = document.createElement("button");
    backBtn.className = "back-button";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      prevSlide();
    });
    navDiv.appendChild(backBtn);

    const nextBtn = document.createElement("button");
    nextBtn.className = "next-button";
    nextBtn.textContent = (idx === scenarios.length - 1) ? "Submit" : "Next";
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Validate form
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const responseTime = Date.now() - taskStartTime;
      saveResponse(scenarioData.block, scenarioData.scenario, form, responseTime);
      nextSlide();
      if (idx === scenarios.length - 1) {
        setTimeout(submitResponses, 300);
      }
    });
    navDiv.appendChild(nextBtn);

    taskSlide.appendChild(navDiv);
    taskContainer.appendChild(taskSlide);
  });
}

/**
 * Save the user’s choice for one scenario
 */
function saveResponse(block, scenario, form, responseTime) {
  const formData = new FormData(form);
  const choice = formData.get("choice");
  const notChoose = formData.get("not_choose");
  responses.push({
    block: block,
    scenario: scenario,
    choice: choice,
    not_choose: notChoose,
    responseTime: responseTime
  });
}

/**
 * Attempt to send responses via EmailJS; fallback CSV if failure
 */
function submitResponses() {
  let emailContent = "Survey Responses:\n\n";
  responses.forEach(resp => {
    emailContent += `Block: ${resp.block}, Scenario: ${resp.scenario}\n`;
    emailContent += `Preferred Mandate: ${resp.choice}\n`;
    emailContent += `No-mandate Option? ${resp.not_choose}\n`;
    emailContent += `Response Time (ms): ${resp.responseTime}\n\n`;
  });

  const templateParams = {
    to_email: "mesfin.genie@newcastle.edu.au", // or your target email
    subject: "Vaccine Mandate Survey Responses",
    message: emailContent,
    timestamp: new Date().toLocaleString()
  };

  emailjs.send("service_zp0gsia", "template_2qu14s5", templateParams)
    .then(() => {
      showThankYou();
      alert("Your responses have been sent via email. Thank you!");
    }, (error) => {
      console.error("Submission failed:", error);
      alert("Error submitting responses via email. Please download the CSV file instead.");
      showThankYou();
      showCSVDownload();
    });
}

/**
 * Show the final thank-you slide
 */
function showThankYou() {
  const container = document.getElementById("survey-container");
  container.innerHTML = `
    <div class="message">
      <h2>Thank You!</h2>
      <p>Your responses have been recorded. If email delivery failed, please download the CSV below.</p>
      <div id="csv-container" style="text-align:center; margin-top:20px;"></div>
    </div>
  `;
  showCSVDownload();
}

/**
 * Create a CSV download link for fallback or extra confirmation
 */
function showCSVDownload() {
  const csvContainer = document.getElementById("csv-container");
  if (!csvContainer) return;

  const csvContent = convertResponsesToCSV(responses);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "vaccine_mandate_survey_responses.csv";
  link.textContent = "Download CSV of Responses";
  link.style.display = "inline-block";
  link.style.marginTop = "10px";
  link.style.background = "#0a9396";
  link.style.color = "#fff";
  link.style.padding = "10px 15px";
  link.style.borderRadius = "4px";
  link.style.textDecoration = "none";
  csvContainer.appendChild(link);
}

/**
 * Convert the responses array to CSV format
 */
function convertResponsesToCSV(data) {
  let csv = "Block,Scenario,Choice,NoMandateOption,ResponseTime(ms)\n";
  data.forEach(item => {
    csv += `${item.block},${item.scenario},${item.choice},${item.not_choose},${item.responseTime}\n`;
  });
  return csv;
}

/**
 * Provide short text for attribute descriptions (used by ℹ️ tooltips)
 * Now with more detailed explanations for each attribute
 */
function getAttributeDescription(attr) {
  const desc = {
    scope: "Specifies who must be vaccinated—either only high-risk jobs or everyone in public/work spaces.",
    threshold: "Infection rate that triggers the mandate—earlier triggers aim to contain outbreaks sooner, while later triggers allow more initial freedom.",
    coverage: "The vaccination percentage needed to lift the mandate (50%, 70%, or 90%). Higher coverage = stricter requirement.",
    incentives: "Whether people receive paid time off, financial discounts, or no special benefits for getting vaccinated.",
    exemption: "Reasons to skip vaccination: strictly medical, medical+religious, or adding personal beliefs too.",
    cost: "Time/money burden—could be none (AUD0), low (AUD5), moderate (AUD20), or high (AUD50)."
  };
  return desc[attr] || "Attribute information not available.";
}

/**
 * Interpret numeric exemption codes
 */
function interpretExemption(code) {
  if (code === "1") return "Medical exemptions only";
  if (code === "2") return "Medical and religious exemptions";
  if (code === "3") return "Medical, religious, and broad personal belief exemptions";
  return "Unknown exemption code";
}

/**
 * Return an appropriate icon for each attribute value
 */
function getIcon(attr, value) {
  // Scope
  if (attr === "scope") {
    if (value.includes("High-risk")) {
      return `<span class="icon-tooltip" title="High-risk occupations only.">⚠️</span>`;
    } else {
      return `<span class="icon-tooltip" title="All occupations and public spaces.">🌐</span>`;
    }
  }

  // Exemption
  if (attr === "exemption") {
    if (value.includes("Medical exemptions only")) {
      return `<span class="icon-tooltip" title="Strictly medical reasons.">🩺</span>`;
    } else if (value.includes("medical and religious")) {
      return `<span class="icon-tooltip" title="Medical & religious.">🩺🙏</span>`;
    } else if (value.includes("broad personal belief")) {
      return `<span class="icon-tooltip" title="Medical, religious, & personal beliefs.">🩺🙏💡</span>`;
    }
  }

  // Threshold
  if (attr === "threshold") {
    if (value.includes("50 cases")) {
      return `<span class="icon-tooltip" title="Early trigger threshold.">🟢</span>`;
    } else if (value.includes("100 cases")) {
      return `<span class="icon-tooltip" title="Moderate trigger threshold.">🟠</span>`;
    } else if (value.includes("200 cases")) {
      return `<span class="icon-tooltip" title="Late trigger threshold.">🔴</span>`;
    }
  }

  // Coverage
  if (attr === "coverage") {
    if (value.includes("50%")) {
      return `
        <span class="icon-tooltip" title="${value}">
          <svg class="progress-svg" viewBox="0 0 30 6">
            <rect width="30" height="6" fill="#ddd"/>
            <rect width="15" height="6" fill="#4caf50"/>
          </svg>
        </span>`;
    } else if (value.includes("70%")) {
      return `
        <span class="icon-tooltip" title="${value}">
          <svg class="progress-svg" viewBox="0 0 30 6">
            <rect width="30" height="6" fill="#ddd"/>
            <rect width="21" height="6" fill="#4caf50"/>
          </svg>
        </span>`;
    } else if (value.includes("90%")) {
      return `
        <span class="icon-tooltip" title="${value}">
          <svg class="progress-svg" viewBox="0 0 30 6">
            <rect width="30" height="6" fill="#ddd"/>
            <rect width="27" height="6" fill="#4caf50"/>
          </svg>
        </span>`;
    }
  }

  // Incentives
  if (attr === "incentives") {
    if (/^no/i.test(value) || value === "None") {
      return `<span class="icon-tooltip" title="No incentives offered.">🚫</span>`;
    } else if (value.includes("Paid time off")) {
      return `<span class="icon-tooltip" title="Paid leave (1–3 days).">🕒</span>`;
    } else if (value.includes("10% discount")) {
      return `<span class="icon-tooltip" title="10% discount on government services.">💸</span>`;
    }
  }

  // Cost
  if (attr === "cost") {
    if (value.includes("AUD0")) {
      return `<span class="icon-tooltip" title="No cost (AUD0).">💰 x 0</span>`;
    } else if (value.includes("AUD5")) {
      return `<span class="icon-tooltip" title="Low cost (~AUD5).">💰</span>`;
    } else if (value.includes("AUD20")) {
      return `<span class="icon-tooltip" title="Moderate cost (~AUD20).">💰💰</span>`;
    } else if (value.includes("AUD50")) {
      return `<span class="icon-tooltip" title="High cost (~AUD50).">💰💰💰</span>`;
    }
  }

  return "";
}

/**
 * Capitalize attribute labels
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * The full 36-scenario list, each with block, scenario, and two mandates
 * (9 scenarios per block)
 */
function fullScenarioList() {
  return [
    {
      block: 3,
      scenario: 1,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      block: 3,
      scenario: 2,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 1,
      scenario: 3,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "No opportunity cost (AUD0)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 3,
      scenario: 4,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 2,
      scenario: 5,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 3,
      scenario: 6,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 1,
      scenario: 7,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 1,
      scenario: 8,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      block: 4,
      scenario: 9,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 4,
      scenario: 10,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      block: 2,
      scenario: 11,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 2,
      scenario: 12,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 3,
      scenario: 13,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 4,
      scenario: 14,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 1,
      scenario: 15,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 2,
      scenario: 16,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      block: 3,
      scenario: 17,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 1,
      scenario: 18,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      block: 1,
      scenario: 19,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 3,
      scenario: 20,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 2,
      scenario: 21,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 2,
      scenario: 22,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 4,
      scenario: 23,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      block: 3,
      scenario: 24,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 2,
      scenario: 25,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 4,
      scenario: 26,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 1,
      scenario: 27,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      }
    },
    {
      block: 4,
      scenario: 28,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 4,
      scenario: 29,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 1,
      scenario: 30,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 4,
      scenario: 31,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "No opportunity cost (AUD0)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 4,
      scenario: 32,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Low opportunity cost (AUD5)"
      }
    },
    {
      block: 2,
      scenario: 33,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Low vaccine coverage (50% vaccine coverage)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 2,
      scenario: 34,
      mandateA: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "Low opportunity cost (AUD5)"
      },
      mandateB: {
        scope: "High-risk occupations only",
        exemption: "3",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "None",
        cost: "Moderate opportunity cost (AUD20)"
      }
    },
    {
      block: 3,
      scenario: 35,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "200 cases per 100k people with a 20% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "A 10% discount on government services",
        cost: "No opportunity cost (AUD0)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "None",
        cost: "High opportunity cost (AUD50)"
      }
    },
    {
      block: 1,
      scenario: 36,
      mandateA: {
        scope: "High-risk occupations only",
        exemption: "2",
        threshold: "50 cases per 100k people with a 10% weekly increase",
        coverage: "High vaccine coverage (90% vaccine coverage)",
        incentives: "Paid time off for vaccination (1-3 days)",
        cost: "High opportunity cost (AUD50)"
      },
      mandateB: {
        scope: "All occupations and public spaces",
        exemption: "1",
        threshold: "100 cases per 100k people with a 15% weekly increase",
        coverage: "Moderate vaccine coverage (70% vaccine coverage)",
        incentives: "None",
        cost: "Low opportunity cost (AUD5)"
      }
    }
  ];
}
