// Global variables for slide naavigation, response storage, and timing
let currentSlideIndex = 0;
let slides = [];
let responses = [];
let taskStartTime = 0; // To record response time for each task

document.addEventListener("DOMContentLoaded", () => {
  // Gather all static slides (the ones already in the HTML)
  slides = Array.from(document.querySelectorAll(".slide"));

  // Attach next/back button listeners for static slides
  document.querySelectorAll(".next-button").forEach(btn => {
    btn.addEventListener("click", handleNext);
  });
  document.querySelectorAll(".back-button").forEach(btn => {
    btn.addEventListener("click", handleBack);
  });

  // Generate dynamic task slides (9 choice tasks)
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
  // If the current slide is a dynamic task slide, record its start time
  if (slides[index].classList.contains("task-slide")) {
    taskStartTime = Date.now();
  }
}

function handleNext(e) {
  e.preventDefault();
  // If on a dynamic task slide, record response time and save responses
  const currentSlide = slides[currentSlideIndex];
  if (currentSlide.classList.contains("task-slide")) {
    const form = currentSlide.querySelector("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const responseTime = Date.now() - taskStartTime;
    saveResponse(form, responseTime);
  }
  // If last dynamic task slide, proceed to thank-you slide and submit responses
  if (currentSlideIndex === slides.length - 2) { // second-to-last is last task slide
    nextSlide();
    submitResponses();
  } else {
    nextSlide();
  }
}

function handleBack(e) {
  e.preventDefault();
  prevSlide();
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
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "No incentives",
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
          incentives: "No incentives",
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
          incentives: "No incentives",
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
          incentives: "No incentives",
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
          incentives: "No incentives",
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
          incentives: "No incentives",
          cost: "Low opportunity cost (AUD5)"
        }
      }
    ]
  };

  // For demonstration, use block1
  const selectedBlock = block1;
  const scenarios = selectedBlock.scenarios;
  
  const taskContainer = document.getElementById("task-slides");
  scenarios.forEach((scenarioData, idx) => {
    const taskSlide = document.createElement("div");
    taskSlide.className = "slide task-slide";
    taskSlide.id = `task-slide-${scenarioData.scenario}`;
    
    const title = document.createElement("h2");
    title.textContent = `Scenario ${scenarioData.scenario}`;
    taskSlide.appendChild(title);
    
    // Create a comparison table with tooltips on every attribute
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
    taskSlide.appendChild(table);
    
    // Form for the choice questions
    const form = document.createElement("form");
    form.id = `form-task-${scenarioData.scenario}`;
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
    taskSlide.appendChild(form);
    
    // Navigation buttons (Back and Next)
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
      // Record response time for this task
      const responseTime = Date.now() - taskStartTime;
      saveResponse(form, responseTime);
      nextSlide();
      if (idx === scenarios.length - 1) {
        submitResponses();
      }
    });
    navDiv.appendChild(nextBtn);
    
    taskSlide.appendChild(navDiv);
    taskContainer.appendChild(taskSlide);
    slides.push(taskSlide);
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
    subject: "Vaccine Mandate Survey Responses",
    message: emailContent
  };
  
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
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
    scope: "Defines who must be vaccinated. 'High-risk occupations only' targets critical roles; 'All occupations and public spaces' applies universally.",
    threshold: "Sets the outbreak severity (cases per 100k and weekly increase) required to trigger the mandate.",
    coverage: "Specifies the vaccination percentage required to lift the mandate.",
    incentives: "Indicates whether any incentives (e.g., paid time off, discounts) are provided to encourage vaccination.",
    exemption: "Determines who may opt out: Medical exemptions only, Medical and religious exemptions, or Medical, religious and broad personal belief exemptions.",
    cost: "Represents the opportunity cost of compliance. Lower costs are less burdensome."
  };
  return desc[attr] || "";
}

function getIcon(attr, value) {
  if (attr === "scope") {
    if (value.includes("High-risk")) {
      return `<span class="icon-tooltip" title="High-risk occupations only: Targets individuals in critical roles such as healthcare and emergency services.">⚠️</span>`;
    } else {
      return `<span class="icon-tooltip" title="All occupations and public spaces: Applies to everyone.">🌐</span>`;
    }
  }
  if (attr === "threshold") {
    if (value.includes("50 cases")) {
      return `<span class="icon-tooltip" title="50 cases per 100k, 10% increase: Early trigger for intervention.">🟢</span>`;
    } else if (value.includes("100 cases")) {
      return `<span class="icon-tooltip" title="100 cases per 100k, 15% increase: Moderate trigger.">🟠</span>`;
    } else if (value.includes("200 cases")) {
      return `<span class="icon-tooltip" title="200 cases per 100k, 20% increase: Late trigger under severe outbreak conditions.">🔴</span>`;
    }
  }
  if (attr === "coverage") {
    let percentage = 0;
    if (value.includes("50")) percentage = 50;
    else if (value.includes("70")) percentage = 70;
    else if (value.includes("90")) percentage = 90;
    return `<span class="icon-tooltip" title="${value}"><svg width="50" height="10">
              <rect width="50" height="10" fill="#ddd"/>
              <rect width="${50 * percentage / 100}" height="10" fill="#4caf50"/>
            </svg></span>`;
  }
  if (attr === "incentives") {
    if (value.includes("No incentives")) {
      return `<span class="icon-tooltip" title="No incentives provided.">🚫</span>`;
    } else if (value.includes("Paid time off")) {
      return `<span class="icon-tooltip" title="Paid time off for vaccination: Compensates for lost work time.">🕒</span>`;
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
      return `<span class="icon-tooltip" title="Medical, religious and broad personal belief exemptions: Allows a wide range of opt-out reasons.">🩺🙏💡</span>`;
    }
  }
  if (attr === "cost") {
    if (value.includes("AUD5")) {
      return `<span class="icon-tooltip" title="Low opportunity cost (A$5): Minimal economic burden.">$</span>`;
    } else if (value.includes("AUD20")) {
      return `<span class="icon-tooltip" title="Moderate opportunity cost (A$20): Typical cost in urban settings.">$ $</span>`;
    } else if (value.includes("AUD50")) {
      return `<span class="icon-tooltip" title="High opportunity cost (A$50): Significant economic burden.">$ $ $</span>`;
    } else if (value.includes("AUD0")) {
      return `<span class="icon-tooltip" title="No opportunity cost (A$0): No economic burden.">$0</span>`;
    }
  }
  return "";
}
