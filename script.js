// Global variables
let currentSlideIndex = 0;
let slides = [];
let responses = [];
let taskStartTime = 0;

document.addEventListener("DOMContentLoaded", () => {
  // Button event listeners for static slides
  document.getElementById("intro-next").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-2").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-3").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-4").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-5").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-6").addEventListener("click", nextSlide);
  document.getElementById("tutorial-next-7").addEventListener("click", nextSlide);
  document.getElementById("scenario-next").addEventListener("click", nextSlide);
  document.getElementById("example-next").addEventListener("click", nextSlide);
  document.getElementById("start-tasks").addEventListener("click", nextSlide);

  // Back button event listeners
  document.getElementById("tutorial-back-2").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-3").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-4").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-5").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-6").addEventListener("click", prevSlide);
  document.getElementById("tutorial-back-7").addEventListener("click", prevSlide);
  document.getElementById("scenario-back").addEventListener("click", prevSlide);
  document.getElementById("example-back").addEventListener("click", prevSlide);
  document.getElementById("instr-back").addEventListener("click", prevSlide);

  // Speech synthesis for the example explanation
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

  // Create dynamic tasks using your 36 scenarios
  generateTaskSlides();

  // Gather all slides
  slides = Array.from(document.querySelectorAll(".slide"));
  showSlide(currentSlideIndex);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
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

// Interpret exemption codes 1, 2, 3 into text for table display
function interpretExemption(code) {
  if (code === "1") return "Medical exemptions only";
  if (code === "2") return "Medical and religious exemptions";
  if (code === "3") return "Medical, religious, and broad personal belief exemptions";
  return "Unknown";
}

/*
  The updated scenario list from your NGENE design blocks.
  Each scenario includes block, scenario number, and two alternatives (mandateA, mandateB).
*/
function generateTaskSlides() {
  const scenarios = [

    // 1) Block 3, Scenario 1
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
    
    // 2) Block 3, Scenario 2
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

    // 3) Block 1, Scenario 3
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

    // 4) Block 3, Scenario 4
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

    // 5) Block 2, Scenario 5
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

    // 6) Block 3, Scenario 6
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

    // 7) Block 1, Scenario 7
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

    // 8) Block 1, Scenario 8
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

    // 9) Block 4, Scenario 9
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

    // 10) Block 4, Scenario 10
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

    // 11) Block 2, Scenario 11
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

    // 12) Block 2, Scenario 12
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

    // 13) Block 3, Scenario 13
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

    // 14) Block 4, Scenario 14
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

    // 15) Block 1, Scenario 15
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

    // 16) Block 2, Scenario 16
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

    // 17) Block 3, Scenario 17
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

    // 18) Block 1, Scenario 18
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

    // 19) Block 1, Scenario 19
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

    // 20) Block 3, Scenario 20
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

    // 21) Block 2, Scenario 21
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

    // 22) Block 2, Scenario 22
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

    // 23) Block 4, Scenario 23
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

    // 24) Block 3, Scenario 24
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

    // 25) Block 2, Scenario 25
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

    // 26) Block 4, Scenario 26
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

    // 27) Block 1, Scenario 27
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

    // 28) Block 4, Scenario 28
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

    // 29) Block 4, Scenario 29
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

    // 30) Block 1, Scenario 30
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

    // 31) Block 4, Scenario 31
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

    // 32) Block 4, Scenario 32
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

    // 33) Block 2, Scenario 33
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

    // 34) Block 2, Scenario 34
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

    // 35) Block 3, Scenario 35
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

    // 36) Block 1, Scenario 36
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

  // Build each dynamic task slide
  const taskContainer = document.getElementById("task-slides");

  scenarios.forEach((scenarioData, idx) => {
    const taskSlide = document.createElement("div");
    taskSlide.className = "slide task-slide";
    taskSlide.id = `task-slide-${scenarioData.block}-${scenarioData.scenario}`;

    const title = document.createElement("h2");
    title.textContent = `Block ${scenarioData.block}, Scenario ${scenarioData.scenario}`;
    taskSlide.appendChild(title);

    // Create a comparison table
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Attribute", "Alternative 1", "Alternative 2"].forEach(text => {
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

      // Left-most cell: attribute name + info icon
      const tdAttr = document.createElement("td");
      tdAttr.innerHTML = `${capitalize(attr)} <span class="info-icon" data-tooltip="${getAttributeDescription(attr)}">ℹ️</span>`;
      row.appendChild(tdAttr);

      // Mandate A cell
      const tdA = document.createElement("td");
      // If the attribute is "exemption" and it's coded as 1,2,3, interpret it
      const valA = (attr === "exemption")
        ? interpretExemption(scenarioData.mandateA[attr])
        : scenarioData.mandateA[attr];
      tdA.innerHTML = getIcon(attr, valA) + " " + valA;
      row.appendChild(tdA);

      // Mandate B cell
      const tdB = document.createElement("td");
      const valB = (attr === "exemption")
        ? interpretExemption(scenarioData.mandateB[attr])
        : scenarioData.mandateB[attr];
      tdB.innerHTML = getIcon(attr, valB) + " " + valB;
      row.appendChild(tdB);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    taskSlide.appendChild(table);

    // A form for user’s choice
    const form = document.createElement("form");
    form.id = `form-task-${scenarioData.block}-${scenarioData.scenario}`;
    form.innerHTML = `
      <div class="questions">
        <fieldset>
          <legend>Of the two options, which one would you choose?</legend>
          <label>
            <input type="radio" name="choice" value="Alternative 1" required>
            I prefer Alternative 1.
          </label>
          <label>
            <input type="radio" name="choice" value="Alternative 2" required>
            I prefer Alternative 2.
          </label>
        </fieldset>
        <fieldset>
          <legend>If “no mandate” was an option, would you still keep your choice?</legend>
          <label>
            <input type="radio" name="not_choose" value="same" required>
            Yes, I'd keep my chosen alternative.
          </label>
          <label>
            <input type="radio" name="not_choose" value="change" required>
            No, I'd choose no mandate at all.
          </label>
        </fieldset>
      </div>
    `;
    taskSlide.appendChild(form);

    // Navigation buttons
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
    // If this is the last scenario in the list, label the button "Submit"
    nextBtn.textContent = (idx === scenarios.length - 1) ? "Submit" : "Next";
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
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

// Save the user's choice for a given scenario
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

// Attempt to submit responses via EmailJS
function submitResponses() {
  let emailContent = "Survey Responses:\n\n";
  responses.forEach(resp => {
    emailContent += `Block: ${resp.block}, Scenario: ${resp.scenario}\n`;
    emailContent += `Preferred Alternative: ${resp.choice}\n`;
    emailContent += `If no mandate was possible: ${resp.not_choose}\n`;
    emailContent += `Response Time (ms): ${resp.responseTime}\n\n`;
  });

  const templateParams = {
    to_email: "mesfin.genie@newcastle.edu.au", // Or your desired email
    subject: "Vaccine Mandate Survey Responses",
    message: emailContent,
    timestamp: new Date().toLocaleString()
  };

  // Attempt sending via EmailJS
  emailjs.send("service_zp0gsia", "template_2qu14s5", templateParams)
    .then(() => {
      showThankYou();
      alert("Your responses have been sent via email. Thank you!");
    }, (error) => {
      console.error("Submission failed:", error);
      alert("Error submitting your responses via email. Please download them as CSV.");
      showThankYou(); // Show final slide anyway
      showCSVDownload(); // Provide CSV fallback
    });
}

// Display final thank-you slide
function showThankYou() {
  const container = document.getElementById("survey-container");
  container.innerHTML = `
    <div class="message">
      <h2>Thank You!</h2>
      <p>Your responses have been processed. If email delivery failed, you can still download the CSV below.</p>
      <div id="csv-container" style="text-align:center; margin-top: 20px;"></div>
    </div>
  `;
  showCSVDownload();
}

// Provide a CSV download as backup
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

function convertResponsesToCSV(data) {
  let csv = "Block,Scenario,Choice,Opt-out,ResponseTime(ms)\n";
  data.forEach(item => {
    csv += `${item.block},${item.scenario},${item.choice},${item.not_choose},${item.responseTime}\n`;
  });
  return csv;
}

// Provide short attribute descriptions for tooltips
function getAttributeDescription(attr) {
  const desc = {
    scope: "Defines who must be vaccinated: only high-risk jobs or everyone in public spaces.",
    exemption: "Which exemptions are allowed: (1) Medical only, (2) Medical & religious, (3) Medical, religious, & personal belief.",
    threshold: "The infection level that triggers the mandate—lower thresholds intervene earlier.",
    coverage: "The vaccination percentage needed to lift the mandate. Higher coverage = stricter requirement.",
    incentives: "Any rewards to encourage vaccination (paid time off, discounts, etc.).",
    cost: "Estimated cost or burden for getting vaccinated, e.g. fees, lost wages, travel."
  };
  return desc[attr] || "";
}

// Convert coded attributes (scope, threshold, etc.) into icons and text
function getIcon(attr, value) {
  if (attr === "scope") {
    return value.includes("High-risk")
      ? `<span class="icon-tooltip" title="High-risk occupations only.">⚠️</span>`
      : `<span class="icon-tooltip" title="All occupations and public spaces.">🌐</span>`;
  }
  if (attr === "exemption") {
    // We'll handle numeric codes as final text. Just pick an icon to represent each:
    if (value.includes("Medical exemptions only")) {
      return `<span class="icon-tooltip" title="Only those with medical reasons.">🩺</span>`;
    } else if (value.includes("Medical and religious exemptions")) {
      return `<span class="icon-tooltip" title="Medical and religious reasons.">🩺🙏</span>`;
    } else if (value.includes("broad personal belief")) {
      return `<span class="icon-tooltip" title="Includes personal, religious, medical reasons.">🩺🙏💡</span>`;
    }
    return `<span class="icon-tooltip" title="Unknown exemption code.">❓</span>`;
  }
  if (attr === "threshold") {
    if (value.includes("50 cases")) return `<span class="icon-tooltip" title="Early trigger threshold.">🟢</span>`;
    if (value.includes("100 cases")) return `<span class="icon-tooltip" title="Moderate trigger threshold.">🟠</span>`;
    if (value.includes("200 cases")) return `<span class="icon-tooltip" title="Late trigger threshold.">🔴</span>`;
    return "";
  }
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
  if (attr === "incentives") {
    if (value.includes("No incentives") || value === "None") {
      return `<span class="icon-tooltip" title="No extra benefits.">🚫</span>`;
    } else if (value.includes("Paid time off")) {
      return `<span class="icon-tooltip" title="Paid time off for vaccination.">🕒</span>`;
    } else if (value.includes("10% discount")) {
      return `<span class="icon-tooltip" title="Financial incentive: discount on govt services.">💸</span>`;
    }
  }
  if (attr === "cost") {
    if (value.includes("AUD0")) {
      return `<span class="icon-tooltip" title="No cost.">$0</span>`;
    } else if (value.includes("AUD5")) {
      return `<span class="icon-tooltip" title="Low cost.">$</span>`;
    } else if (value.includes("AUD20")) {
      return `<span class="icon-tooltip" title="Moderate cost.">$$</span>`;
    } else if (value.includes("AUD50")) {
      return `<span class="icon-tooltip" title="High cost.">$$$</span>`;
    }
  }
  return "";
}

// Utility to capitalize attribute labels
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Convert numeric exemption codes into descriptive strings
function interpretExemption(code) {
  if (code === "1") return "Medical exemptions only";
  if (code === "2") return "Medical and religious exemptions";
  if (code === "3") return "Medical, religious, and broad personal belief exemptions";
  return "Unknown";
}
