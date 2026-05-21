import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const stepNamesPath = path.join(projectRoot, "src", "data", "stepNames.js");
const routinesPath = path.join(projectRoot, "src", "data", "routines.js");
const srcPath = path.join(projectRoot, "src");

const errors = [];
const warnings = [];

function addError(message) {
  errors.push(`ERROR: ${message}`);
}

function addWarning(message) {
  warnings.push(`WARNING: ${message}`);
}

function readFileSafe(filePath) {
  if (!fs.existsSync(filePath)) {
    addError(`Missing file: ${filePath}`);
    return "";
  }

  return fs.readFileSync(filePath, "utf8");
}

async function importStepNames(filePath) {
  try {
    const moduleUrl = pathToFileURL(filePath).href;
    return await import(`${moduleUrl}?cacheBust=${Date.now()}`);
  } catch (error) {
    addError(`Could not import ${filePath}: ${error.message}`);
    return null;
  }
}

function walkFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, fileList);
    } else if (entry.isFile()) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

function extractRoutineConfigsFromText(routinesText) {
  const routines = [];

  const stepKeysBlockRegex = /stepKeys\s*:\s*\[([\s\S]*?)\]/g;
  let match;

  while ((match = stepKeysBlockRegex.exec(routinesText)) !== null) {
    const stepKeysBlock = match[1];

    const beforeBlock = routinesText.slice(0, match.index);
    const recentText = beforeBlock.slice(Math.max(0, beforeBlock.length - 1200));

    const idMatches = [...recentText.matchAll(/id\s*:\s*["'`]([^"'`]+)["'`]/g)];
    const routineId =
      idMatches.length > 0 ? idMatches[idMatches.length - 1][1] : "unknown-routine";

    const stepKeys = [...stepKeysBlock.matchAll(/["'`]([^"'`]+)["'`]/g)].map(
      (keyMatch) => keyMatch[1]
    );

    routines.push({
      id: routineId,
      stepKeys,
    });
  }

  return routines;
}

function validateStep(stepId, step) {
  if (!step || typeof step !== "object") {
    addError(`Step "${stepId}" is not a valid object.`);
    return;
  }

  if (!step.names || typeof step.names !== "object") {
    addError(`Step "${stepId}" is missing names object.`);
  } else {
    if (!step.names.english || typeof step.names.english !== "string") {
      addError(`Step "${stepId}" is missing names.english.`);
    }

    if (!step.names.roman || typeof step.names.roman !== "string") {
      addWarning(`Step "${stepId}" is missing names.roman.`);
    }

    if (!step.names.devanagari || typeof step.names.devanagari !== "string") {
      addWarning(`Step "${stepId}" is missing names.devanagari.`);
    }
  }

  if (!step.category || typeof step.category !== "string") {
    addWarning(`Step "${stepId}" is missing category.`);
  }

  const allowedTypes = ["time", "reps", "sequence"];

  if (!allowedTypes.includes(step.type)) {
    addError(
      `Step "${stepId}" has invalid type "${step.type}". Allowed: ${allowedTypes.join(
        ", "
      )}.`
    );
  }

  if (step.type === "time") {
    if (typeof step.duration !== "number" || step.duration <= 0) {
      addError(`Time step "${stepId}" must have a positive numeric duration.`);
    }
  }

  if (step.type === "reps") {
    if (typeof step.reps !== "number" || step.reps <= 0) {
      addError(`Reps step "${stepId}" must have a positive numeric reps value.`);
    }

    if (
      step.timePerRep !== null &&
      step.timePerRep !== undefined &&
      (typeof step.timePerRep !== "number" || step.timePerRep <= 0)
    ) {
      addWarning(`Reps step "${stepId}" has invalid timePerRep.`);
    }
  }

  if (step.type === "sequence") {
    if (!Array.isArray(step.internalSteps) && !Array.isArray(step.sequence)) {
      addWarning(
        `Sequence step "${stepId}" should define internalSteps or sequence array.`
      );
    }
  }

  if (typeof step.hasSides !== "boolean") {
    addError(`Step "${stepId}" must define hasSides as true or false.`);
  }

  if (!step.description || typeof step.description !== "string") {
    addWarning(`Step "${stepId}" is missing description.`);
  }

  if (!step.caution || typeof step.caution !== "string") {
    addWarning(`Step "${stepId}" is missing caution.`);
  }

  if (!step.benefits || typeof step.benefits !== "string") {
    addWarning(`Step "${stepId}" is missing benefits.`);
  }
}

function validateRoutineKeys(routines, stepDatabase) {
  if (!Array.isArray(routines)) {
    addError("Could not read routine stepKeys from routines.js.");
    return;
  }

  if (routines.length === 0) {
    addError("No routine stepKeys blocks found in routines.js.");
    return;
  }

  for (const routine of routines) {
    if (!routine.id) {
      addWarning("A routine could not be matched to an id.");
    }

    if (!routine.stepKeys || !Array.isArray(routine.stepKeys)) {
      addError(`Routine "${routine.id || "unknown"}" is missing stepKeys array.`);
      continue;
    }

    if (routine.stepKeys.length === 0) {
      addWarning(`Routine "${routine.id}" has empty stepKeys.`);
    }

    for (const stepKey of routine.stepKeys) {
      if (!stepDatabase[stepKey]) {
        addError(
          `Routine "${routine.id}" references missing stepKey "${stepKey}" in stepNames.js.`
        );
      }
    }
  }
}

function checkRuntimeBackupImports() {
  const files = walkFiles(srcPath).filter(
    (file) => file.endsWith(".js") || file.endsWith(".jsx")
  );

  for (const file of files) {
    const content = readFileSafe(file);
    const relativePath = path.relative(projectRoot, file);

    if (content.includes("backup/stepNamesv7")) {
      addError(`Runtime file imports backup/stepNamesv7: ${relativePath}`);
    }

    if (content.includes("./backup/stepNames")) {
      addWarning(`Runtime file may be importing backup stepNames file: ${relativePath}`);
    }
  }
}

function checkDuplicateEnglishNames(stepDatabase) {
  const seen = new Map();

  for (const [stepId, step] of Object.entries(stepDatabase)) {
    const englishName = step.names?.english?.trim().toLowerCase();

    if (!englishName) continue;

    if (seen.has(englishName)) {
      addWarning(
        `Duplicate English name "${step.names.english}" used by "${seen.get(
          englishName
        )}" and "${stepId}".`
      );
    } else {
      seen.set(englishName, stepId);
    }
  }
}

async function main() {
  console.log("Validating Lata Yog Routine Guide step database...\n");

  const routinesText = readFileSafe(routinesPath);

  const stepModule = await importStepNames(stepNamesPath);
  const stepDatabase = stepModule?.stepDatabase;

  const routines = extractRoutineConfigsFromText(routinesText);

  if (!stepDatabase || typeof stepDatabase !== "object") {
    addError("stepNames.js must export stepDatabase object.");
  } else {
    const stepIds = Object.keys(stepDatabase);

    if (stepIds.length === 0) {
      addError("stepDatabase is empty.");
    }

    for (const stepId of stepIds) {
      validateStep(stepId, stepDatabase[stepId]);
    }

    checkDuplicateEnglishNames(stepDatabase);
  }

  if (stepDatabase) {
    validateRoutineKeys(routines, stepDatabase);
  }

  checkRuntimeBackupImports();

  console.log(
    `Checked stepNames.js: ${stepDatabase ? Object.keys(stepDatabase).length : 0} steps`
  );
  console.log(`Checked routines.js: ${routines.length} routine stepKey blocks\n`);

  if (warnings.length > 0) {
    console.log("Warnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
    console.log("");
  }

  if (errors.length > 0) {
    console.log("Errors:");
    for (const error of errors) {
      console.log(`- ${error}`);
    }
    console.log("");
    console.log("Data validation failed.");
    process.exit(1);
  }

  console.log("Data validation passed.");
}

main();