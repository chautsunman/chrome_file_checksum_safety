import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './Popup.css';
import { CheckSumType } from '../../app/CheckSumType';
import { Sha256CheckSum } from '../../app/checksum/Sha256CheckSum';
import { Md5CheckSum } from '../../app/checksum/Md5CheckSum';
import { Task } from '../../app/Task';
import { FileHashTask } from '../../app/FileHashTask';
import { EventEmitter } from 'events';

const POSSIBLE_CHECK_SUM_TYPES = [
  Sha256CheckSum.getInstance(),
  Md5CheckSum.getInstance(),
];

const POSSIBLE_CHECK_SUM_TYPES_MAP: Map<string, CheckSumType> = new Map<string, CheckSumType>();
for (let i = 0; i < POSSIBLE_CHECK_SUM_TYPES.length; i++) {
  POSSIBLE_CHECK_SUM_TYPES_MAP.set(POSSIBLE_CHECK_SUM_TYPES[i].getValue(), POSSIBLE_CHECK_SUM_TYPES[i]);
}

const eventEmitter = new EventEmitter();

const Popup = () => {
  const [checkSumType, setCheckSumType] = useState<CheckSumType>(POSSIBLE_CHECK_SUM_TYPES[0]);
  const [checkSumText, setCheckSumText] = useState('');
  const [fileTarget, setFileTarget] = useState<File|null>(null);
  const [resultText, setResultText] = useState('');
  const [fileHashTask, setFileHashTask] = useState<Task|null>(null);

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
    console.log(`validate - start - checkSumText: ${checkSumText}`);
    if (!fileTarget) {
      console.log('0 files selected');
      setResultText('Select a file to validate');
      return;
    }
    console.log('validate - processing')
    setResultText('Validating');
    const fileHashTask = new FileHashTask(eventEmitter, fileTarget, checkSumType, checkSumText);
    fileHashTask.start();
    setFileHashTask(fileHashTask);
    console.log('validate - end');
  }, [checkSumType, checkSumText, fileTarget, setFileHashTask]);

  const onClearBtnClick = useCallback(() => {
    if (fileHashTask) {
      fileHashTask.stop();
    }
    setFileHashTask(null);
    setCheckSumType(POSSIBLE_CHECK_SUM_TYPES[0]);
    setCheckSumText('');
    setResultText('');
  }, [setCheckSumType, setCheckSumText, setResultText, fileHashTask, setFileHashTask]);

  useEffect(() => {
    eventEmitter.on('FileHashTask-progress', (progress: number) => {
      console.log('progress', progress);
      setResultText(`Validating - ${progress * 100}%`);
    });
    eventEmitter.on('FileHashTask-complete', (hashStr: string) => {
      console.log('complete', hashStr, checkSumText);
      if (hashStr === checkSumText) {
        setResultText(`Success, matching hash`);
      } else {
        setResultText(`Success, unmatching hash`);
      }
    });
    eventEmitter.on('FileHashTask-invalid-hash', (payload: null) => {
      console.log('invalid-hash');
      setResultText(`Invalid file hash`);
    });
    eventEmitter.on('FileHashTask-general-msg', (msg: string) => {
      console.log('general-msg', msg);
      setResultText(msg);
    });
  }, [checkSumText, setResultText]);

  return (
    <div className="App">
      <h1>Validate file</h1>

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
