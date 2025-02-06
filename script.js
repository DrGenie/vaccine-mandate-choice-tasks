// Global variables for slide navigation, response storage, and timing
let currentSlideIndex = 0;
let slides = [];
let responses = [];
let taskStartTime = 0; // Records the start time for each dynamic task slide

document.addEventListener("DOMContentLoaded", () => {
  // Attach event listeners for static slides
  document.getElementById("intro-next").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-2").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-3").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-4").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-5").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-6").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-7").addEventListener("click", nextSlide);
  document.getElementById("scenario-next").addEventListener("click", nextSlide);
  document.getElementById("example-next").addEventListener("click", nextSlide);
  document.getElementById("instr-back").addEventListener("click", prevSlide);
  document.getElementById("start-tasks").addEventListener("click", nextSlide);
  
  // Attach back button listeners for static slides
  document.getElementById("tutorial-back-2").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-3").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-4").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-5").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-6").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-7").addEventListener("click", prevSlide);
  document.getElementById("example-back").addEventListener("click", prevSlide);
  document.getElementById("scenario-back").addEventListener("click", prevSlide);
  
  // Attach listener for "Play Explanation" button using SpeechSynthesis (Australian English)
  document.getElementById("play-explanation").addEventListener("click", () => {
    const explanationText = "For this example, Vaccine Mandate A requires only high risk occupations to be vaccinated, activates early when there are 50 cases per one hundred thousand people with a ten percent weekly increase, is lifted once fifty percent of the population is vaccinated, offers no extra incentives, allows only medical exemptions, and has a low opportunity cost. Choosing this option means you prefer a more targeted and less burdensome approach.";
    const utterance = new SpeechSynthesisUtterance(explanationText);
    utterance.lang = "en-AU";
    speechSynthesis.speak(utterance);
  });

  // Generate dynamic task slides (9 choice tasks)
  generateTaskSlides();

  // Refresh the slides array after dynamic slides are added
  slides = Array.from(document.querySelectorAll(".slide"));

  // Show the first slide
  showSlide(currentSlideIndex);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  // If the current slide is a dynamic task slide, record its start time
  if (slides[index].classList.contains("task-slide")) {
    taskStartTime = Date.now();
  }
}

function nextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
  }
}

function prevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
  }
}

function generateTaskSlides() {
  // Define tasks data (using one block for demonstration)
  const block1 = {
    block: 1,
    scenarios: [
      {
        scenario: 1,
        mandateA: {
          scope: "High-risk occupations only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "No incentives",
          exemption: "Medical exemptions only",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          exemption: "Medical and religious exemptions",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      // ... (Include scenarios 2 through 8 similarly)
      {
        scenario: 9,
        mandateA: {
          scope: "High-risk occupations only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          exemption: "Medical exemptions only",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "No incentives",
          exemption: "Medical, religious, and broad personal belief",
          cost: "Low opportunity cost (AUD5)"
        }
      }
    ]
  };

  const scenarios = block1.scenarios;
  const taskContainer = document.getElementById("task-slides");
  scenarios.forEach((scenarioData, idx) => {
    const taskSlide = document.createElement("div");
    taskSlide.className = "slide task-slide";
    taskSlide.id = `task-slide-${scenarioData.scenario}`;
    
    const title = document.createElement("h2");
    title.textContent = `Scenario ${scenarioData.scenario}`;
    taskSlide.appendChild(title);
    
    // Create a comparison table with info icons for each attribute label
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
    
    const tbody = document.createElement("tbody");
    const attributes = ["scope", "threshold", "coverage", "incentives", "exemption", "cost"];
    attributes.forEach(attr => {
      const row = document.createElement("tr");
      const tdAttr = document.createElement("td");
      tdAttr.innerHTML = `${capitalize(attr)} <span class="info-icon" data-tooltip="${getAttributeDescription(attr)}">ℹ️</span>`;
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
    taskSlide.appendChild(table);
    
    // Create a form for the choice questions
    const form = document.createElement("form");
    form.id = `form-task-${scenarioData.scenario}`;
    form.innerHTML = `
      <div class="questions">
        <fieldset required>
          <legend>Which vaccine mandate option would you prefer? (Pick one option)</legend>
          <label>
            <input type="radio" name="choice" value="A" required>
            I prefer Vaccine Mandate A – you are choosing the policy features shown in column A.
          </label>
          <label>
            <input type="radio" name="choice" value="B" required>
            I prefer Vaccine Mandate B – you are choosing the policy features shown in column B.
          </label>
        </fieldset>
        <fieldset required>
          <legend>If you could opt out of a mandate entirely, would your choice remain the same?</legend>
          <label>
            <input type="radio" name="not_choose" value="same" required>
            Yes, my choice would remain the same.
          </label>
          <label>
            <input type="radio" name="not_choose" value="change" required>
            No, I would prefer not to choose any mandate.
          </label>
        </fieldset>
      </div>
    `;
    taskSlide.appendChild(form);
    
    // Navigation buttons for dynamic task slides
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
      const form = taskSlide.querySelector("form");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Record response time for this task slide
      const responseTime = Date.now() - taskStartTime;
      saveResponse(form, responseTime);
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

function saveResponse(form, responseTime) {
  const choice = form.get("choice");
  const notChoose = form.get("not_choose");
  responses.push({
    scenario: form.id.split("-").pop(),
    choice: choice,
    not_choose: notChoose,
    responseTime: responseTime
  });
}

function submitResponses() {
  let emailContent = "Survey Responses:\n";
  responses.forEach(resp => {
    emailContent += `Scenario: ${resp.scenario}, Choice: ${resp.choice}, Not Choose: ${resp.not_choose}, Response Time: ${resp.responseTime} ms\n`;
  });
  
  const templateParams = {
    to_email: "mesfin.genie@newcastle.edu.au",
    subject: "To mandate or not to mandate? Vaccine Mandate Survey (For Research Team Only)",
    message: emailContent,
    timestamp: new Date().toLocaleString()
  };
  
  emailjs.send("service_zp0gsia", "template_2qu14s5", templateParams)
    .then((result) => {
      showThankYou();
    }, (error) => {
      console.error("Submission failed:", error);
      alert("There was an error submitting your responses. Please check your EmailJS configuration and try again.");
    });
}

function showThankYou() {
  const container = document.getElementById("survey-container");
  container.innerHTML = `<div class="message">Thank you for completing the survey!</div>`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getAttributeDescription(attr) {
  const desc = {
    scope: "Indicates who must be vaccinated. 'High-risk occupations only' means only essential or critical workers are mandated; 'All occupations and public spaces' applies universally.",
    threshold: "Sets the infection level required to activate the mandate. Lower thresholds trigger the mandate early, while higher thresholds delay intervention until the outbreak is severe.",
    coverage: "Specifies the vaccination percentage needed to lift the mandate. A lower percentage leads to earlier lifting, whereas a higher percentage requires near-universal vaccination.",
    incentives: "Describes any rewards provided to encourage vaccination, such as extra leave or financial benefits.",
    exemption: "Outlines who is permitted to opt out. Narrow exemptions (medical only) limit opt-outs; broader exemptions allow additional reasons such as religious or personal beliefs.",
    cost: "Represents the personal or economic burden of complying with the mandate. Options range from no cost (A$0) to high cost (A$50)."
  };
  return desc[attr] || "";
}

function getIcon(attr, value) {
  if (attr === "scope") {
    if (value.includes("High-risk")) {
      return `<span class="icon-tooltip" title="High-risk occupations only: Only essential workers are mandated.">⚠️</span>`;
    } else {
      return `<span class="icon-tooltip" title="All occupations and public spaces: Applies to everyone.">🌐</span>`;
    }
  }
  if (attr === "threshold") {
    if (value.includes("50 cases")) {
      return `<span class="icon-tooltip" title="50 cases per 100k, 10% increase: Activates early to curb outbreaks.">🟢</span>`;
    } else if (value.includes("100 cases")) {
      return `<span class="icon-tooltip" title="100 cases per 100k, 15% increase: Activates at a moderate level.">🟠</span>`;
    } else if (value.includes("200 cases")) {
      return `<span class="icon-tooltip" title="200 cases per 100k, 20% increase: Activates only when the outbreak is severe.">🔴</span>`;
    }
  }
  if (attr === "coverage") {
    let percentage = 0;
    if (value.includes("50")) percentage = 50;
    else if (value.includes("70")) percentage = 70;
    else if (value.includes("90")) percentage = 90;
    return `<span class="icon-tooltip" title="${value}"><svg class="progress-svg" viewBox="0 0 30 6">
              <rect width="30" height="6" fill="#ddd"/>
              <rect width="${30 * percentage / 100}" height="6" fill="#4caf50"/>
            </svg></span>`;
  }
  if (attr === "incentives") {
    if (value.includes("No incentives")) {
      return `<span class="icon-tooltip" title="No incentives provided.">🚫</span>`;
    } else if (value.includes("Paid time off")) {
      return `<span class="icon-tooltip" title="Paid time off: Provides extra leave to compensate for time lost.">🕒</span>`;
    } else if (value.includes("10% discount")) {
      return `<span class="icon-tooltip" title="10% discount: Provides a financial benefit.">💸</span>`;
    }
  }
  if (attr === "exemption") {
    if (value.includes("Medical exemptions only")) {
      return `<span class="icon-tooltip" title="Medical exemptions only: Only those with verified health risks can opt out.">🩺</span>`;
    } else if (value.includes("Medical and religious exemptions")) {
      return `<span class="icon-tooltip" title="Medical and religious exemptions: Permits opt-out for both health and religious reasons.">🩺🙏</span>`;
    } else if (value.toLowerCase().includes("broad")) {
      return `<span class="icon-tooltip" title="Broad exemptions: Allows a wide range of opt-out reasons.">🩺🙏💡</span>`;
    }
  }
  if (attr === "cost") {
    if (value.includes("AUD0")) {
      return `<span class="icon-tooltip" title="No opportunity cost (A$0): No personal or economic sacrifice required.">$0</span>`;
    } else if (value.includes("AUD5")) {
      return `<span class="icon-tooltip" title="Low opportunity cost (A$5): Minimal burden.">$</span>`;
    } else if (value.includes("AUD20")) {
      return `<span class="icon-tooltip" title="Moderate opportunity cost (A$20): Typical burden.">$ $</span>`;
    } else if (value.includes("AUD50")) {
      return `<span class="icon-tooltip" title="High opportunity cost (A$50): Significant burden.">$ $ $</span>`;
    }
  }
  return "";
}
