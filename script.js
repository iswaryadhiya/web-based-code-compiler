let pyodideReadyPromise = loadPyodide();

async function runCode() {

    const lang = document.getElementById("language").value;
    const code = document.getElementById("code").value;

    const output = document.getElementById("output");
    const explanation = document.getElementById("explanation");
    const errorBox = document.getElementById("error");

    output.textContent = "";
    explanation.textContent = "";
    errorBox.textContent = "";

    try {

        /* ================= PYTHON ================= */
        if (lang === "python") {
            const pyodide = await pyodideReadyPromise;

            pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
            `);

            await pyodide.runPythonAsync(code);

            output.textContent =
                pyodide.runPython("sys.stdout.getvalue()") ||
                "Program executed successfully";

            explanation.textContent = explainCode(code, "python");
        }

        /* ================= JAVASCRIPT ================= */
        else if (lang === "javascript") {

            let consoleOutput = "";
            const originalLog = console.log;

            console.log = (...args) => {
                consoleOutput += args.join(" ") + "\n";
                originalLog.apply(console, args);
            };

            try {
                eval(code);
                output.textContent =
                    consoleOutput || "Program executed successfully";
                explanation.textContent = explainCode(code, "javascript");
            } finally {
                console.log = originalLog;
            }
        }

        /* ================= C ================= */
        else if (lang === "c") {
            simulateC(code);
        }

        /* ================= C++ ================= */
        else if (lang === "cpp") {
            simulateCPP(code);
        }

        /* ================= JAVA ================= */
        else if (lang === "java") {
            simulateJava(code);
        }

    } catch (err) {
        errorBox.textContent = err.message || err.toString();
    }
}

/* ================= JAVA ================= */

function simulateJava(code) {

    if (!code.match(/class\s+\w+/))
        throw new Error("Java Error: class keyword missing");

    if (!code.includes("String[] args"))
        throw new Error("Java Error: main() must contain String[] args");

    if (!code.includes("main"))
        throw new Error("Java Error: main() method missing");

    const lines = code.split("\n");
    for (let line of lines) {
        line = line.trim();
        if (line.includes("System.out.println") && !line.endsWith(";")) {
            throw new Error("Java Error: Missing semicolon → " + line);
        }
    }

    let outputText = "";

    const printRegex = /System\.out\.println\((.*?)\);/g;
    let match;

    while ((match = printRegex.exec(code)) !== null) {
        outputText += match[1].replace(/"/g, "") + "\n";
    }

    const loopMatch = code.match(/for\s*\(\s*int\s+i\s*=\s*(\d+).*<=\s*(\d+)/);
    if (loopMatch) {
        outputText = "";
        for (let i = +loopMatch[1]; i <= +loopMatch[2]; i++) {
            outputText += i + "\n";
        }
    }

    output.textContent = outputText || "Program executed successfully";
    explanation.textContent = explainJavaCode(code);
}

/* ================= C ================= */

function simulateC(code) {

    if (!code.includes("main"))
        throw new Error("C Error: main() function missing");

    let outputText = "";

    // printf("Hello")
    const stringRegex = /printf\s*\(\s*"(.*?)"/g;
    let match;

    while ((match = stringRegex.exec(code)) !== null) {
        if (!match[1].includes("%d")) {
            outputText += match[1] + "\n";
        }
    }

    // for loop numbers
    const loopMatch = code.match(/for\s*\(\s*\w+\s*=\s*(\d+).*<=\s*(\d+)/);
    if (loopMatch && code.includes("printf")) {
        outputText = "";
        for (let i = +loopMatch[1]; i <= +loopMatch[2]; i++) {
            outputText += i + "\n";
        }
    }

    output.textContent = outputText || "Program executed successfully";
    explanation.textContent =
        "C Program Explanation:\n" +
        "- main() is program entry.\n" +
        "- printf() prints output.\n" +
        "- for loop repeats execution.";
}

/* ================= C++ ================= */

function simulateCPP(code) {

    if (!code.includes("main"))
        throw new Error("C++ Error: main() function missing");

    let outputText = "";

    // cout << "Hello"
    const stringRegex = /cout\s*<<\s*"(.*?)"/g;
    let match;

    while ((match = stringRegex.exec(code)) !== null) {
        outputText += match[1] + "\n";
    }

    // for loop numbers
    const loopMatch = code.match(/for\s*\(\s*\w+\s*=\s*(\d+).*<=\s*(\d+)/);
    if (loopMatch && code.includes("cout")) {
        outputText = "";
        for (let i = +loopMatch[1]; i <= +loopMatch[2]; i++) {
            outputText += i + "\n";
        }
    }

    output.textContent = outputText || "Program executed successfully";
    explanation.textContent =
        "C++ Program Explanation:\n" +
        "- main() is program entry.\n" +
        "- cout prints output.\n" +
        "- for loop repeats execution.";
}

/* ================= GENERAL EXPLANATION ================= */

function explainCode(code, lang) {

    if (lang === "python") {
        return "Python Code Explanation:\n" +
               "- print() displays output.\n" +
               "- for loops and conditions supported.";
    }

    if (lang === "javascript") {
        return "JavaScript Code Explanation:\n" +
               "- console.log() prints output.\n" +
               "- eval() executes code dynamically.";
    }

    return "";
}

/* ================= JAVA EXPLANATION ================= */

function explainJavaCode(code) {

    let explanation = "Java Program Explanation:\n";
    explanation += "- A class is the basic unit of Java.\n";
    explanation += "- main() is the entry point.\n";

    if (code.includes("System.out.println"))
        explanation += "- System.out.println() prints output.\n";

    if (code.includes("for"))
        explanation += "- Loop is used for repetition.\n";

    return explanation;
}

