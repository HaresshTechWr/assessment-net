import React, {useState} from 'react';
import {PythonProvider, usePython} from 'react-py';
import styles from './styles.module.css';

const DEFAULT_CODE = `# Try it out — edit and run any Python code
message = "Hello from Netomi!"
print(message)

numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"Sum of {numbers} = {total}")
`;

function Runner({initialCode}) {
  const [code, setCode] = useState(initialCode ?? DEFAULT_CODE);
  const {runPython, stdout, stderr, isLoading, isReady, isRunning, interruptExecution} =
    usePython();

  function handleRun() {
    runPython(code);
  }

  function handleClear() {
    runPython('');
  }

  const status = isLoading
    ? {label: 'Loading Python runtime…', cls: styles.statusLoading}
    : isRunning
    ? {label: 'Running…', cls: styles.statusRunning}
    : {label: 'Ready', cls: styles.statusReady};

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <span className={styles.label}>Python 3 Playground</span>
        <span className={`${styles.status} ${status.cls}`}>{status.label}</span>
      </div>

      <textarea
        className={styles.editor}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={12}
      />

      <div className={styles.actions}>
        <button
          className={styles.btnRun}
          onClick={handleRun}
          disabled={!isReady || isRunning}>
          {isRunning ? 'Running…' : '▶ Run'}
        </button>
        <button
          className={styles.btnStop}
          onClick={interruptExecution}
          disabled={!isRunning}>
          ■ Stop
        </button>
      </div>

      {(stdout || stderr) && (
        <div className={styles.output}>
          <div className={styles.outputHeader}>Output</div>
          {stdout && <pre className={styles.stdout}>{stdout}</pre>}
          {stderr && <pre className={styles.stderr}>{stderr}</pre>}
        </div>
      )}
    </div>
  );
}

export default function PythonRunner({code}) {
  return (
    <PythonProvider>
      <Runner initialCode={code} />
    </PythonProvider>
  );
}
