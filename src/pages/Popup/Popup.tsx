import React, { ChangeEvent, useCallback, useState } from 'react';
import './Popup.css';
import { CheckSumType, Md5CheckSum, Sha256CheckSum } from '../../app/CheckSumType';

const POSSIBLE_CHECK_SUM_TYPES = [
  Sha256CheckSum.getInstance(),
  Md5CheckSum.getInstance(),
];

const POSSIBLE_CHECK_SUM_TYPES_MAP: Map<string, CheckSumType> = new Map<string, CheckSumType>();
for (let i = 0; i < POSSIBLE_CHECK_SUM_TYPES.length; i++) {
  POSSIBLE_CHECK_SUM_TYPES_MAP.set(POSSIBLE_CHECK_SUM_TYPES[i].getValue(), POSSIBLE_CHECK_SUM_TYPES[i]);
}

const Popup = () => {
  const [status, setStatus] = useState('');
  const [checkSumType, setCheckSumType] = useState<CheckSumType>(POSSIBLE_CHECK_SUM_TYPES[0]);
  const [checkSumText, setCheckSumText] = useState('');
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

  const onValidateBtnClick = useCallback(() => {

  }, []);

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
        <input id="fileInput" type="file" />
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
