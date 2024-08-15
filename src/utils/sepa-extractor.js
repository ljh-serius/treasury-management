import { v4 as uuidv4 } from 'uuid';

export const generateSepaXML = (units) => {
    const randomIBAN = () => 'FR' + Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    const randomBIC = () => 'ABCDEF' + Math.floor(100 + Math.random() * 900).toString();
  
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
    <Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">
      <CstmrCdtTrfInitn>
        <GrpHdr>
          <MsgId>${uuidv4()}</MsgId>
          <CreDtTm>${new Date().toISOString()}</CreDtTm>
          <NbOfTxs>${units.length}</NbOfTxs>
          <CtrlSum>${units.reduce((sum, unit) => sum + unit.totalAmount, 0).toFixed(2)}</CtrlSum>
          <InitgPty>
            <Nm>Your Company Name</Nm>
          </InitgPty>
        </GrpHdr>
        <PmtInf>
          <PmtInfId>${uuidv4()}</PmtInfId>
          <PmtMtd>TRF</PmtMtd>
          <BtchBookg>false</BtchBookg>
          <NbOfTxs>${units.length}</NbOfTxs>
          <CtrlSum>${units.reduce((sum, unit) => sum + unit.totalAmount, 0).toFixed(2)}</CtrlSum>
          <PmtTpInf>
            <SvcLvl>
              <Cd>SEPA</Cd>
            </SvcLvl>
          </PmtTpInf>
          <ReqdExctnDt>${new Date().toISOString().split('T')[0]}</ReqdExctnDt>
          <Dbtr>
            <Nm>Your Company Name</Nm>
            <PstlAdr>
              <Ctry>FR</Ctry>
              <AdrLine>Your Company Address</AdrLine>
            </PstlAdr>
          </Dbtr>
          <DbtrAcct>
            <Id>
              <IBAN>${randomIBAN()}</IBAN>
            </Id>
          </DbtrAcct>
          <DbtrAgt>
            <FinInstnId>
              <BIC>${randomBIC()}</BIC>
            </FinInstnId>
          </DbtrAgt>
          <ChrgBr>SLEV</ChrgBr>
          <CdtTrfTxInf>`;
  
    const xmlTransactions = units.map((unit) => {
      const beneficiaryIBAN = randomIBAN();
      const beneficiaryBIC = randomBIC();
      const endToEndId = uuidv4();
  
      return `
            <PmtId>
              <EndToEndId>${endToEndId}</EndToEndId>
            </PmtId>
            <Amt>
              <InstdAmt Ccy="EUR">${unit.totalAmount.toFixed(2)}</InstdAmt>
            </Amt>
            <CdtrAgt>
              <FinInstnId>
                <BIC>${beneficiaryBIC}</BIC>
              </FinInstnId>
            </CdtrAgt>
            <Cdtr>
              <Nm>${unit.description}</Nm>
            </Cdtr>
            <CdtrAcct>
              <Id>
                <IBAN>${beneficiaryIBAN}</IBAN>
              </Id>
            </CdtrAcct>
            <RmtInf>
              <Ustrd>${unit.category}</Ustrd>
            </RmtInf>`;
    }).join('');
  
    const xmlFooter = `        </CdtTrfTxInf>
        </PmtInf>
      </CstmrCdtTrfInitn>
    </Document>`;
  
    const sepaXML = `${xmlHeader}${xmlTransactions}${xmlFooter}`;
  
    const blob = new Blob([sepaXML], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `SEPA_Expenses_${new Date().toISOString().split('T')[0]}.xml`;
    link.click();
  };
  