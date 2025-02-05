// Data for all blocks and scenarios
const tasks = [
  {
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
  },
  {
    block: 2,
    scenarios: [
      {
        scenario: 1,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "High vaccine coverage (90%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "10% discount on government services",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 2,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "High opportunity cost (AUD50)"
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
          exemption: "Medical and religious exemptions",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      {
        scenario: 4,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "10% discount on government services",
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "High vaccine coverage (90%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 5,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "10% discount on government services",
          cost: "Low opportunity cost (AUD5)"
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
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "High opportunity cost (AUD50)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 7,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "10% discount on government services",
          cost: "High opportunity cost (AUD50)"
        }
      },
      {
        scenario: 8,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "High vaccine coverage (90%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      {
        scenario: 9,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical and religious exemptions",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "None",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Moderate opportunity cost (AUD20)"
        }
      }
    ]
  },
  {
    block: 3,
    scenarios: [
      {
        scenario: 1,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "High opportunity cost (AUD50)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "10% discount on government services",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 2,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical and religious exemptions",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "None",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      {
        scenario: 3,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      {
        scenario: 4,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "High vaccine coverage (90%)",
          incentives: "10% discount on government services",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "High opportunity cost (AUD50)"
        }
      },
      {
        scenario: 5,
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
          exemption: "Medical and religious exemptions",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "10% discount on government services",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      {
        scenario: 6,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 7,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical and religious exemptions",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "None",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "10% discount on government services",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      {
        scenario: 8,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "High vaccine coverage (90%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "High opportunity cost (AUD50)"
        }
      },
      {
        scenario: 9,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "10% discount on government services",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        }
      }
    ]
  },
  {
    block: 4,
    scenarios: [
      {
        scenario: 1,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "None",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 2,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "High opportunity cost (AUD50)"
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
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "High vaccine coverage (90%)",
          incentives: "10% discount on government services",
          cost: "Moderate opportunity cost (AUD20)"
        }
      },
      {
        scenario: 4,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "200 cases per 100k, 20% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 5,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "10% discount on government services",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 6,
        mandateA: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
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
        scenario: 7,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical, religious, and broad personal belief",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical exemptions only",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "High vaccine coverage (90%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
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
          cost: "Moderate opportunity cost (AUD20)"
        },
        mandateB: {
          scope: "All occupations and public spaces",
          exemption: "Medical and religious exemptions",
          threshold: "100 cases per 100k, 15% increase",
          coverage: "Moderate vaccine coverage (70%)",
          incentives: "None",
          cost: "Low opportunity cost (AUD5)"
        }
      },
      {
        scenario: 9,
        mandateA: {
          scope: "High-risk occupations only",
          exemption: "Medical and religious exemptions",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "None",
          cost: "Low opportunity cost (AUD5)"
        },
        mandateB: {
          scope: "High-risk occupations only",
          exemption: "Medical exemptions only",
          threshold: "50 cases per 100k, 10% increase",
          coverage: "Low vaccine coverage (50%)",
          incentives: "Paid time off for vaccination (1–3 days)",
          cost: "Low opportunity cost (AUD5)"
        }
      }
    ]
  }
];

// Generate choice tasks after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("choice-tasks");

  tasks.forEach(block => {
    const blockDiv = document.createElement("div");
    blockDiv.className = "block";
    const blockTitle = document.createElement("h2");
    blockTitle.textContent = `Block ${block.block}`;
    blockDiv.appendChild(blockTitle);

    block.scenarios.forEach(scn => {
      const scenarioDiv = document.createElement("div");
      scenarioDiv.className = "scenario";
      scenarioDiv.id = `block${block.block}-scenario${scn.scenario}`;

      const scenarioTitle = document.createElement("h3");
      scenarioTitle.textContent = `Scenario ${scn.scenario}`;
      scenarioDiv.appendChild(scenarioTitle);

      // Create table with attributes (first column) and mandates A and B
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
        tdA.innerHTML = getIcon(attr, scn.mandateA[attr]) + " " + scn.mandateA[attr];
        row.appendChild(tdA);

        const tdB = document.createElement("td");
        tdB.innerHTML = getIcon(attr, scn.mandateB[attr]) + " " + scn.mandateB[attr];
        row.appendChild(tdB);

        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      scenarioDiv.appendChild(table);

      // Add required questions
      const form = document.createElement("form");
      form.innerHTML = `
        <fieldset required>
          <legend>Which vaccine mandate option would you prefer? (pick only one option)</legend>
          <label>
            <input type="radio" name="choice_block${block.block}_scenario${scn.scenario}" value="A" required>
            I prefer Vaccine Mandate A
          </label>
          <label>
            <input type="radio" name="choice_block${block.block}_scenario${scn.scenario}" value="B" required>
            I prefer Vaccine Mandate B
          </label>
        </fieldset>
        <fieldset required>
          <legend>If you have the option not to choose any of these vaccine mandates, will your choice remain the same?</legend>
          <label>
            <input type="radio" name="not_choose_block${block.block}_scenario${scn.scenario}" value="same" required>
            Yes, my choice will remain the same.
          </label>
          <label>
            <input type="radio" name="not_choose_block${block.block}_scenario${scn.scenario}" value="change" required>
            No, my choice will change, now I prefer not to choose any of these vaccine mandates.
          </label>
        </fieldset>
      `;
      scenarioDiv.appendChild(form);
      blockDiv.appendChild(scenarioDiv);
    });
    container.appendChild(blockDiv);
  });
});

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
  let color = "#000";
  if (attr === "scope") {
    if (value.indexOf("High-risk") > -1) {
      color = "#ff0000";
      return `<svg width="16" height="16"><circle cx="8" cy="8" r="6" fill="${color}" /></svg>`;
    } else {
      color = "#00aa00";
      return `<svg width="16" height="16"><rect width="12" height="12" x="2" y="2" fill="${color}" /></svg>`;
    }
  }
  if (attr === "exemption") {
    if (value.indexOf("Medical exemptions only") > -1) {
      color = "#0000ff";
    } else if (value.indexOf("Medical and religious exemptions") > -1) {
      color = "#ff00ff";
    } else if (value.toLowerCase().indexOf("broad") > -1) {
      color = "#00cccc";
    }
    return `<svg width="16" height="16"><polygon points="8,2 14,14 2,14" fill="${color}" /></svg>`;
  }
  if (attr === "threshold") {
    if (value.indexOf("50") > -1) {
      color = "#ffa500";
    } else if (value.indexOf("100") > -1) {
      color = "#800080";
    } else if (value.indexOf("200") > -1) {
      color = "#008000";
    }
    return `<svg width="16" height="16"><ellipse cx="8" cy="8" rx="6" ry="4" fill="${color}" /></svg>`;
  }
  if (attr === "coverage") {
    if (value.indexOf("50") > -1) {
      color = "#808080";
    } else if (value.indexOf("70") > -1) {
      color = "#000080";
    } else if (value.indexOf("90") > -1) {
      color = "#ffd700";
    }
    return `<svg width="16" height="16"><circle cx="8" cy="8" r="6" fill="${color}" /></svg>`;
  }
  if (attr === "incentives") {
    if (value.indexOf("None") > -1) {
      color = "#d3d3d3";
    } else if (value.indexOf("Paid time off") > -1) {
      color = "#add8e6";
    } else if (value.indexOf("10% discount") > -1) {
      color = "#90ee90";
    }
    return `<svg width="16" height="16"><rect width="12" height="12" x="2" y="2" fill="${color}" /></svg>`;
  }
  if (attr === "cost") {
    if (value.indexOf("AUD5") > -1) {
      color = "#ff69b4";
    } else if (value.indexOf("AUD20") > -1) {
      color = "#87ceeb";
    } else if (value.indexOf("AUD50") > -1) {
      color = "#8b0000";
    } else if (value.indexOf("AUD0") > -1) {
      color = "#32cd32";
    }
    return `<svg width="16" height="16"><polygon points="8,2 14,14 2,14" fill="${color}" /></svg>`;
  }
  return "";
}
