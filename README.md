# Calculator App

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

  - [**Problem**](#problem)
  - [**Solution 1: Configure Jest for ES Modules (Recommended)**](#solution-1-configure-jest-for-es-modules-recommended)
  - [**Debugging Steps**](#debugging-steps)
  - [**Final Working Example**](#final-working-example)
- [The Core Problem](#the-core-problem)
  - [**Why `@babel/core` is Required**](#why-babelcore-is-required)
  - [**Why `babel-jest` is Required**](#why-babel-jest-is-required)
  - [**Why `@babel/preset-env` Alone Fails**](#why-babelpreset-env-alone-fails)
  - [**Real-World Analogy**](#real-world-analogy)
  - [**Minimal Working Setup**](#minimal-working-setup)
    - [**Install:**](#install)
    - [**babel.config.js:**](#babelconfigjs)
    - [**jest.config.js:**](#jestconfigjs)
  - [**What If You Skip `babel-jest`?**](#what-if-you-skip-babel-jest)
  - [**Alternatives (No Babel)**](#alternatives-no-babel)
    - [**Option A: Native ES Modules (Node ≥ v12)**](#option-a-native-es-modules-node--v12)
    - [**Option B: Use `esm` Loader**](#option-b-use-esm-loader)
  - [**Key Takeaways**](#key-takeaways)
  - [**Execution Flow (Chronological Order)**](#execution-flow-chronological-order)
  - [**Detailed Transformation Steps**](#detailed-transformation-steps)
  - [**Key Technical Interactions**](#key-technical-interactions)
  - [**Debugging the Flow**](#debugging-the-flow)
  - [**Common Pitfalls**](#common-pitfalls)
  - [**Why This Matters**](#why-this-matters)
- [babel-preset-jest gets installed by default](#babel-preset-jest-gets-installed-by-default)
  - [Why Does Jest Install It by Default?](#why-does-jest-install-it-by-default)
  - [Do You Need to Configure It?](#do-you-need-to-configure-it)
  - [Key Takeaway:](#key-takeaway)

<!-- /code_chunk_output -->

---

### **Problem**

**SyntaxError**: Cannot use import statement outside a module

This error occurs when Jest tries to run ES module (`import/export`) syntax without proper configuration. Here's how to fix it:

### **Solution 1: Configure Jest for ES Modules (Recommended)**
1. **Install required packages:**
   ```bash
   npm install --save-dev @babel/preset-env @babel/core babel-jest
   ```

2. **Create/update `babel.config.js`:**
   ```javascript
   module.exports = {
     presets: [
       ['@babel/preset-env', { targets: { node: 'current' } }]
     ]
   };
   ```

3. **Update `jest.config.js`:**
   ```javascript
   module.exports = {
     transform: {
       '^.+\\.js$': 'babel-jest'
     },
     moduleFileExtensions: ['js', 'json', 'jsx'],
   };
   ```

### **Debugging Steps**
1. Run Jest with debug flag:
   ```bash
   npx jest --config ./jest.config.js --debug
   ```

2. Check Node version (needs ≥ v12):
   ```bash
   node -v
   ```

3. Verify Babel is processing files:
   ```bash
   npx babel src/index.js --out-file test.js
   ```

### **Final Working Example**
After configuration, your test should work with:
```javascript
import { add } from '../../index';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
```

**Note:** If you're using React/Vue, you may need additional presets (`@babel/preset-react` etc.)


## The Core Problem

- Jest runs in **Node.js**, which traditionally uses CommonJS (`require/module.exports`).
- Your test uses **ES Modules** (`import/export`), which Node doesn't natively understand without transformation.

---

### **Why `@babel/core` is Required**
- **The Babel Engine**: `@babel/core` is the **actual compiler** that transforms code.
  - Without it, Babel presets (like `@babel/preset-env`) can't execute.
  - It's like needing a car engine (`@babel/core`) to use fuel (`@babel/preset-env`).

```javascript
// Without @babel/core, this does nothing:
presets: ['@babel/preset-env']
```

---

### **Why `babel-jest` is Required**
- **Jest Integration**: `babel-jest` is a Jest **plugin** that:
  1. Detects files needing transformation (`.js`, `.jsx`, etc.).
  2. Uses `@babel/core` under the hood to process files **before** Jest runs them.
  3. Enables **on-the-fly transpilation** during test execution.

```javascript
// jest.config.js
transform: {
  '^.+\\.js$': 'babel-jest' // Tells Jest: "Use babel-jest for .js files"
}
```

---

### **Why `@babel/preset-env` Alone Fails**
- `@babel/preset-env` is just a **set of rules** telling Babel:
  - Which JavaScript features to transpile (e.g., `import` → `require`).
  - What browser/node environments to support.
- Without `@babel/core` + `babel-jest`, the preset has:
  - **No engine** to execute the transformations (`@babel/core`).
  - **No way to integrate** with Jest (`babel-jest`).

---

### **Real-World Analogy**
| Component          | Role                          | Real-World Equivalent       |
|--------------------|-------------------------------|----------------------------|
| `@babel/core`      | Transpilation engine          | Car engine                 |
| `@babel/preset-env`| Rules for transpilation       | GPS navigation system      |
| `babel-jest`       | Jest-Babel bridge             | Driver connecting car to GPS |

---

### **Minimal Working Setup**
#### **Install:**
```bash
npm install --save-dev @babel/core @babel/preset-env babel-jest
```

#### **babel.config.js:**
```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ]
};
```

#### **jest.config.js:**
```javascript
module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
```

---

### **What If You Skip `babel-jest`?**
- Jest will try to run ES modules **directly** → **SyntaxError**.
- Example error:
  ```
  SyntaxError: Cannot use import statement outside a module
  ```

---

### **Alternatives (No Babel)**

#### **Option A: Native ES Modules (Node ≥ v12)**
1. Add `"type": "module"` to `package.json`.
2. Rename files to `.mjs`.
3. Use `jest-environment-node` with experimental flags (not recommended).

#### **Option B: Use `esm` Loader**
```bash
npm install esm
```
```javascript
// jest.config.js
module.exports = {
  transform: {},
  globals: {
    'esm': true
  }
};
```
(More limited than Babel.)

---

### **Key Takeaways**
1. `@babel/core` = **Transpiler** (does the actual work).
2. `@babel/preset-env` = **Rulebook** (what to transpile).
3. `babel-jest` = **Adapter** (lets Jest use Babel).

Without all three, ES Modules won’t work in Jest tests.

### **Execution Flow (Chronological Order)**
```mermaid
sequenceDiagram
    participant Jest
    participant babel-jest
    participant @babel/core
    participant @babel/preset-env
    participant Node.js

    Jest->>babel-jest: "Hey, I found a test file!"
    babel-jest->>@babel/core: "Please transform this file"
    @babel/core->>@babel/preset-env: "What rules should I apply?"
    @babel/preset-env-->>@babel/core: "Here are the transpilation rules"
    @babel/core->>babel-jest: "Here's your CommonJS-compatible code"
    babel-jest->>Jest: "Transformed test is ready"
    Jest->>Node.js: Execute test in CommonJS
    Node.js-->>Jest: Test results
```

---

### **Detailed Transformation Steps**

1. **Jest Boots Up**
   - Reads `jest.config.js`
   - Checks `transform` config and sees `.js` files should use `babel-jest`

2. **File Discovery**
   - Jest scans for test files matching:
     - `**/__tests__/**/*.js`
     - `**/?(*.)+(spec|test).js`
   - Finds your `your-test.test.js` or `__tests__/your-test.js`

3. **babel-jest Takes Over**
   - For each matched file:
     ```javascript
     // Your original test:
     import { add } from '../../index'; // ES Module
     ```
     - `babel-jest` asks `@babel/core`: _"Can you process this?"_

4. **@babel/core Engine Starts**
   - Loads config from:
     - `babel.config.js`
     - `.babelrc`
   - Sees `@babel/preset-env` is configured

5. **@babel/preset-env Rules Apply**
   - Checks `targets: { node: 'current' }`
   - Transforms **ESM → CommonJS**:
     ```javascript
     // Transformed output:
     const { add } = require('../../index'); // CommonJS
     ```
   - Also handles:
     - JSX (if React)
     - TypeScript (if configured)
     - Modern syntax (async/await, etc.)

6. **Cache & Execution**
   - Transformed code is cached in `node_modules/.cache/jest`
   - Jest receives CommonJS-compatible code
   - Node.js executes the test normally

---

### **Key Technical Interactions**
| Component          | Trigger Order | Responsibility                          | Output Example                     |
|--------------------|---------------|-----------------------------------------|------------------------------------|
| **Jest**           | 1st           | Test discovery                          | "Found test.test.js"               |
| **babel-jest**     | 2nd           | File preprocessing hook                 | "This needs Babel"                |
| **@babel/core**    | 3rd           | Core transformation engine              | Raw AST → Transformed AST         |
| **@babel/preset-env** | 4th       | Environment-specific rules             | `import` → `require`              |
| **Node.js**        | Last          | Executes transformed CommonJS code      | Test results                      |

---

### **Debugging the Flow**
1. **See the Transformed Code:**
   ```bash
   npx babel your-test.test.js --out-file transformed-test.js
   ```

2. **Jest Debug Output:**
   ```bash
   npx jest --showConfig
   ```

3. **Babel Debugging:**
   ```bash
   BABEL_SHOW_CONFIG_FOR=your-test.test.js npx jest
   ```

---

### **Common Pitfalls**
1. **Missing `@babel/core`**
   - Error: `Cannot find module '@babel/core'`
   - Fix: `npm install @babel/core`

2. **Misconfigured `transform`**
   - Jest ignores `.js` files if:
     ```javascript
     transform: {
       '^.+\\.tsx?$': 'ts-jest', // Only processes TS files
       // Missing JS handler
     }
     ```

3. **Conflicting Caches**
   - Clear cache with:
     ```bash
     npx jest --clearCache
     ```

---

### **Why This Matters**
- **Without `babel-jest`**: Jest doesn't know to use Babel
- **Without `@babel/core`**: No transformation occurs
- **Without `@babel/preset-env`**: Babel doesn't know _how_ to transform

All three are essential links in the chain.


## babel-preset-jest gets installed by default

You don't need to install `babel-jest` by default, babel-preset-jest do all the job and it's gets install by default when install jest.

When you install **Jest** (`jest`), it often includes `babel-preset-jest` as a **transitive dependency** (you can see it in `node_modules/` or `package-lock.json`), but it doesn’t appear explicitly in your `package.json` unless manually installed.

### Why Does Jest Install It by Default?
- Jest **needs Babel** to transpile modern JavaScript (ES6+, JSX, TypeScript, etc.) since Node.js doesn’t natively support all features.
- `babel-preset-jest` ensures Jest can:
  - Parse modern syntax (like `import/export`).
  - Transform code on-the-fly during tests.
  - Handle dynamic imports and ESM mocking.

### Do You Need to Configure It?
- **No explicit setup is required** if you’re using a framework like **Create React App (CRA)**, Next.js, or similar—they preconfigure Babel + Jest.
- **Manual projects** may need a Babel config (e.g., `babel.config.js`) to activate it. Example:
  ```javascript
  module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }], // For Node.js compatibility
      '@babel/preset-react', // If using React
    ],
    env: {
      test: {
        presets: ['babel-preset-jest'] // Auto-applied by Jest if installed
      }
    }
  };
  ```

### Key Takeaway:
- Jest **silently includes** `babel-preset-jest` to avoid breaking tests in modern codebases.
- You only need to manually configure Babel if your setup isn’t framework-managed (e.g., custom projects).

Want to check if it’s being used? Run `npm ls babel-preset-jest` or check `jest --showConfig` for Babel settings.