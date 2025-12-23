PROJECT TITLE:
Multi-Language Web-Based Code Compiler

PROJECT DESCRIPTION:
This project is a browser-based code compiler that supports multiple programming languages.
It allows users to write and execute code directly in the browser without installing any software.
Python programs are executed using WebAssembly (Pyodide), while JavaScript runs using the browser engine.
C, C++, and Java executions are demonstrated to show future scalability.

FEATURES:
- Supports Python (WebAssembly-based execution)
- Supports JavaScript execution in browser
- Demonstrates C, C++, and Java execution
- Displays real program output
- Shows runtime errors clearly
- Provides automatic explanation for each program
- User-friendly interface

TECHNOLOGIES USED:
- HTML
- CSS
- JavaScript
- Pyodide (Python WebAssembly)
- WebAssembly (WASM)

PROJECT STRUCTURE:
- index.html : Main user interface
- style.css  : Styling for the application
- script.js  : Core logic and execution engine
- README.txt : Project documentation

HOW TO RUN THE PROJECT:
1. Download or copy the project folder.
2. Open the folder in Visual Studio Code.
3. Open index.html in any modern web browser.
4. Select a programming language.
5. Write code in the editor.
6. Click on "Run Code" to see output, explanation, and errors.

SAMPLE INPUT:
Python:
print("Hello World")
print(10 + 20)

JavaScript:
console.log("Hello JavaScript")

OUTPUT:
Hello World
30

ERROR HANDLING:
- Python runtime errors are captured and displayed.
- JavaScript syntax and logic errors are shown.
- Incorrect syntax usage is handled gracefully.

FUTURE ENHANCEMENTS:
- Real C/C++ execution using WebAssembly
- Java compiler integration
- User input support
- AI-based code explanation
- Code saving and download option

APPLICATIONS:
- Online coding practice
- Programming education
- Compiler design demonstration
- Web-based learning tools

CONCLUSION:
This project demonstrates how modern web technologies can be used to build
a lightweight, secure, and efficient code execution platform in the browser.

