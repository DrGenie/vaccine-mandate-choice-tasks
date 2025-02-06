// Global variables for slide navigation, responses, and task timing
let currentSlideIndex = 0;
let slides = [];
let responses = [];
let taskStartTime = 0;

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
  document.getElementById("scenario-back").addEventListener("click", prevSlide);
  document.getElementById("example-back").addEventListener("click", prevSlide);
  
  // Generate dynamic task slides
  generateTaskSlides();
  
  // Refresh slides array after dynamic slides are appended
  slides = Array.from(document.querySelectorAll(".slide"));
  
  // Show the first slide
  showSlide(currentSlideIndex);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  // Record start time for dynamic task slides
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
  // Define sample tasks (scenarios 1 and 9 provided; add others similarly)
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
      // (Additional scenarios 2 to 8 would be added here)
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
    
    // Create comparison table with info icons for each attribute label
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
    
    // Create form for choice questions
    const form = document.createElement("form");
    form.id = `form-task-${scenarioData.scenario}`;
    form.innerHTML = `
      <div class="questions">
        <fieldset required>
          <legend>Which vaccine mandate option would you prefer? (Pick one)</legend>
          <label>
            <input type="radio" name="choice" value="A" required>
            I prefer Vaccine Mandate A – I favor the features shown in column A.
          </label>
          <label>
            <input type="radio" name="choice" value="B" required>
            I prefer Vaccine Mandate B – I favor the features shown in column B.
          </label>
        </fieldset>
        <fieldset required>
          <legend>If you had the option to opt out entirely, would your choice remain the same?</legend>
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
    
    // Navigation buttons for dynamic task slide
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
      const currentForm = taskSlide.querySelector("form");
      if (!currentForm.checkValidity()) {
        currentForm.reportValidity();
        return;
      }
      const responseTime = Date.now() - taskStartTime;
      saveResponse(currentForm, responseTime);
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
    .then(() => {
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
    scope: "Indicates who must be vaccinated. 'High-risk occupations only' means only essential workers (e.g., healthcare, emergency services) are required; 'All occupations and public spaces' applies to everyone.",
    threshold: "Sets the infection level that activates the mandate. A lower threshold means earlier intervention, while a higher threshold delays action until the outbreak is severe.",
    coverage: "Specifies the vaccination rate required to lift the mandate. Lower percentages lead to earlier lifting, whereas higher percentages require nearly universal vaccination.",
    incentives: "Describes any rewards offered to encourage vaccination, such as paid time off or financial subsidies.",
    exemption: "Outlines who may opt out of the mandate. A narrow exemption (medical only) restricts opt-outs; broader exemptions (including religious or personal belief) allow more people to opt out.",
    cost: "Represents the economic or personal burden of complying with the mandate. Lower cost means less burden."
  };
  return desc[attr] || "";
}

function getIcon(attr, value) {
  if (attr === "scope") {
    if (value.includes("High-risk")) {
      return `<span class="icon-tooltip" title="High-risk occupations only: Only essential workers are mandated.">⚠️</span>`;
    } else {
      return `<span class="icon-tooltip" title="All occupations and public spaces: Everyone is mandated.">🌐</span>`;
    }
  }
  if (attr === "threshold") {
    if (value.includes("50 cases")) {
      return `<span class="icon-tooltip" title="50 cases per 100k, 10% increase: Activates early.">🟢</span>`;
    } else if (value.includes("100 cases")) {
      return `<span class="icon-tooltip" title="100 cases per 100k, 15% increase: Activates at a moderate level.">🟠</span>`;
    } else if (value.includes("200 cases")) {
      return `<span class="icon-tooltip" title="200 cases per 100k, 20% increase: Activates only when severe.">🔴</span>`;
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
      return `<span class="icon-tooltip" title="Paid time off: Compensates for lost work time.">🕒</span>`;
    } else if (value.includes("10% discount")) {
      return `<span class="icon-tooltip" title="10% discount on government services: Provides a financial incentive.">💸</span>`;
    }
  }
  if (attr === "exemption") {
    if (value.includes("Medical exemptions only")) {
      return `<span class="icon-tooltip" title="Medical exemptions only: Only those with verified health risks can opt out.">🩺</span>`;
    } else if (value.includes("Medical and religious exemptions")) {
      return `<span class="icon-tooltip" title="Medical and religious exemptions: Permits opt-out for health and religious reasons.">🩺🙏</span>`;
    } else if (value.toLowerCase().includes("broad")) {
      return `<span class="icon-tooltip" title="Broad exemptions: Allows a wide range of opt-out reasons.">🩺🙏💡</span>`;
    }
  }
  if (attr === "cost") {
    if (value.includes("AUD5")) {
      return `<span class="icon-tooltip" title="Low opportunity cost (A$5): Minimal burden.">$</span>`;
    } else if (value.includes("AUD20")) {
      return `<span class="icon-tooltip" title="Moderate opportunity cost (A$20): Typical burden.">$ $</span>`;
    } else if (value.includes("AUD50")) {
      return `<span class="icon-tooltip" title="High opportunity cost (A$50): Significant burden.">$ $ $</span>`;
    } else if (value.includes("AUD0")) {
      return `<span class="icon-tooltip" title="No opportunity cost (A$0): No burden.">$0</span>`;
    }
  }
  return "";
}
