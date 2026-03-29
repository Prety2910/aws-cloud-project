const notesInput = document.getElementById("notesInput");
const generateBtn = document.getElementById("generateBtn");
const summaryOutput = document.getElementById("summaryOutput");
const keyPointsOutput = document.getElementById("keyPointsOutput");
const questionsOutput = document.getElementById("questionsOutput");
const flashcardsOutput = document.getElementById("flashcardsOutput");
const charCount = document.getElementById("charCount");
const sampleNotes = document.getElementById("sampleNotes");
const clearBtn = document.getElementById("clearBtn");
const statusText = document.getElementById("statusText");

notesInput.addEventListener("input", function () {
    charCount.innerText = `${notesInput.value.length} characters`;
});

sampleNotes.addEventListener("click", function () {
    notesInput.value =
        "Cloud computing allows users to access servers, storage, and databases over the internet instead of depending only on local machines. It provides scalability, flexibility, and cost efficiency, making it useful for businesses and individuals.";
    charCount.innerText = `${notesInput.value.length} characters`;
    statusText.innerText = "Sample notes loaded. Now generate your study set.";
});

clearBtn.addEventListener("click", function () {
    notesInput.value = "";
    charCount.innerText = "0 characters";
    summaryOutput.innerText = "Your quick summary will appear here.";
    keyPointsOutput.innerText = "Important points will appear here.";
    questionsOutput.innerText = "Likely questions will appear here.";
    flashcardsOutput.innerText = "Flashcards will appear here.";
    statusText.innerText = "Cleared. Ready for fresh notes.";
});

generateBtn.addEventListener("click", async function () {
    const notes = notesInput.value.trim();

    if (notes === "") {
        alert("Paste some notes first 📘");
        return;
    }

    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true;
    statusText.innerText = "AI is preparing your study material...";

    try {
        const response = await fetch("http://65.1.65.143:5000/generate",    {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: notes })
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        summaryOutput.innerText = data.summary || "No summary returned.";
        keyPointsOutput.innerText = (data.key_points || []).join("\n");
        questionsOutput.innerText = (data.questions || []).join("\n");
        flashcardsOutput.innerText = (data.flashcards || []).join("\n\n");
        statusText.innerText = "Done. Your study material is ready.";
    } catch (error) {
        summaryOutput.innerText = "Error: " + error.message;
        keyPointsOutput.innerText = "-";
        questionsOutput.innerText = "-";
        flashcardsOutput.innerText = "-";
        statusText.innerText = "Something went wrong. Try again.";
        console.error(error);
    }

    generateBtn.innerText = "Generate Magic 🚀";
    generateBtn.disabled = false;
});