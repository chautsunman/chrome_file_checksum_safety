import React, { ChangeEvent, useCallback, useState } from 'react';
import './Popup.css';
import { CheckSumType, Md5CheckSum, Sha256CheckSum } from '../../app/CheckSumType';
import { FileHashProcessor } from '../../app/FileHashProcessor';

const POSSIBLE_CHECK_SUM_TYPES = [
  Sha256CheckSum.getInstance(),
  Md5CheckSum.getInstance(),
];

const POSSIBLE_CHECK_SUM_TYPES_MAP: Map<string, CheckSumType> = new Map<string, CheckSumType>();
for (let i = 0; i < POSSIBLE_CHECK_SUM_TYPES.length; i++) {
  POSSIBLE_CHECK_SUM_TYPES_MAP.set(POSSIBLE_CHECK_SUM_TYPES[i].getValue(), POSSIBLE_CHECK_SUM_TYPES[i]);
}

const MAX_FILE_SIZE = 1024 * 1024;

const fileHashProcessor = new FileHashProcessor();

const Popup = () => {
  const [status, setStatus] = useState('');
  const [checkSumType, setCheckSumType] = useState<CheckSumType>(POSSIBLE_CHECK_SUM_TYPES[0]);
  const [checkSumText, setCheckSumText] = useState('');
  const [fileTarget, setFileTarget] = useState<File|null>(null);
  const [resultText, setResultText] = useState('');

  const onCheckSumTypeChg = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const newCheckSumTypeValue = e.target.value;
    const newCheckSumType = POSSIBLE_CHECK_SUM_TYPES_MAP.get(newCheckSumTypeValue);
    if (newCheckSumType) {
      setCheckSumType(newCheckSumType);
    }
  }, [setCheckSumType]);

  const onCheckSumTextChg = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCheckSumText(e.target.value);
  }, [setCheckSumText]);

  const onFileInputChg = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFileTarget(e.target.files ? e.target.files[0] : null);
  }, [setFileTarget]);

  const onValidateBtnClick = useCallback(async () => {
    console.log('validate - start');

    let resultText;

    console.log(`validate - checkSumText: ${checkSumText}`);
    if (checkSumText === null || checkSumText.trim() === '') {
      console.log('invalid check sum');
      resultText = 'Invalid check sum';
      setResultText(resultText);
      return;
    }

    if (!fileTarget) {
      console.log('0 files selected');
      resultText = 'Select a file to validate';
      setResultText(resultText);
      return;
    }
    if (!fileTarget.size) {
      console.log('invalid file size', fileTarget);
      resultText = 'Invalid file size';
      setResultText(resultText);
      return;
    }
    if (fileTarget.size > MAX_FILE_SIZE) {
      console.log('file too large', fileTarget.size, fileTarget);
      resultText = `File ${fileTarget.name} is too large, size: ${fileTarget.size}`;
      setResultText(resultText);
      return;
    }

    console.log('validate - processing')
    resultText = `Validating`;
    setResultText(resultText);

    const fileHash = await fileHashProcessor.calcHash(fileTarget, checkSumType);
    if (!fileHash) {
      console.log('invalid file hash');
      resultText = `Invalid file hash`;
      setResultText(resultText);
      return;
    }

    if (fileHash === checkSumText) {
      console.log('Success, matching hash', fileHash, checkSumText);
      resultText = `Success, matching hash`;
      setResultText(resultText);
    } else {
      console.log('Success, unmatching hash', fileHash, checkSumText);
      resultText = `Success, unmatching hash`;
      setResultText(resultText);
    }

    console.log('validate - end');
  }, [checkSumType, checkSumText, fileTarget, setResultText]);

  const onClearBtnClick = useCallback(() => {
    setCheckSumType(POSSIBLE_CHECK_SUM_TYPES[0]);
    setCheckSumText('');
    setResultText('');
  }, [setCheckSumText, setResultText]);

  return (
    <div className="App">
      <h1>Validate file</h1>

      <div className="flexHorizontal">
        <div>Status:</div>
        <div className="flexHorizontalSpacer"></div>
        <div>{status}</div>
      </div>

      <div className="flexHorizontal">
        <div>Checksum type:</div>
        <div className="flexHorizontalSpacer"></div>
        <select value={checkSumType.getValue()} onChange={onCheckSumTypeChg}>
          {POSSIBLE_CHECK_SUM_TYPES.map(checkSumType => (
            <option key={checkSumType.getValue()} value={checkSumType.getValue()}>{checkSumType.getDisplayStr()}</option>
          ))}
        </select>
      </div>
      <div className="flexHorizontal">
        <div>Checksum:</div>
        <div className="flexHorizontalSpacer"></div>
        <input type="text" value={checkSumText} onChange={onCheckSumTextChg} />
      </div>
      <div>
        <input type="file" onChange={onFileInputChg}/>
      </div>

      <div className="flexHorizontal">
        <button onClick={onValidateBtnClick}>Validate</button>
        <div className="flexHorizontalSpacer"></div>
        <button onClick={onClearBtnClick}>Clear</button>
      </div>

      <div className="flexHorizontal">
        <div>Result:</div>
        <div className="flexHorizontalSpacer"></div>
        <div>{resultText}</div>
      </div>
    </div>
  );
};

export default Popup;
