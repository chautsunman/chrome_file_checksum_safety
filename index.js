const setResultText = (resultText) => {
    resultTextEl.innerHTML = resultText;
}

const validate = () => {
    console.log('validate - start');

    let resultText;

    const checkSumText = checkSumTextInputEl.value;
    console.log(`validate - checkSumText: ${checkSumText}`);
    if (checkSumText === null || checkSumText.trim() === '') {
        console.log('invalid check sum');
        resultText = 'Invalid check sum';
        setResultText(resultText);
        return;
    }

    const numFiles = fileInputEl.files.length;
    if (!numFiles) {
        console.log('0 files selected');
        resultText = 'Select a file to validate';
        setResultText(resultText);
        return;
    }
    const file = fileInputEl.files[0];
    if (!file.size) {
        console.log('invalid file size');
        resultText = 'Invalid file size';
        setResultText(resultText);
        return;
    }
    // TODO: validate file size limit

    resultText = `Success`;
    setResultText(resultText);

    console.log('validate - end');
};

const statusTextEl = document.getElementById('statusText');
console.log(`init extension - statusTextEl: ${statusTextEl}`);

const checkSumTextInputEl = document.getElementById('checkSumTextInput');
console.log(`init extension - checkSumTextInputEl: ${checkSumTextInputEl}`);

const checkSumTypeInputEl = document.getElementById('checkSumTypeInput');
console.log(`init extension - checkSumTypeInputEl: ${checkSumTypeInputEl}`);

const fileInputEl = document.getElementById('fileInput');
console.log(`init extension - fileInputEl: ${fileInputEl}`);

const validateBtnEl = document.getElementById('validateBtn');
console.log(`init extension - validateBtnEl: ${validateBtnEl}`);
validateBtnEl.addEventListener("click", (e) => {
    validate();
});
console.log(`init extension - added on-click listener to validateBtnEl`);

const clearBtnEl = document.getElementById('clearBtn');
console.log(`init extension - clearBtnEl: ${clearBtnEl}`);
clearBtnEl.addEventListener("click", (e) => {
    checkSumTextInputEl.value = '';
    fileInputEl.value = '';
    resultTextEl.innerHTML = '';
});
console.log(`init extension - added on-click listener to validateBtnEl`);

const resultTextEl = document.getElementById('resultText');
console.log(`init extension - resultTextEl: ${resultTextEl}`);

console.log(`init extension - CryptoJS: ${CryptoJS}`);

statusTextEl.innerHTML = 'Ready';

console.log('initialized extension');
